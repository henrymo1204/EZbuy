import sys
import flask
import requests
import re
from flask_cors import CORS


app = flask.Flask(__name__)
app.config.from_envvar('APP_CONFIG')
CORS(app)

service_request_counter_dict = dict(
    user_service=0,
    cart_service=0,
    order_service=0,
    shipment_service=0,
    payment_service=0,
    inventory_service=0,
    shop_service=0
)

service_request_pattern_dict = dict(
    user_service='(.*/user.*)|(.*/register.*)|(.*/login.*)',
    cart_service='.*/cart.*',
    order_service='.*/order.*',
    shipment_service='.*/shipment.*',
    payment_service='.*/payment.*',
    inventory_service='.*/products.*',
    shop_service='.*/shop.*'
)

service_upstream_dict = dict(
    user_service=app.config['USER_UPSTREAMS'],
    cart_service=app.config['CART_UPSTREAMS'],
    order_service=app.config['ORDER_UPSTREAMS'],
    shipment_service=app.config['SHIPMENT_UPSTREAMS'],
    payment_service=app.config['PAYMENT_UPSTREAMS'],
    inventory_service=app.config['INVENTORY_UPSTREAMS'],
    shop_service=app.config['SHOP_UPSTREAMS']
)


@ app.errorhandler(404)
def route_page(err):

    request_url = ""
    request_path = flask.request.full_path

    # find service name based on request path
    service_name = find_service_with_request(request_path)

    # find a upstream for the service
    upstream = load_balance_with_service(service_name)

    # construct request url based on upstream
    request_url = upstream + request_path

    # update service request counter
    service_request_counter_dict[service_name] += 1

    # reset service request counter to 0 if reach the end of upstream list
    # based on round-robin load balancing
    if service_request_counter_dict[service_name] == len(service_upstream_dict[service_name]):
        service_request_counter_dict[service_name] = 0

    try:
        response = requests.request(
            flask.request.method,
            request_url,
            data=flask.request.get_data(),
            headers=flask.request.headers,
            cookies=flask.request.cookies,
            stream=True,
        )

    except requests.exceptions.RequestException as e:
        app.log_exception(sys.exc_info())
        return flask.json.jsonify({
            'method': e.request.method,
            'url': e.request.url,
            'exception': type(e).__name__,
        }), 503

    except requests.exceptions.ConnectionError as e:
        # delete the current upstream from upstream pool as current connection failed
        # delete_upstream(service_name, upstream)

        app.log_exception(sys.exc_info())
        return flask.json.jsonify({
            'method': e.request.method,
            'url': e.request.url,
            'exception': type(e).__name__,
        }), 504

    headers = remove_item(
        response.headers,
        'Transfer-Encoding',
        'chunked'
    )

    # delete the current upstream from upstream pool on response code in the 500 range
    # if response.status_code >= 500:
    # delete_upstream(service_name, upstream)

    return flask.Response(
        response=response.content,
        status=response.status_code,
        headers=headers,
        direct_passthrough=True,
    )


def remove_item(d, k, v):
    if k in d:
        if d[k].casefold() == v.casefold():
            del d[k]
    return dict(d)


def find_service_with_request(request_path):
    """ Find service name from request path

    :param: <string> request_path: The request path of current request.

    :return: <string> the service name

    """
    serviceName = None

    for k, v in service_request_pattern_dict.items():
        if re.search(v, request_path):
            serviceName = k
            break

    return serviceName


def delete_upstream(service_name, upstream):
    """ Delete the given upstream from upstream pool

    :param:  <string> service_name the name of the service                         
    :param:  <string> upstream: The upstream to be deleted.

    :returns:  <string> the selected upstream

    """

    upstreams = service_upstream_dict[service_name]
    upstreams.remove(upstream)


def load_balance_with_service(service_name):
    """ Round-robin load balancing among the microservices 

    :param: <string> service_name the name of the service  

    :returns: <string> the selected upstream

    """

    counter = service_request_counter_dict[service_name]
    upstreams = service_upstream_dict[service_name]
    upstream = upstreams[counter % len(upstreams)]

    return upstream

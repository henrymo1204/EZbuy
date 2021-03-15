import sys
import flask
import requests
import re
from flask_cors import CORS


app = flask.Flask(__name__)
app.config.from_envvar('APP_CONFIG')
user_upstreams = app.config['USER_UPSTREAMS']
CORS(app)

user_request_counter = 0


@app.errorhandler(404)
def route_page(err):
    upstream = ""

    global user_request_counter
    global user_upstreams

    try:
        request_url = ""
        request_path = flask.request.full_path

        # request load balanced to a timeline microservice
        if request_path == '/?' or is_user_service_path(request_path) == True:
            upstream = load_balance_user_requests()
            request_url = upstream + request_path

            # increase the user_request_counter by 1 for the round-robin load balancing use
            user_request_counter = user_request_counter + 1

            # if user_request_counter equals size of user_upstreams, each upstream has been
            # called once, restart a new round of round-robin load balancing from the first upstream
            if user_request_counter == len(user_upstreams):
                user_request_counter = 0

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
        delete_upstream(upstream)

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
    if response.status_code >= 500:
        delete_upstream(upstream)

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


def is_user_service_path(request_path):
    """ Check if current request is for user microservice

    :param request_path: The request path of current request.

    :return: True if request is for user microservice, 
             False if request is for timeline microservice.

    """
    rv = False
    user_service_request_pattern = '(.*/user/.*)|(.*/register.*)|(.*/login.*)'
    if re.search(user_service_request_pattern, request_path):
        rv = True
    return rv


def delete_upstream(upstream):
    """ Delete the given upstream from upstream pool

    :param is_timeline_request: If current request is for timeline microservice, if true
                                the upstream will be deleted from timeline_upstreas, otherwise
                                the upstream will be deleted from user_upstreams.                          
    :param upstream: The upstream to be deleted.

    """

    user_upstreams.remove(upstream)


def load_balance_user_requests():
    """ Round-robin load balancing among the user microservices """
    global user_request_counter
    upstream = user_upstreams[user_request_counter % len(user_upstreams)]

    return upstream

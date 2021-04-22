import jwt
from functools import wraps
from flask import jsonify

TOKEN_VERIFY_KEY = 'jwt_key_pub.pem'


def jwt_token_required(f):
    @wraps(f)
    def jwt_auth_decorator(*args, **kwargs):
        jwt_token = request.args.get("jwt_token")

        if not jwt_token:
            return jsonify({'message': 'jwt token is missing'}), 401

        try:
            jwt_decode_key = open(TOKEN_VERIFY_KEY).read()
            jwt.decode(jwt_token, jwt_decode_key, algorithms=["RS256"])
        except:
            return jsonify({'message': 'jwt token is invalid'}), 401

        return f(*args, **kwargs)

    return jwt_auth_decorator

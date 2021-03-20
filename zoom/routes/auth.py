import json
import logging
from typing import Dict
import requests
from fastapi.security.utils import get_authorization_scheme_param
from starlette.requests import Request
from starlette.responses import RedirectResponse
from fastapi.responses import JSONResponse
import logging

from settings import APP_BASE_URL, KEYCLOAK_BASE_URL, REALM, CLIENT, AUTH_URL, TOKEN_URL, KEYCLOAK_URL

from fastapi import APIRouter

auth_router = APIRouter()


@auth_router.get("/login", tags=["auth"])
def login() -> RedirectResponse:
    return RedirectResponse(AUTH_URL)


@auth_router.get("/authenticate")
async def auth(code: str) -> RedirectResponse:
    payload = (
        f"grant_type=authorization_code&code={code}"
        f"&redirect_uri={APP_BASE_URL}&client_id={CLIENT}"
    )
    headers = {"Content-Type": "application/x-www-form-urlencoded"}
    token_response = requests.request("POST", TOKEN_URL, data=payload, headers=headers)

    token_body = json.loads(token_response.content)
    access_token = token_body["access_token"]

    response = JSONResponse(content={"status": "ok"})
    response.set_cookie("Authorization", value=f"Bearer {access_token}")
    return response


from keycloak import KeycloakOpenID

keycloak_openid = KeycloakOpenID(
    server_url=KEYCLOAK_URL, client_id="backend", realm_name="ketchup"
)

KEYCLOAK_PUBLIC_KEY = (
    "-----BEGIN PUBLIC KEY-----\n"
    + keycloak_openid.public_key()
    + "\n-----END PUBLIC KEY-----"
)


@auth_router.get("/test")
async def root(request: Request,) -> Dict:
    authorization: str = request.cookies.get("Authorization")
    scheme, credentials = get_authorization_scheme_param(authorization)

    options = {"verify_signature": True, "verify_aud": False, "exp": True}
    decoded = keycloak_openid.decode_token(
        credentials, key=KEYCLOAK_PUBLIC_KEY, options=options
    )
    logging.info(decoded)

    return {"message": decoded}

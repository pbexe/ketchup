from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer
from keycloak import KeycloakOpenID
import logging
from settings import KEYCLOAK_URL, REALM, CLIENT

keycloak_openid = KeycloakOpenID(
    server_url=KEYCLOAK_URL, client_id="backend", realm_name="ketchup"
)

# oauth2_scheme = OAuth2AuthorizationCodeBearer(
#     authorizationUrl=f"{keycloak_url}realms/{realm}/protocol/openid-connect/auth",
#     tokenUrl=f"{keycloak_url}realms/{realm}/protocol/openid-connect/token",
# )

oauth2_scheme = OAuth2PasswordBearer(
    # authorizationUrl=f"{keycloak_url}realms/{realm}/protocol/openid-connect/auth",
    tokenUrl=f"{KEYCLOAK_URL}realms/{REALM}/protocol/openid-connect/token"
)


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        KEYCLOAK_PUBLIC_KEY = (
            "-----BEGIN PUBLIC KEY-----\n"
            + keycloak_openid.public_key()
            + "\n-----END PUBLIC KEY-----"
        )
        return keycloak_openid.decode_token(
            token,
            key=KEYCLOAK_PUBLIC_KEY,
            options={"verify_signature": True, "verify_aud": False, "exp": True},
        )
    except Exception as e:
        logging.error(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

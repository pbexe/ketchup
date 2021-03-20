from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer
from keycloak import KeycloakOpenID
import logging
from settings import KEYCLOAK_URL, REALM, CLIENT

keycloak_openid = KeycloakOpenID(
    server_url=KEYCLOAK_URL, client_id="frontend", realm_name="ketchup"
)

# oauth2_scheme = OAuth2AuthorizationCodeBearer(
#     authorizationUrl=f"{keycloak_url}realms/{realm}/protocol/openid-connect/auth",
#     tokenUrl=f"{keycloak_url}realms/{realm}/protocol/openid-connect/token",
# )

oauth2_scheme = OAuth2PasswordBearer(
    # authorizationUrl=f"{keycloak_url}realms/{realm}/protocol/openid-connect/auth",
    tokenUrl=f"{KEYCLOAK_URL}realms/{REALM}/protocol/openid-connect/token"
)


kind_oauth2_scheme = OAuth2PasswordBearer(
    # authorizationUrl=f"{keycloak_url}realms/{realm}/protocol/openid-connect/auth",
    tokenUrl=f"{KEYCLOAK_URL}realms/{REALM}/protocol/openid-connect/token",
    auto_error=False,
)


KEYCLOAK_PUBLIC_KEY = (
    "-----BEGIN PUBLIC KEY-----\n"
    + keycloak_openid.public_key()
    + "\n-----END PUBLIC KEY-----"
)

KEYCLOAK_PUBLIC_KEY = (
    "-----BEGIN PUBLIC KEY-----\n"
    + keycloak_openid.public_key()
    + "\n-----END PUBLIC KEY-----"
)


async def get_current_user(token: str = Depends(kind_oauth2_scheme)):
    try:
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


async def demand_current_user(token: str = Depends(oauth2_scheme)):
    try:
        return keycloak_openid.decode_token(
            token,
            key=KEYCLOAK_PUBLIC_KEY,
            options={"verify_signature": False, "verify_aud": False, "exp": True},
        )
    except Exception as e:
        logging.error(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


# token_o = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJpdGhNa1pycWpXUzMtanBDVE5yTDRlbDVkaThzb1ZWVXpEMUNIRTFobE5BIn0.eyJleHAiOjE2MTYyNjY1MDcsImlhdCI6MTYxNjI2NjIwNywiYXV0aF90aW1lIjoxNjE2MjYzMTUyLCJqdGkiOiJmYTBhMTBhNS01NTU1LTRiYjItOWQ5ZC1jOGFkMTMxMzY0N2QiLCJpc3MiOiJodHRwczovL2tldGNodXAta2V5Y2xvYWsuaGVyb2t1YXBwLmNvbS9hdXRoL3JlYWxtcy9rZXRjaHVwIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjEzMzRkY2Q5LTM2MzQtNDI5MS1hMGIwLTRkNWQ5Yzc4YzMyMCIsInR5cCI6IkJlYXJlciIsImF6cCI6ImZyb250ZW5kIiwibm9uY2UiOiJmNWFjOTFjZi1hNGEyLTRkYmItODhjZC05YjQyNWE5ZmY1M2EiLCJzZXNzaW9uX3N0YXRlIjoiOTI5ZWFkM2ItNTQxNS00OTc0LTg5YjQtMTNiZWJhNGQ3YWU3IiwiYWNyIjoiMCIsImFsbG93ZWQtb3JpZ2lucyI6WyJodHRwOi8vbG9jYWxob3N0KiIsImtldGNodXAtc2guaGVyb2t1YXBwLmNvbS8iLCJodHRwczovL2tldGNodXAuc2giLCIqIiwiaHR0cHM6Ly9rZXRjaHVwLWtleWNsb2FrLmhlcm9rdWFwcC5jb20iLCJodHRwczovL2tldGNodXAtc2guaGVyb2t1YXBwLmNvbSJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJUb20gRW1tZXJzb24iLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0b21lbW1lcnNvbiIsImdpdmVuX25hbWUiOiJUb20iLCJmYW1pbHlfbmFtZSI6IkVtbWVyc29uIiwiZW1haWwiOiJ0aGVwY2J1aWxkZXIxQGdtYWlsLmNvbSJ9.XackwZvdB16k5ozZv1fvMmCBMmRwVR-lq-fPZ7C3jGSrtj5zalS2TO2IALHWr9LWuGpual2M4npJ989DsmXXaIQYydEOEvTT9VM-sT2oZ2900N703EZoiD1dFBwy8btKa50kDbo1k7Bbw0g47V0LArb-26_zEH7k2L8iqDzhKgIpfs7PY5G0EeVEJ3-w5gtJzHEJbfcpW_DlrsjhtJAHVhfeAtGlO5bsokRTRKtVcnZjHunLzZ8AGiyUtckl18M_O4abG6Iap37YLr8p1dB9ZzRW9tSj_wSZCWG5TTT6Yh8YkRS8gWPJfUzAg8kZCje1jIstloV-ubeEu1jAwkA4wQ"

# print(KEYC)

# keycloak_openid.decode_token(
#     token_o,
#     key=KEYCLOAK_PUBLIC_KEY,
#     options={"verify_signature": True, "verify_aud": False, "exp": True},
# )

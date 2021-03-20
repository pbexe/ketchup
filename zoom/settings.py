APP_BASE_URL = "http://localhost:8000/"
KEYCLOAK_BASE_URL = "http://localhost:8080"
KEYCLOAK_URL = KEYCLOAK_BASE_URL + "/auth/"
REALM = "ketchup"
CLIENT = "backend"
AUTH_URL = (
    f"{KEYCLOAK_BASE_URL}/auth/realms/{REALM}"
    f"/protocol/openid-connect/auth?client_id={CLIENT}&response_type=code"
)
TOKEN_URL = f"{KEYCLOAK_BASE_URL}/auth/realms/{REALM}/protocol/openid-connect/token"
JWT_SECRET = "supahsecret"

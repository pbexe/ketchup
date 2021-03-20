resource "keycloak_openid_client" "backend_client" {
  realm_id  = keycloak_realm.ketchup_realm.id
  client_id = "backend"

  name    = "Backend Client"
  enabled = true

  access_type           = "PUBLIC"
  implicit_flow_enabled = true
  standard_flow_enabled = true
  valid_redirect_uris = [
    "http://localhost:8000/auth/authenticate"
  ]
  web_origins = [
    "*"
  ]
  # base_url = "http://localhost:8000"

  login_theme = "keycloak"
}

resource "keycloak_role" "realm_role" {
  realm_id    = keycloak_realm.ketchup_realm.id
  client_id   = keycloak_openid_client.backend_client.id
  name        = "default-role"
  description = "My default role"
}

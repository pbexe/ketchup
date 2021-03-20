resource "keycloak_openid_client" "frontend_client" {
  realm_id  = keycloak_realm.ketchup_realm.id
  client_id = "frontend"

  name    = "Frontend Client"
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
  direct_access_grants_enabled = true


  login_theme = "keycloak"
}

resource "keycloak_role" "frontend_realm_role" {
  realm_id    = keycloak_realm.ketchup_realm.id
  client_id   = keycloak_openid_client.frontend_client.id
  name        = "frontend-role"
  description = "My default role"
}

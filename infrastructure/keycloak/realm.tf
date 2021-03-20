resource "keycloak_realm" "ketchup_realm" {
  realm        = "ketchup"
  enabled      = true
  display_name = "ketchup realm"
}

resource "keycloak_user" "test_user" {
  realm_id = keycloak_realm.ketchup_realm.id
  username = "test"
  enabled  = true

  email      = "test@example.com"
  first_name = "Test"
  last_name  = "User"

  attributes = {
    foo = "bar"
  }

  initial_password {
    value     = var.test_user_password
    temporary = false
  }
}

variable "test_user_password" {
  type      = string
  sensitive = true
}

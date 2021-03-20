terraform {
  required_providers {
    keycloak = {
      source  = "mrparkers/keycloak"
      version = "2.3.0"
    }
  }
}

provider "keycloak" {
  client_id     = "terraform"
  client_secret = var.keycloak_provider_secret
  url           = "http://localhost:8080"
}

variable "keycloak_provider_secret" {
  description = "The client secret for the terraform provider client"
  type        = string
  sensitive   = true
}

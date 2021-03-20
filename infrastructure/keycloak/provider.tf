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
  url           = var.keycloak_url
}

variable "keycloak_url" {
  description = "The url of the keycloak server"
  type        = string
}

variable "keycloak_provider_secret" {
  description = "The client secret for the terraform provider client"
  type        = string
  sensitive   = true
}

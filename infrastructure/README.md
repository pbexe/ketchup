
# Setup 

1. Create a .env file (or something else to manage your environment variables)
   (I suggest doing `cp env.sample .env`)

2. Choose values for `KEYCLOAK_PASSWORD` and `KEYCLOAK_DB_PASSWORD`
   You will set `TF_VAR_keycloak_provider_secret` later.

# Setup keycloak

1. Install docker-compose, install terraform version v0.14.8 (latest)
   (https://github.com/tfutils/tfenv)

2. Run `docker-compose up`

3. By default keycloak will be exposed on `:8080`

4. Go to `http://localhost:8080/auth/admin/master/console/`

5. Login using the value of `KEYCLOAK_PASSWORD`

Now, we need to create a client for terraform, this will allow us to terraform keycloak and avoid having to recreate everything in the GUI everytime.

6. a) Follow the instructions here 
   https://registry.terraform.io/providers/mrparkers/keycloak/latest/docs#client-credentials-grant-setup-recommended

   b) Look at `how_to_setup_terraform_client.webm`

7. Set `TF_VAR_keycloak_provider_secret` to the new clients secret.

8. From here on out you need theese environment variables set.
   I use `export $(grep -v '^#' .env | xargs)` while in the **infrastructure** directory.

# Terraforming keycloak
 
 1. Ensure environment variables are set
 2. `cd keycloak`
 3. `terraform init`
 4. `terraform apply`
 5. say 'yes'
 6. Tadah

Update:

To run locally do 
`terraform apply -var-file="production.tfvars"`
to run against production do
`terraform apply -var-file="production.tfvars"`

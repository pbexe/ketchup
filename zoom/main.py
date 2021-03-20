import jwt
import uuid
import logging
import uvicorn
from pydantic import BaseModel
from tortoise.contrib.fastapi import register_tortoise
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer
from models import Room, Room_Pydantic, User
from keycloak import KeycloakOpenID

from typing import List

from auth import auth_router

from settings import KEYCLOAK_URL, REALM, CLIENT


keycloak_openid = KeycloakOpenID(
    server_url="http://localhost:8080/auth/", client_id="backend", realm_name="ketchup"
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


app = FastAPI(title="Tortoise ORM FastAPI example")
app.include_router(auth_router, prefix="/auth")


class StartResponse(BaseModel):
    room: Room_Pydantic
    token: str


@app.get("/start", response_model=StartResponse)
async def start():
    room = await Room.create(identifier=uuid.uuid4())

    user = await User.create(room_id=room.id)

    room_pd = await Room_Pydantic.from_queryset_single(Room.get(id=room.id))

    encoded_jwt = jwt.encode(
        {"user": str(user.identifier), "room": str(room.identifier)},
        JWT_SECRET,
        algorithm="HS256",
    )

    return StartResponse(room=room_pd, token=encoded_jwt)


@app.get("/user")
async def get_user(current_user: dict = Depends(get_current_user)):
    logging.info(current_user)
    return current_user


register_tortoise(
    app,
    db_url="sqlite://:memory:",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)

if __name__ == "__main__":
    uvicorn.run("main:app")

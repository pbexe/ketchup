import os
import jwt
import uuid
import logging
import uvicorn
from pydantic import BaseModel
from tortoise.contrib.fastapi import register_tortoise
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2AuthorizationCodeBearer, OAuth2PasswordBearer
from keycloak import KeycloakOpenID

from typing import List, Optional

# Keycloak setup
from settings import JWT_SECRET


from models.room import Room, Room_Pydantic
from models.user import User

from routes.auth import auth_router
from routes.room import room_router
from routes.team import team_router
from routes.user import user_router

from utils import get_current_user

from fastapi.middleware.cors import CORSMiddleware


origins = [
    "https://ketchup.sh",
    "https://*-pbexe.vercel.app/*",
    "https://localhost.tiangolo.com",
    "http://localhost:*",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:8000",
    "*"
]

app = FastAPI(title="Ketchup")
app.include_router(auth_router, prefix="/auth")
app.include_router(room_router, prefix="/room")
app.include_router(team_router, prefix="/team")
app.include_router(user_router, prefix='/user')
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StartResponse(BaseModel):
    room: Room_Pydantic
    token: str


@app.get("/start", response_model=StartResponse)
async def start():

    anonymous_user_id = uuid.uuid4()

    user = await User.create(id=anonymous_user_id, anonymous=True)

    room = await Room.create(id=uuid.uuid4())
    await room.participants.add(user)
    await room.save()

    room_pd = await Room_Pydantic.from_queryset_single(Room.get(id=room.id))

    encoded_jwt = jwt.encode(
        {"user": str(user.id), "room": str(room.id)},
        JWT_SECRET,
        algorithm="HS256",
    )

    return StartResponse(room=room_pd, token=encoded_jwt)


# @app.get("/user")
# async def get_user(current_user: dict = Depends(get_current_user)):
#     logging.info(current_user)
#     return current_user

if os.environ.get('PRODUCTION') or os.environ.get('DATABASE_URL'):
    print("====== USING PROD DB ======")
    register_tortoise(
        app,
        db_url=os.environ.get('DATABASE_URL'),
        modules={"models": ["models.room", "models.user"]},
        generate_schemas=True,
        add_exception_handlers=True,
    ) 
else:
    print("====== USING DEV DB ======")
    register_tortoise(
        app,
        db_url="sqlite://db.sqlite",
        modules={"models": ["models.room", "models.user"]},
        generate_schemas=True,
        add_exception_handlers=True,
    )




from setup import setup_tasks
setup_tasks()



if __name__ == "__main__":
    uvicorn.run("main:app")

from typing import List

from pydantic import BaseModel
import uvicorn
from tortoise.contrib.fastapi import HTTPNotFoundError, register_tortoise
from fastapi import FastAPI, HTTPException
import jwt

# from models import User_Pydantic, UserIn_Pydantic, Users
from .models import Room, Room_Pydantic, User

import uuid


app = FastAPI(title="Tortoise ORM FastAPI example")
JWT_SECRET = "supahsecret"


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


register_tortoise(
    app,
    db_url="sqlite://:memory:",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)

if __name__ == "__main__":
    uvicorn.run("main:app")

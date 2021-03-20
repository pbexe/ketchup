from typing import List, Optional
from pydantic import BaseModel
from fastapi import APIRouter, Depends
from pydantic import UUID4
import requests
import uuid
from uuid import UUID
from tortoise.contrib.pydantic import pydantic_model_creator
from fastapi import FastAPI, HTTPException
from tortoise.exceptions import DoesNotExist

from utils import get_current_user, demand_current_user

from controllers.user import UserController

router = APIRouter(tags=["User"])
user_router = router

controller = UserController()


@router.get("/", response_model=List[controller.pydantic_model])
async def get_users():
    return await controller.retrieveAll()


from models.user import User, User_Pydantic


UserPydantic = pydantic_model_creator(User, name="user")


@router.get("/me", response_model=UserPydantic)
async def get_me(current_user: dict = Depends(demand_current_user)):
    pass
    ident = UUID(current_user.get("sub"))

    try:
        user = await User.get(id=ident)
    except DoesNotExist:
        details = {
            "name": current_user.get("name", "Ketchup user"),
            "email": current_user.get("email", "user@ketchup.sh"),
            "username": current_user.get("preferred_username"),
        }

        user = await User.create(id=str(ident), **details)

    return await User_Pydantic.from_queryset_single(User.get(id=user.id))


from models.user import Room


class ChangeRoomRequest(BaseModel):
    new_room_id: UUID4


@router.post("/room", response_model=UserPydantic)
async def change_room(
    request: ChangeRoomRequest, user: dict = Depends(demand_current_user)
):
    ident = UUID(user.get("sub"))
    user = await User.get(id=ident)

    room = await Room.get(id=request.new_room_id)

    await user.change_room(room)

    return await UserPydantic.from_queryset_single(User.get(id=user.id))


@router.delete("/room", response_model=UserPydantic)
async def leave_room(user: dict = Depends(demand_current_user)):
    ident = UUID(user.get("sub"))
    user = await User.get(id=ident)

    if not await user.current_room:
        raise HTTPException(
            status_code=404,
            detail="Users current room does not exist",
            headers={"X-Error": "There goes my error"},
        )

    room = await user.current_room.get()

    other_users_in_room = await room.users.filter(id__not=user.id)
    user.current_room = None
    await user.save()

    if len(other_users_in_room) == 0:
        await room.delete()

    return await UserPydantic.from_queryset_single(User.get(id=user.id))


@router.get("/{id}", response_model=controller.pydantic_model)
async def get_user(id: UUID4):
    return await controller.retrieve(id)


@router.post("/", response_model=controller.pydantic_model)
async def create_user(user: controller.creation_model):
    return await controller.create(user)


@router.put("/{id}", response_model=controller.pydantic_model)
async def update_user(id, user: controller.pydantic_model):
    return await controller.update(id, user)


from typing import List, Optional
from pydantic import BaseModel
from fastapi import APIRouter
from pydantic import UUID4
import requests

from controllers.room import RoomController

router = APIRouter(tags=["Room"])
room_router = router

controller = RoomController()

from models.user import User_Pydantic


@router.get("/", response_model=List[controller.pydantic_model])
async def get_rooms():
    return await controller.retrieveAll()


@router.get("/total", response_model=int)
async def total():
    return await controller.total_time_today()


@router.post("/", response_model=controller.pydantic_model)
async def create_room(room: controller.creation_model):
    return await controller.create(room)


@router.put("/{id}", response_model=controller.pydantic_model)
async def update_room(id, room: controller.pydantic_model):
    return await controller.update(id, room)


@router.get("/{id}", response_model=controller.pydantic_model)
async def get_room(id: int):
    return await controller.retrieve(id)


@router.get("/{id}/participants", response_model=List[User_Pydantic])
async def get_participants(id: int):
    return await controller.getParticipants(id)


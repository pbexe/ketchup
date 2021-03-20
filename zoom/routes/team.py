from typing import List, Optional
from pydantic import BaseModel
from fastapi import APIRouter
from pydantic import UUID4
import requests

from controllers.team import TeamController

router = APIRouter(tags=["Team"])
team_router = router

controller = TeamController()

from models.user import User_Pydantic


@router.get("/", response_model=List[controller.pydantic_model])
async def get_teams():
    return await controller.retrieveAll()


@router.get("/{id}", response_model=controller.pydantic_model)
async def get_team(id: UUID4):
    return await controller.retrieve(id)


@router.post("/", response_model=controller.pydantic_model)
async def create_team(team: controller.creation_model):
    return await controller.create(team)


@router.put("/{id}", response_model=controller.pydantic_model)
async def update_team(id, team: controller.pydantic_model):
    return await controller.update(id, team)


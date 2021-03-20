from pydantic import UUID4
from tortoise.models import Model
from tortoise.contrib.pydantic import PydanticModel, pydantic_model_creator
from typing import Dict, List, Type

from fastapi import APIRouter


class Controller:
    def __init__(self, label: str, tortoise_model: Type[Model]) -> None:
        self.label = label
        self.tortoise_model = tortoise_model
        self.pydantic_model = pydantic_model_creator(
            self.tortoise_model, name=f"{label}"
        )
        self.creation_model = pydantic_model_creator(
            self.tortoise_model, name=f"New{label}", exclude_readonly=True
        )

    def getCreationModel(self) -> PydanticModel:
        return self.creation_model

    async def retrieve(self, pk: int) -> PydanticModel:
        return await self.pydantic_model.from_queryset_single(
            self.tortoise_model.get(id=pk)
        )

    async def retrieveAll(self) -> List[PydanticModel]:
        return await self.pydantic_model.from_queryset(self.tortoise_model.all())

    async def create(self, creation_model: PydanticModel):
        new_obj = await self.tortoise_model.create(
            **creation_model.dict(exclude_unset=True)
        )
        return await self.pydantic_model.from_tortoise_orm(new_obj)

    async def update(self, pk: int, creation_model: PydanticModel):
        await self.tortoise_model.filter(id=pk).update(
            **creation_model.dict(exclude_unset=True, exclude=["id"])
        )
        return await self.pydantic_model.from_queryset_single(
            self.tortoise_model.get(id=pk)
        )

from tortoise.models import Model
from tortoise import fields
from tortoise.fields import data
from tortoise.contrib.pydantic import pydantic_model_creator
import uuid

from models.user import User


class Room(Model):
    id = fields.IntField(pk=True)
    start_time = data.DatetimeField(auto_now_add=True)
    identifier = fields.UUIDField()

    participants: fields.ManyToManyRelation["User"] = fields.ManyToManyField(
        "models.User", related_name="rooms", through="room_user"
    )

    def __str__(self):
        return self.name


Room_Pydantic = pydantic_model_creator(Room, name="Room")

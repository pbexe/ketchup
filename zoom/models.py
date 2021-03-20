from tortoise.models import Model
from tortoise import fields
from tortoise.fields import data
from tortoise.contrib.pydantic import pydantic_model_creator
import uuid


class Room(Model):
    id = fields.IntField(pk=True)
    start_time = data.DatetimeField(auto_now_add=True)
    identifier = fields.UUIDField()

    def __str__(self):
        return self.name


class User(Model):
    id = fields.IntField(pk=True)
    identifier = fields.UUIDField(default=uuid.uuid4)
    room: fields.OneToOneRelation[Room] = fields.OneToOneField(
        "models.Room", on_delete=fields.CASCADE, related_name="room"
    )


Room_Pydantic = pydantic_model_creator(Room, name="Room")

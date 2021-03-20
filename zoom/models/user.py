from tortoise.models import Model
from tortoise import fields
from tortoise.fields import data
from tortoise.contrib.pydantic import pydantic_model_creator
import uuid

# from models.room import Room


class User(Model):
    id = fields.IntField(pk=True)
    identifier = fields.UUIDField()
    anonymous = fields.BooleanField(default=False)
    # rooms: fields.[Room] = fields.OneToOneField(
    #     "models.Room", on_delete=fields.CASCADE, related_name="room"
    # )


User_Pydantic = pydantic_model_creator(User, name="user")


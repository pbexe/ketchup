from tortoise.models import Model
from tortoise import fields
from tortoise.fields import data
from tortoise.contrib.pydantic import pydantic_model_creator
import uuid


class User(Model):
    id = fields.UUIDField(pk=True)
    # identifier = fields.UUIDField()
    anonymous = fields.BooleanField(default=False)
    # rooms: fields.[Room] = fields.OneToOneField(
    #     "models.Room", on_delete=fields.CASCADE, related_name="room"
    # )
    teams: fields.ManyToManyRelation["Team"] = fields.ManyToManyField(
        "models.Team", related_name="members", through="user_team"
    )


class Team(Model):
    id = fields.UUIDField(pk=True)
    name = data.CharField(max_length=50)
    members: fields.ReverseRelation["User"]

    def __str__(self):
        return self.name


User_Pydantic = pydantic_model_creator(User, name="user")


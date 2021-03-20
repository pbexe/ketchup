from tortoise.models import Model
from tortoise import fields
from tortoise.fields import data
from tortoise.contrib.pydantic import pydantic_model_creator
import uuid
from tortoise import Tortoise

# from models.room import Room


class Team(Model):
    id = fields.UUIDField(pk=True)
    name = data.CharField(max_length=50, editable=True)
    members: fields.ReverseRelation["User"]
    rooms: fields.ReverseRelation["Room"]

    def __str__(self):
        return self.name


class Room(Model):
    id = fields.UUIDField(pk=True)
    name = fields.CharField(max_length=50, default="Room")
    creation_time = data.DatetimeField(auto_now_add=True)
    start_time = data.DatetimeField(auto_now_add=True)
    duration = fields.IntField(default=25)

    users: fields.ReverseRelation["User"]

    def __str__(self):
        return self.name

    def today(self):
        print("Type ===", type(self.start_time))
        if self.start_time.date() == datetime.today().date():
            return True
        else:
            return False


class User(Model):
    id = fields.UUIDField(pk=True)
    # identifier = fields.UUIDField()
    anonymous = fields.BooleanField(default=False)
    name = fields.CharField(max_length=50)
    email = fields.CharField(max_length=50)
    username = fields.CharField(max_length=50)

    current_room: fields.ForeignKeyRelation[Room] = fields.ForeignKeyField(
        "models.Room", related_name="users", null=True
    )
    teams: fields.ManyToManyRelation[Team] = fields.ManyToManyField(
        "models.Team", related_name="members", through="user_team", default=[]
    )

    async def change_room(self, room: Room):
        self.current_room = room
        await self.save()

    async def leave_room(self, room: Room):
        await self.current_room


Tortoise.init_models(["models.user"], "models")

User_Pydantic = pydantic_model_creator(User, name="user")


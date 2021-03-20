from tortoise.models import Model
from tortoise import fields
from tortoise.fields import data
from tortoise.contrib.pydantic import pydantic_model_creator
import uuid
from datetime import datetime
from tortoise import Tortoise

from models.user import User, Room


Tortoise.init_models(["models.room"], "models")

Room_Pydantic = pydantic_model_creator(Room, name="Room")

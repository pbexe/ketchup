from typing import TYPE_CHECKING
from tortoise.models import Model
from tortoise import fields
from tortoise.fields import data
from tortoise.contrib.pydantic import pydantic_model_creator
import uuid
from datetime import datetime


# from models.user import User


# Team_Pydantic = pydantic_model_creator(Team, name="Team")

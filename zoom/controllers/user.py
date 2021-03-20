from typing import List
from controllers.controller import Controller
from models.user import User


class UserController(Controller):
    pass

    def __init__(self):
        super().__init__("User", User)

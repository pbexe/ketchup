from typing import List
from controllers.controller import Controller
from models.user import Team


class TeamController(Controller):
    pass

    def __init__(self):
        super().__init__("Team", Team)

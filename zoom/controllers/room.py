from typing import List
from controllers.controller import Controller
from models.room import Room

from models.user import User, User_Pydantic


class RoomController(Controller):
    pass

    def __init__(self):
        super().__init__("Room", Room)

    async def getParticipants(self, pk: int) -> List[User]:
        room = await self.tortoise_model.get(id=pk)

        participants = room.participants.all()

        return await User_Pydantic.from_queryset(participants)

    async def total_time_today(self) -> int:
        rooms = await self.tortoise_model.all()
        total = 0
        for room in rooms:
            if room.today():
                total += room.duration
        return total
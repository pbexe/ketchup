from django.db import models
import uuid
from django.conf import settings


# class Model1(models.Model):
#     test_field = models.CharField(
#         max_length=255,
#         blank=True,
#         default="This is a default",
#         verbose_name="Test Field",
#         help_text="A field for testing",
#     )

#     def __str__(self):
#         return str(self.test_field)


class Session(models.Model):
    id = models.AutoField(primary_key=True)
    identifier = models.UUIDField(default=uuid.uuid4)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


class AnonymousSession(Session):
    user = None


class Pomodoro(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Room(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def get_time(self):
        return self.start_time


    def get_time(self):
        # Do some magic maths cba rn
        return self.start_time

class UserProfile(models.Model):
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True)
    code = models.CharField(max_length=16, unique=True, blank=False)


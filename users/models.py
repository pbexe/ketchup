from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Model used for authenticating users
    """

    def __str__(self):
        return str(self.username)

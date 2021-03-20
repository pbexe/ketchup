from django.db import models


class Model1(models.Model):
    test_field = models.CharField(
        max_length=255,
        blank=True,
        default='This is a default',
        verbose_name='Test Field',
        help_text='A field for testing',
    )

    def __str__(self):
        return str(self.test_field)

class Room(models.Model):
    start_time = models.TimeField(auto_now_add=True)

    def get_time(self):
        # Do some magic maths cba rn
        return self.start_time

class UserProfile(models.Model):
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True)
    code = models.CharField(max_length=16, unique=True, blank=False)


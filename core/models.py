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

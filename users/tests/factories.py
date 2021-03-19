
from django.conf import settings
from factory.django import DjangoModelFactory


class UserFactory(DjangoModelFactory):
    class Meta:
        model = settings.AUTH_USER_MODEL
        django_get_or_create = ('username',)

    username = 'testuser'
    email = 'test@example.com'
    is_active = True

    @staticmethod
    def with_password(password, **kwargs):
        user = UserFactory.build(**kwargs)
        user.set_password(password)
        user.save()
        return user

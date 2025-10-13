import factory
from django.contrib.auth.models import User
from factory.django import DjangoModelFactory

USER_PASSWORD = "super_secure_password1"


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"testuser_{n}")
    password = factory.PostGenerationMethodCall("set_password", USER_PASSWORD)
    email = factory.Faker("email")
    first_name = factory.Faker("first_name")
    last_name = factory.Faker("last_name")
    is_active = True
    is_staff = False
    is_superuser = False

    @classmethod
    def credentials(cls, user):
        return {
            "username": getattr(user, cls._meta.model.USERNAME_FIELD),
            "password": USER_PASSWORD,
        }

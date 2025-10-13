import factory
from django.contrib.auth.models import User
from factory.django import DjangoModelFactory

from apps.services.models import Service, ServiceTag, ServiceRatingReview, ServiceRating, RatingEntity, ServiceCategory

USER_PASSWORD = "super_secure_password1"


class ServiceFactory(DjangoModelFactory):
    class Meta:
        model = Service

    name = factory.Sequence(lambda n: f"Service #{n}")
    description = factory.Sequence(lambda n: f"Description #{n}")
    link = factory.Sequence(lambda n: f"https://service{n}.com")
    logo = None
    prime_tag = None

    @classmethod
    def credentials(cls, user):
        return {
            "username": getattr(user, cls._meta.model.USERNAME_FIELD),
            "password": USER_PASSWORD,
        }

    @factory.post_generation
    def categories(self, create, extracted, **kwargs):
        if not create:
            return

        if not extracted:
            extracted = []

        for tag in extracted:
            self.categories.add(tag)

    @factory.post_generation
    def tags(self, create, extracted, **kwargs):
        if not create:
            return

        if not extracted:
            extracted = []

        for tag in extracted:
            self.tags.add(tag)


class ServiceCategoryFactory(DjangoModelFactory):
    class Meta:
        model = ServiceCategory

    name = factory.Sequence(lambda n: f"Category #{n}")
    description = factory.Sequence(lambda n: f"Description #{n}")


class ServiceTagFactory(DjangoModelFactory):
    class Meta:
        model = ServiceTag

    name = factory.Sequence(lambda n: f"Tag #{n}")
    description = factory.Sequence(lambda n: f"Description #{n}")


class ServiceRatingFactory(DjangoModelFactory):
    class Meta:
        model = ServiceRating

    service = factory.SubFactory(ServiceFactory)
    entity = RatingEntity.TRUSTPILOT
    score = 5


class ServiceRatingReviewFactory(DjangoModelFactory):
    class Meta:
        model = ServiceRatingReview

    service_rating = factory.SubFactory(ServiceRatingFactory)
    username = factory.Sequence(lambda n: f"username #{n}")
    text = factory.Sequence(lambda n: f"Text #{n}")
    score = 5

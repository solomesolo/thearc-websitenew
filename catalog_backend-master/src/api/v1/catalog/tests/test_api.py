import pytest
from django.urls import reverse
from rest_framework import status

from apps.services.tests.factories import ServiceFactory, ServiceTagFactory, ServiceRatingFactory, \
    ServiceRatingReviewFactory, ServiceCategoryFactory
from hainu.tests.factories import UserFactory

pytestmark = pytest.mark.integration


@pytest.mark.django_db
class TestServiceListAPI:
    @pytest.fixture
    def url(self):
        return reverse("v1:catalog:services-list")

    def test__list_of_services__got_list(self, client, url):
        ServiceFactory.create_batch(10)

        response = client.get(url)

        assert response.status_code == status.HTTP_200_OK

        results = response.json()['results']
        assert len(results) == 10

    @pytest.mark.parametrize(
        ('name', 'expect'),
        [
            ("test", 5),
            ("test1", 2),
            ("test2", 1),
        ]
    )
    def test__list_of_services__filtered_by_name(self, client, url, name, expect):
        names = ["test10", "test11", "test2", "test3", "test4"]
        for n in names:
            ServiceFactory.create(name=n)

        response = client.get(url, {'name': name})

        assert response.status_code == status.HTTP_200_OK

        results = response.json()['results']
        assert len(results) == expect

    def test__list_of_services__filtered_by_tag_id(self, client, url):
        tags = ServiceTagFactory.create_batch(5)
        ServiceFactory.create(tags=tags[:3])
        ServiceFactory.create(tags=tags[2:])
        ServiceFactory.create()
        ServiceFactory.create()

        response = client.get(url, {'tags': tags[2].id})

        assert response.status_code == status.HTTP_200_OK

        results = response.json()['results']
        assert len(results) == 2


@pytest.mark.django_db
class TestServiceTagsListAPI:
    @pytest.fixture
    def url(self):
        return reverse("v1:catalog:tags-list")

    @pytest.mark.parametrize(
        ('category_index', 'expect'),
        [
            (0, 3),
            (1, 2),
            (2, 0),
        ]
    )
    def test__list_of_tags__filtered_by_tag_id(self, client, url, category_index, expect):
        categories = ServiceCategoryFactory.create_batch(3)
        tags = ServiceTagFactory.create_batch(5)
        ServiceFactory.create(tags=tags[:3], categories=[categories[0]])
        ServiceFactory.create(tags=tags[2:4], categories=[categories[1]])
        ServiceFactory.create(categories=[categories[2]])
        ServiceFactory.create(categories=[categories[2]])

        response = client.get(url, {'category': categories[category_index].id})

        assert response.status_code == status.HTTP_200_OK
        assert len(response.json()['results']) == expect


@pytest.mark.django_db
class TestServiceRatingReviewListAPI:
    @pytest.fixture
    def url(self):
        return reverse("v1:catalog:reviews-list")

    def test__list_of_services__got_list(self, client, url):
        sr = ServiceRatingFactory()
        srr = ServiceRatingReviewFactory.create_batch(10, service_rating=sr)
        ServiceRatingReviewFactory.create_batch(10)

        response = client.get(url, {'service_rating__service__id': sr.service.id})

        assert response.status_code == status.HTTP_200_OK

        results = response.json()['results']
        assert len(results) == len(srr)

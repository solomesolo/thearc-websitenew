import json

import pytest
from django.urls import reverse
from rest_framework import status

from apps.services.models import EmailSubscription

pytestmark = pytest.mark.integration


@pytest.mark.django_db
class TestCreateEmailAPI:
    @pytest.fixture
    def url(self):
        return reverse("v1:users:emails-list")

    def test__create_email_subscription__created(self, client, url):
        assert EmailSubscription.objects.count() == 0

        response = client.post(url, data=json.dumps({"mail": "test@test.com"}))

        assert response.status_code == status.HTTP_201_CREATED
        assert EmailSubscription.objects.count() == 1

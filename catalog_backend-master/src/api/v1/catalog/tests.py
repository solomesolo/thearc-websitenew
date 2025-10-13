import pytest
from django.urls import reverse
from rest_framework import status
from apps.services.models import Service

pytestmark = pytest.mark.integration

@pytest.mark.django_db
def test_catalog_services_list(client):
    url = reverse('v1:catalog:services-list')
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK 
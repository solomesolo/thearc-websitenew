import pytest
from django.urls import reverse
from rest_framework import status
from apps.blog.models import BlogPost

pytestmark = pytest.mark.integration

@pytest.mark.django_db
def test_blogpost_list(client):
    url = reverse('v1:blog:posts-list')
    response = client.get(url)
    assert response.status_code == status.HTTP_200_OK 
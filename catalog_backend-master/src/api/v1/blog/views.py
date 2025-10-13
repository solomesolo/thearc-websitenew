from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

from apps.blog.models import BlogPost
from .serializers import BlogPostSerializer
from rest_framework import viewsets
from rest_framework.response import Response


class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

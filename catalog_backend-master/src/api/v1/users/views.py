from rest_framework import viewsets, mixins

from apps.services.models import EmailSubscription
from .serializers import EmailSubscriptionSerializer
from rest_framework import permissions

class EmailSubscriptionViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin):
    queryset = EmailSubscription.objects.all()
    serializer_class = EmailSubscriptionSerializer
    permission_classes = [permissions.AllowAny]

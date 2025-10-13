from rest_framework import serializers

from apps.services.models import EmailSubscription


class EmailSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailSubscription
        fields = ['id', 'mail']

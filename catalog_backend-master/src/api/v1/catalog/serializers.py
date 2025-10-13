from rest_framework import serializers

from apps.services.models import Service, ServiceTag, ServiceScreenshot, Certificate, Country, ServiceCategory, \
    ServiceRating, CertificateOrganisation, ServiceRatingReview, ServiceMention, ServiceFeature


class ServiceTagSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField(source='services.count', read_only=True)

    class Meta:
        model = ServiceTag
        fields = ['id', 'name', 'description', 'count']


class ServiceCategorySerializer(serializers.ModelSerializer):
    count = serializers.IntegerField(source='services.count', read_only=True)

    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'count', 'image']


class BriefServiceTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceTag
        fields = ['id', 'name', 'description']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'name', 'description', 'image']


class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']


class ScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceScreenshot
        fields = ['alt_text', 'image', 'service']


class CertificateOrganisationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificateOrganisation
        fields = ['id', 'name', 'description', 'image']


class CertificateSerializer(serializers.ModelSerializer):
    organisation_entity = CertificateOrganisationSerializer()

    class Meta:
        model = Certificate
        fields = ['id', 'organisation_entity', 'specification', 'description', 'image']


class ServiceRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceRating
        fields = ['id', 'service', 'entity', 'score']


class ServiceRatingReviewSerializer(serializers.ModelSerializer):
    service_rating = ServiceRatingSerializer()

    class Meta:
        model = ServiceRatingReview
        fields = ['id', 'service_rating', 'username', 'title', 'text', 'score']


class ServiceMentionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceMention
        fields = ['id', 'service', 'name', 'text', 'link']


class ServiceFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFeature
        fields = ['id', 'icon', 'title', 'description']


class BriefCatalogServiceSerializer(serializers.ModelSerializer):
    tags = BriefServiceTagSerializer(many=True)
    countries = CountrySerializer(many=True)
    categories = CategorySerializer(many=True)
    certificates = CertificateSerializer(many=True)
    screenshots = ScreenshotSerializer(many=True)
    ratings = ServiceRatingSerializer(many=True)

    class Meta:
        model = Service
        fields = ['id', 'name', 'bio', 'description', 'link', 'tags', 'categories', 'countries', 'certificates', 'logo',
                  'screenshots', 'ratings', 'created_at', 'updated_at']


class CatalogServiceSerializer(serializers.ModelSerializer):
    tags = BriefServiceTagSerializer(many=True)
    countries = CountrySerializer(many=True)
    categories = CategorySerializer(many=True)
    certificates = CertificateSerializer(many=True)
    screenshots = ScreenshotSerializer(many=True)
    ratings = ServiceRatingSerializer(many=True)
    mentions = ServiceMentionSerializer(many=True)
    features = ServiceFeatureSerializer(many=True)

    class Meta:
        model = Service
        fields = ['id', 'name', 'bio', 'description', 'link', 'tags', 'categories', 'countries', 'certificates', 'logo',
                  'screenshots', 'ratings', 'mentions', 'features', 'created_at', 'updated_at']

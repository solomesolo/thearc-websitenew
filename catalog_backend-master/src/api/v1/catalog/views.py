from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import viewsets

from apps.services.models import Service, ServiceTag, ServiceCategory, ServiceRatingReview
from .filters import ServiceFilter, ServiceRatingReviewFilter, ServiceTagsReviewFilter
from .serializers import CatalogServiceSerializer, ServiceTagSerializer, ServiceCategorySerializer, \
    ServiceRatingReviewSerializer, BriefCatalogServiceSerializer

CACHING_PERIOD = 60 * 60 * 2


class GetSerializerClassMixin(object):
    def get_serializer_class(self):
        """
        A class which inhertis this mixins should have variable
        `serializer_action_classes`.
        Look for serializer class in self.serializer_action_classes, which
        should be a dict mapping action name (key) to serializer class (value),
        i.e.:
        class SampleViewSet(viewsets.ViewSet):
            serializer_class = DocumentSerializer
            serializer_action_classes = {
               'upload': UploadDocumentSerializer,
               'download': DownloadDocumentSerializer,
            }
            @action
            def upload:
                ...
        If there's no entry for that action then just fallback to the regular
        get_serializer_class lookup: self.serializer_class, DefaultSerializer.
        """
        try:
            return self.serializer_action_classes[self.action]
        except (KeyError, AttributeError):
            return super().get_serializer_class()


class CatalogServicesViewSet(GetSerializerClassMixin, viewsets.ReadOnlyModelViewSet):
    queryset = Service.objects.all().prefetch_related('countries', 'tags', 'categories', 'certificates', 'features',
                                                      'mentions')
    serializer_class = CatalogServiceSerializer
    filterset_class = ServiceFilter
    serializer_action_classes = {
        'list': BriefCatalogServiceSerializer,
        'retrieve': CatalogServiceSerializer,
    }

    @method_decorator(cache_page(CACHING_PERIOD))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ServiceRatingReviewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceRatingReview.objects.all()
    serializer_class = ServiceRatingReviewSerializer
    filterset_class = ServiceRatingReviewFilter

    @method_decorator(cache_page(CACHING_PERIOD))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ServiceTagsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceTag.objects.all().order_by('name')
    serializer_class = ServiceTagSerializer
    filterset_class = ServiceTagsReviewFilter

    @method_decorator(cache_page(CACHING_PERIOD))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)


class ServiceCategoriesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.all().order_by('name')
    serializer_class = ServiceCategorySerializer

    @method_decorator(cache_page(CACHING_PERIOD))
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

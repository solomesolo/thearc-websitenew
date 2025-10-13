from rest_framework import routers

from apps.services.models import ServiceRatingReview
from .views import CatalogServicesViewSet, ServiceTagsViewSet, ServiceCategoriesViewSet, ServiceRatingReviewViewSet

app_name = "catalog"

router = routers.SimpleRouter()
router.register(r'services', CatalogServicesViewSet, basename='services')
router.register(r'tags', ServiceTagsViewSet, basename='tags')
router.register(r'categories', ServiceCategoriesViewSet, basename='categories')
router.register(r'reviews', ServiceRatingReviewViewSet, basename='reviews')

urlpatterns = []
urlpatterns += router.urls

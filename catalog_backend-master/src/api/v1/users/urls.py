from rest_framework import routers

from .views import EmailSubscriptionViewSet

app_name = "users"

router = routers.SimpleRouter()
router.register(r'email', EmailSubscriptionViewSet, basename='emails')

urlpatterns = []
urlpatterns += router.urls

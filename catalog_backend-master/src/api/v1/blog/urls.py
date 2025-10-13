from rest_framework import routers

from .views import BlogPostViewSet

app_name = "blog"

router = routers.SimpleRouter()
router.register(r'posts', BlogPostViewSet, basename='posts')

urlpatterns = []
urlpatterns += router.urls

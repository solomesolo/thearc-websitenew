from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static


def cache_clear_view(request):
    from django.core.cache import cache
    cache.clear()
    return HttpResponse('Cache cleared')


schema_view = get_schema_view(
   openapi.Info(
      title="Hainu API",
      default_version='v1',
      description="API documentation for Hainu",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('clear/', cache_clear_view),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/v1/', include('api.v1.urls', namespace='v1')),
    path('tinymce/', include('tinymce.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

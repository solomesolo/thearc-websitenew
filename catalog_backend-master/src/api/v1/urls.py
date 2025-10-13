from django.urls import include, path

app_name = "v1"

urlpatterns = [
    path("blog/", include("api.v1.blog.urls", namespace="blog")),
    path("catalog/", include("api.v1.catalog.urls", namespace="catalog")),
    path("users/", include("api.v1.users.urls", namespace="users")),
]
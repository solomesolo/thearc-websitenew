from django.contrib import admin
from tinymce.models import HTMLField

from apps.blog.models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    pass

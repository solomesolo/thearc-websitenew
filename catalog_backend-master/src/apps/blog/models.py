from django.db import models
from tinymce.models import HTMLField


# Create your models here.

class BlogPost(models.Model):
    title = models.CharField(max_length=300)
    text = HTMLField()
    image_url = models.URLField(max_length=300)
    image = models.ImageField(upload_to='posts/', null=True, default=None, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    service = models.ForeignKey('services.Service', on_delete=models.CASCADE, related_name='blog_posts', null=True,
                                blank=True, default=None)

    def __str__(self):
        return self.title

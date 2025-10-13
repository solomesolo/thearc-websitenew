from datetime import datetime
from enum import Enum

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class ServiceFeature(models.Model):
    icon = models.CharField(max_length=200)
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=50)

    @property
    def services(self):
        return Service.objects.filter(features__id=self.id)

    def __str__(self):
        return self.title


class ServiceTag(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    @property
    def services(self):
        return Service.objects.filter(tags__id=self.id)

    def __str__(self):
        return self.name


class CategoryGroup(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class ServiceCategory(models.Model):
    group = models.ForeignKey(CategoryGroup, on_delete=models.CASCADE, related_name='categories', null=True, blank=True)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='categories/', null=True, default=None, blank=True)

    @property
    def services(self):
        return Service.objects.filter(categories__id=self.id)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=100)

    @property
    def services(self):
        return Service.objects.filter(countries__id=self.id)

    def __str__(self):
        return self.name


class CertificateOrganisation(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, default="")
    image = models.ImageField(upload_to='certificates/', null=True, default=None, blank=True)

    def __str__(self):
        return self.name


class Certificate(models.Model):
    organisation_entity = models.ForeignKey(CertificateOrganisation, on_delete=models.CASCADE, default=None, null=True)
    specification = models.CharField(max_length=50, null=True, blank=True, default=None)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='certificates/', null=True, default=None, blank=True)

    def __str__(self):
        return f"{self.organisation_entity.name}-{self.specification}"


class ServiceScreenshot(models.Model):
    alt_text = models.CharField(max_length=300, default="", blank=True)
    image = models.ImageField(upload_to='screenshots/', null=True, default=None, blank=True)
    service = models.ForeignKey("Service", on_delete=models.CASCADE, related_name="screenshots")


class ServiceMention(models.Model):
    service = models.ForeignKey("Service", on_delete=models.CASCADE, related_name="mentions")
    name = models.CharField(max_length=400)
    text = models.TextField()
    link = models.URLField(max_length=400)


class RatingEntity(models.TextChoices):
    TRUSTPILOT = "trustpilot", "TRUSTPILOT"


class ServiceRatingReview(models.Model):
    service_rating = models.ForeignKey("ServiceRating", on_delete=models.CASCADE, related_name="reviews")
    title = models.CharField(max_length=200)
    username = models.CharField(max_length=200)
    text = models.TextField()
    score = models.FloatField(default=0, validators=[MaxValueValidator(5), MinValueValidator(0)])


class ServiceRating(models.Model):
    service = models.ForeignKey("Service", on_delete=models.CASCADE, related_name="ratings")
    entity = models.CharField(max_length=50, choices=RatingEntity.choices)
    score = models.FloatField(default=0, validators=[MaxValueValidator(5), MinValueValidator(0)])


class Service(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    bio = models.TextField()
    link = models.URLField()
    logo = models.ImageField(upload_to='images/', null=True, default=None, blank=True)

    tags = models.ManyToManyField(ServiceTag, related_name='tag_services')
    categories = models.ManyToManyField(ServiceCategory, related_name='category_services')
    countries = models.ManyToManyField(Country)
    features = models.ManyToManyField(ServiceFeature)
    certificates = models.ManyToManyField(Certificate)

    prime_tag = models.ForeignKey(ServiceTag, on_delete=models.SET_NULL, null=True, related_name="prime_tag")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def do(self):
        if self.prime_tag is not None:
            cat, _ = ServiceCategory.objects.get_or_create(name=self.prime_tag.name, description=self.prime_tag.description)
            self.categories.add(cat)
        else:
            # Optionally, handle the case where there is no prime_tag
            pass

    def __str__(self):
        return self.name


class EmailSubscription(models.Model):
    mail = models.EmailField()

    def __str__(self):
        return self.mail

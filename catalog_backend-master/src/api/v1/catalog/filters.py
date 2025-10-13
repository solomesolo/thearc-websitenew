import django_filters

from apps.services.models import ServiceTag, Service, ServiceCategory, ServiceRatingReview


class ServiceFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name="name", lookup_expr="icontains")

    tags = django_filters.ModelMultipleChoiceFilter(
        queryset=ServiceTag.objects.all(),
        conjoined=True, field_name="tags")

    categories = django_filters.ModelMultipleChoiceFilter(
        queryset=ServiceCategory.objects.all(),
        conjoined=True, field_name="categories")

    class Meta:
        model = Service
        fields = ('tags', 'categories')


class ServiceRatingReviewFilter(django_filters.FilterSet):
    class Meta:
        model = ServiceRatingReview
        fields = ('service_rating__service__id', 'service_rating',)


class ServiceTagsReviewFilter(django_filters.FilterSet):
    category = django_filters.ModelChoiceFilter(queryset=ServiceCategory.objects.all(), method='filter_by_category')

    def filter_by_category(self, queryset, name, value):
        return queryset.filter(tag_services__categories=value).distinct()

    class Meta:
        model = ServiceTag
        fields = ('name', 'description',)

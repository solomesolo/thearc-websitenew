import six
from django.core.paginator import InvalidPage
from rest_framework import pagination
from rest_framework.exceptions import NotFound
from rest_framework.response import Response


class Pagination(pagination.PageNumberPagination):
    page_size_query_param = "page_size"

    def get_page_size(self, request):
        if self.page_size_query_param:
            try:
                page_size = int(request.query_params[self.page_size_query_param])
                return page_size
            except (KeyError, ValueError):
                pass
        # Fallback to default page size if not set
        if hasattr(self, 'page_size') and self.page_size is not None:
            return self.page_size
        return 25  # Default fallback page size

    def paginate_queryset(self, queryset, request, view=None):
        """
        Paginate a queryset if required, either returning a
        page object, or `None` if pagination is not configured for this view.
        """
        page_size = self.get_page_size(request)

        if not page_size:
            return None
        if page_size == -1:
            page_size = queryset.count() or 1

        paginator = self.django_paginator_class(queryset, page_size)
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number in self.last_page_strings:
            page_number = paginator.num_pages
        try:
            self.page = paginator.page(page_number)
        except InvalidPage as exc:
            msg = self.invalid_page_message.format(page_number=page_number, message=six.text_type(exc))
            raise NotFound(msg)

        if paginator.num_pages > 1 and self.template is not None:
            # The browsable API should display pagination controls.
            self.display_page_controls = True

        self.request = request
        return list(self.page)

    def get_paginated_response(self, data):
        return Response(
            {
                "links": {"next": self.get_next_link(), "previous": self.get_previous_link()},
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "per_page": self.page.paginator.per_page,
                "page": self.page.number,
                "results": data,
            }
        )
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
from django.template.response import TemplateResponse
from django.utils.html import format_html
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

from apps.services.models import ServiceTag, Service, Certificate, ServiceScreenshot, ServiceMention, ServiceRating, \
    ServiceRatingReview, CertificateOrganisation, ServiceCategory, Country, EmailSubscription, ServiceFeature
import requests
from bs4 import BeautifulSoup
from django import forms
from django.utils.safestring import mark_safe


@admin.register(ServiceTag)
class ServieTagAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


class ScreenshotAdminInline(admin.TabularInline):
    model = ServiceScreenshot


class MentionAdminInline(admin.TabularInline):
    model = ServiceMention


class ServiceFeatureAdminInline(admin.TabularInline):
    model = ServiceFeature


class ServiceRatingAdminInline(admin.TabularInline):
    model = ServiceRating


class ServiceScrapeForm(forms.ModelForm):
    scrape_url = forms.URLField(
        required=False,
        label="Scrape from URL",
        help_text=mark_safe(
            'Enter a company or product URL and click '
            '<button type="button" id="scrape-btn" class="default">Scrape</button> '
            '<span id="scrape-status"></span>.'
        )
    )

    class Meta:
        model = Service
        exclude = ['created_at', 'updated_at', 'id']

    def clean(self):
        cleaned_data = super().clean()
        url = cleaned_data.get('scrape_url')
        scrape = self.data.get('scrape')
        if url and scrape == '1':
            # Run the scraper
            try:
                resp = requests.get(url, timeout=10)
                soup = BeautifulSoup(resp.text, 'html.parser')
                title = soup.title.string.strip() if soup.title else ''
                desc_tag = soup.find('meta', attrs={'name': 'description'})
                description = desc_tag['content'].strip() if desc_tag and desc_tag.get('content') else ''
                # Try to find a logo
                logo_url = ''
                icon_link = soup.find('link', rel=lambda x: x and 'icon' in x)
                if icon_link and icon_link.get('href'):
                    logo_url = icon_link['href']
                    if logo_url.startswith('//'):
                        logo_url = 'https:' + logo_url
                    elif logo_url.startswith('/'):
                        from urllib.parse import urljoin
                        logo_url = urljoin(url, logo_url)
                # Set the fields
                cleaned_data['name'] = title or cleaned_data.get('name')
                cleaned_data['description'] = description or cleaned_data.get('description')
                cleaned_data['bio'] = description or cleaned_data.get('bio')
                # Download logo if found
                if logo_url:
                    import tempfile
                    from django.core.files import File
                    from urllib.request import urlopen
                    img_temp = tempfile.NamedTemporaryFile(delete=True)
                    img_temp.write(urlopen(logo_url).read())
                    img_temp.flush()
                    cleaned_data['logo'] = File(img_temp, name=logo_url.split('/')[-1])
            except Exception as e:
                raise forms.ValidationError(f"Scraping failed: {e}")
        return cleaned_data

class ServieAdmin(admin.ModelAdmin):
    form = ServiceScrapeForm
    inlines = [ScreenshotAdminInline, MentionAdminInline, ServiceRatingAdminInline]
    fields = ['scrape_url', 'name', 'description', 'bio', 'link', 'logo', 'tags', 'categories', 'countries', 'features', 'certificates', 'prime_tag']

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('scrape/', self.admin_site.admin_view(self.scrape_view), name='service-scrape'),
        ]
        return custom_urls + urls

    @method_decorator(csrf_exempt)
    def scrape_view(self, request):
        url = request.POST.get('scrape_url')
        if not url:
            return JsonResponse({'error': 'No URL provided'}, status=400)
        try:
            resp = requests.get(url, timeout=10)
            soup = BeautifulSoup(resp.text, 'html.parser')
            title = soup.title.string.strip() if soup.title else ''
            desc_tag = soup.find('meta', attrs={'name': 'description'})
            description = desc_tag['content'].strip() if desc_tag and desc_tag.get('content') else ''
            # Try to find a logo
            logo_url = ''
            icon_link = soup.find('link', rel=lambda x: x and 'icon' in x)
            if icon_link and icon_link.get('href'):
                logo_url = icon_link['href']
                if logo_url.startswith('//'):
                    logo_url = 'https:' + logo_url
                elif logo_url.startswith('/'):
                    from urllib.parse import urljoin
                    logo_url = urljoin(url, logo_url)
            return JsonResponse({
                'name': title,
                'description': description,
                'bio': description,
                'logo_url': logo_url,
            })
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    class Media:
        js = ('admin/js/service_scrape.js',)

    def render_change_form(self, request, context, *args, **kwargs):
        context['adminform'].form.fields['scrape_url'].widget.attrs['id'] = 'id_scrape_url'
        context['scrape_button'] = format_html('<button type="button" id="scrape-btn" class="default">Scrape</button> <span id="scrape-status"></span>')
        return super().render_change_form(request, context, *args, **kwargs)

admin.site.register(Service, ServieAdmin)


class ServiceRatingReviewAdminInline(admin.TabularInline):
    model = ServiceRatingReview


@admin.register(ServiceRating)
class ServiceRatingAdmin(admin.ModelAdmin):
    inlines = [ServiceRatingReviewAdminInline]
    list_display = ['service', 'entity', 'score']


@admin.register(CertificateOrganisation)
class CertificateOrganisationAdmin(admin.ModelAdmin):
    pass


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    pass


@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    pass


@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(EmailSubscription)
class EmailSubscriptionAdmin(admin.ModelAdmin):
    pass


@admin.register(ServiceFeature)
class ServiceFeatureAdmin(admin.ModelAdmin):
    pass

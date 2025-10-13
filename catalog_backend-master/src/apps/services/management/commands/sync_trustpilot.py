import httpx
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand

from apps.services.models import Service, ServiceRating, RatingEntity


class Command(BaseCommand):
    help = "Sync reviews and rating from Trustpilot"

    # def add_arguments(self, parser):
    #     parser.add_argument("poll_ids", nargs="+", type=int)

    def handle(self, *args, **options):
        # for poll_id in options["poll_ids"]:
        #     try:
        #         poll = Poll.objects.get(pk=poll_id)
        #     except Poll.DoesNotExist:
        #         raise CommandError('Poll "%s" does not exist' % poll_id)
        # poll.opened = False
        # poll.save()

        services = Service.objects.all()

        for s in services:
            tp_link = f"https://www.trustpilot.com/review/{s.link.replace('https://', '').replace('http://', '')}"
            resp = httpx.get(tp_link, follow_redirects=True)
            if resp.status_code == 404:
                continue

            rating, _ = ServiceRating.objects.get_or_create(service=s, entity=RatingEntity.TRUSTPILOT)

            soup = BeautifulSoup(resp.text, 'html.parser')

            score = float(soup.find("p", {"data-rating-typography": True}).text)
            rating.score = score

            print(rating)

            rating.reviews.all().delete()
            for review in soup.find_all('article'):
                try:
                    username = review.find("a", {"name": "consumer-profile"}).span.text
                    title = review.find("h2", {"data-service-review-title-typography": True}).text
                    text = review.find("p", {"data-service-review-text-typography": True}).text
                    review_score = float(review.section.find("img")['src'].replace(
                        'https://cdn.trustpilot.net/brand-assets/4.1.0/stars/stars-', '').replace('.svg', ''))
                    rating.reviews.create(service_rating=s, title=title, username=username, text=text,
                                          score=review_score)
                except Exception as e:
                    ...

            rating.save()
        services_count = services.count()

        self.stdout.write(
            self.style.SUCCESS(f'Successfully synced {services_count} services')
        )

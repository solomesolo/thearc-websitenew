// JavaScript for Service admin 'Scrape' button
window.addEventListener('DOMContentLoaded', function() {
    var scrapeBtn = document.getElementById('scrape-btn');
    var scrapeUrlInput = document.getElementById('id_scrape_url');
    var statusSpan = document.getElementById('scrape-status');
    if (scrapeBtn && scrapeUrlInput) {
        scrapeBtn.addEventListener('click', function() {
            var url = scrapeUrlInput.value;
            if (!url) {
                statusSpan.textContent = 'Please enter a URL.';
                return;
            }
            statusSpan.textContent = 'Scraping...';
            fetch('scrape/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                },
                body: 'scrape_url=' + encodeURIComponent(url)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    statusSpan.textContent = 'Error: ' + data.error;
                } else {
                    statusSpan.textContent = 'Scraped!';
                    if (data.name) document.getElementById('id_name').value = data.name;
                    if (data.description) document.getElementById('id_description').value = data.description;
                    if (data.bio) document.getElementById('id_bio').value = data.bio;
                    if (data.logo_url) {
                        // Optionally, show the logo URL or download it
                        // For now, just show a message
                        statusSpan.textContent += ' (Logo found, please download and upload manually)';
                    }
                }
            })
            .catch(err => {
                statusSpan.textContent = 'Scrape failed.';
            });
        });
    }
}); 
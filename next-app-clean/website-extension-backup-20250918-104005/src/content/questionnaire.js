document.addEventListener('DOMContentLoaded', function() {
    const questionnaireForm = document.getElementById('questionnaire-form');
    const submitButton = document.getElementById('submit-button');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const formData = new FormData(questionnaireForm);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Handle data collection and processing here
        console.log('Questionnaire Data:', data);
        // You can send this data to a server or process it as needed
    });
});
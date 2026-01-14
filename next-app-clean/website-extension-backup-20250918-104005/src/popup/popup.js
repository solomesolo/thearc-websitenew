// popup.js

document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-button');
    const questionnaireForm = document.getElementById('questionnaire-form');

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();
        const formData = new FormData(questionnaireForm);
        const data = {};

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Here you can handle the data submission, e.g., send it to a server or process it
        console.log('Submitted data:', data);
        
        // Optionally, you can close the popup after submission
        window.close();
    });
});
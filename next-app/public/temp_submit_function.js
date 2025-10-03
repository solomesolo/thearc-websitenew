        function submitQuestionnaire() {
            collectAnswers();
            
            // Save answers to localStorage for the loading screen to process
            saveAnswers();
            
            // Redirect to loading screen
            window.location.href = 'loading.html';
        }

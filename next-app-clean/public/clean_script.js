        // Global variables
        const sections = ['general', 'lifestyle', 'symptoms', 'screenings', 'additional'];
        let currentSection = 'general';
        let answers = {};

        // Check consent on page load
        document.addEventListener('DOMContentLoaded', function() {
            const consentGiven = localStorage.getItem("consentGiven");
            if (consentGiven !== "true") {
                // Redirect to consent page if no consent
                window.location.href = "consent.html";
                return;
            }
            
            initializeSections();
            updateProgress();
            updateNavigation();
            loadAnswers();
            setupEventListeners();
        });

        function initializeSections() {
            // Clear all classes from all section nav items
            document.querySelectorAll('.section-nav-item').forEach(item => {
                item.classList.remove('active', 'completed', 'inactive');
            });
            
            // Set all sections as inactive initially
            sections.forEach(section => {
                const navItem = document.querySelector(`[data-section="${section}"]`);
                if (navItem) {
                    navItem.classList.add('inactive');
                }
            });
            
            // Set the first section as active
            const firstNavItem = document.querySelector(`[data-section="${sections[0]}"]`);
            if (firstNavItem) {
                firstNavItem.classList.add('active');
            }
            
            // Update section states based on completion
            updateSectionStates();
        }

        function updateSectionStates() {
            sections.forEach(section => {
                const navItem = document.querySelector(`[data-section="${section}"]`);
                const sectionElement = document.getElementById(section);
                
                if (!navItem || !sectionElement) return;
                
                // Count answered questions in this section
                const answeredCount = countAnsweredQuestionsInSection(section);
                
                // Remove all state classes
                navItem.classList.remove('active', 'completed', 'inactive');
                
                if (section === currentSection) {
                    // Current section is always active
                    navItem.classList.add('active');
                } else if (answeredCount > 0) {
                    // Completed sections are green
                    navItem.classList.add('completed');
                } else {
                    // Uncompleted sections are inactive
                    navItem.classList.add('inactive');
                }
            });
        }

        function countAnsweredQuestionsInSection(sectionName) {
            const sectionElement = document.getElementById(sectionName);
            if (!sectionElement) return 0;
            
            let count = 0;
            const inputs = sectionElement.querySelectorAll('input[type="radio"], input[type="checkbox"], input[type="text"], textarea, select');
            
            inputs.forEach(input => {
                if (input.type === 'text' || input.tagName === 'TEXTAREA' || input.tagName === 'SELECT') {
                    if (input.value.trim() !== '') {
                        count++;
                    }
                } else if (input.checked) {
                    count++;
                }
            });
            
            return count;
        }

        function goToSection(sectionName) {
            // Update current section
            currentSection = sectionName;
            
            // Show the section content
            showSection(sectionName);
            
            // Update navigation buttons
            updateNavigation();
            
            // Update progress
            updateProgress();
            
            // Update section states
            updateSectionStates();
        }

        function showSection(sectionName) {
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the target section
            const targetSection = document.getElementById(sectionName);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }

        function nextSection() {
            const currentIndex = sections.indexOf(currentSection);
            if (currentIndex < sections.length - 1) {
                goToSection(sections[currentIndex + 1]);
            }
        }

        function previousSection() {
            const currentIndex = sections.indexOf(currentSection);
            if (currentIndex > 0) {
                goToSection(sections[currentIndex - 1]);
            }
        }

        function updateNavigation() {
            const currentIndex = sections.indexOf(currentSection);
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const submitBtn = document.getElementById('submitBtn');

            if (prevBtn) {
                prevBtn.style.display = currentIndex > 0 ? 'inline-flex' : 'none';
            }
            
            if (currentIndex === sections.length - 1) {
                if (nextBtn) nextBtn.style.display = 'none';
                if (submitBtn) submitBtn.style.display = 'inline-flex';
            } else {
                if (nextBtn) nextBtn.style.display = 'inline-flex';
                if (submitBtn) submitBtn.style.display = 'none';
            }
        }

        function updateProgress() {
            let answeredQuestions = 0;
            const totalQuestions = document.querySelectorAll('input[type="radio"], input[type="checkbox"], input[type="text"], textarea, select').length;
            
            document.querySelectorAll('input[type="radio"]:checked, input[type="checkbox"]:checked, input[type="text"], textarea, select').forEach(element => {
                if (element.type === 'text' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') {
                    if (element.value.trim() !== '') {
                        answeredQuestions++;
                    }
                } else {
                    answeredQuestions++;
                }
            });

            const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
            const progressFill = document.getElementById('progressFill');
            const progressText = document.getElementById('progressText');
            
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
            if (progressText) {
                progressText.textContent = Math.round(progress) + '% Complete';
            }
        }

        function setupEventListeners() {
            // Radio buttons and checkboxes
            document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
                input.addEventListener('change', function() {
                    updateOptionSelection(this);
                    updateProgress();
                    updateSectionStates();
                    saveAnswers();
                });
            });

            // Text inputs, textareas, and selects
            document.querySelectorAll('input[type="text"], textarea, select').forEach(input => {
                input.addEventListener('input', function() {
                    updateProgress();
                    updateSectionStates();
                    saveAnswers();
                });
            });
        }

        function updateOptionSelection(input) {
            const option = input.closest('.option');
            if (input.type === 'radio') {
                // Remove selected class from all options in the same group
                const name = input.name;
                document.querySelectorAll(`input[name="${name}"]`).forEach(radio => {
                    radio.closest('.option').classList.remove('selected');
                });
            }
            
            // Add selected class to the current option
            if (option) {
                option.classList.add('selected');
            }
        }

        function collectAnswers() {
            answers = {};
            document.querySelectorAll('input, textarea, select').forEach(element => {
                if (element.type === 'radio' && element.checked) {
                    answers[element.name] = element.value;
                } else if (element.type === 'checkbox') {
                    if (!answers[element.name]) {
                        answers[element.name] = [];
                    }
                    if (element.checked) {
                        answers[element.name].push(element.value);
                    }
                } else if ((element.type === 'text' || element.tagName === 'TEXTAREA' || element.tagName === 'SELECT') && element.value.trim() !== '') {
                    answers[element.name] = element.value;
                }
            });

            // Convert arrays to strings
            Object.keys(answers).forEach(key => {
                if (Array.isArray(answers[key])) {
                    answers[key] = answers[key].join(', ');
                }
            });
        }

        function saveAnswers() {
            collectAnswers();
            localStorage.setItem('questionnaireAnswers', JSON.stringify(answers));
        }

        function loadAnswers() {
            const savedAnswers = localStorage.getItem('questionnaireAnswers');
            if (savedAnswers) {
                try {
                    answers = JSON.parse(savedAnswers);
                    Object.keys(answers).forEach(key => {
                        const value = answers[key];
                        const elements = document.querySelectorAll(`[name="${key}"]`);
                        
                        elements.forEach(element => {
                            if (element.type === 'radio' || element.type === 'checkbox') {
                                if (value.includes && value.includes(element.value)) {
                                    element.checked = true;
                                    updateOptionSelection(element);
                                } else if (value === element.value) {
                                    element.checked = true;
                                    updateOptionSelection(element);
                                }
                            } else {
                                element.value = value;
                            }
                        });
                    });
                    updateProgress();
                    updateSectionStates();
                } catch (error) {
                    console.error('Error loading saved answers:', error);
                }
            }
        }

        // Function to create a simple hash of answers for cache management
        function createAnswerHash(answers) {
            const sortedAnswers = Object.keys(answers)
                .sort()
                .map(key => `${key}:${answers[key]}`)
                .join('|');
            
            let hash = 0;
            for (let i = 0; i < sortedAnswers.length; i++) {
                const char = sortedAnswers.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return hash.toString();
        }

        // Function to check if answers have changed and clear cache if needed
        function checkForAnswerChanges() {
            const currentAnswers = answers;
            const currentHash = createAnswerHash(currentAnswers);
            const lastHash = localStorage.getItem('lastAnswerHash');
            
            // If answers have changed, clear the cache
            if (lastHash && lastHash !== currentHash) {
                console.log('Answers changed, clearing cache');
                localStorage.removeItem('cachedResults');
            }
            
            // Store current hash for next time
            localStorage.setItem('lastAnswerHash', currentHash);
        }

        function submitQuestionnaire() {
            collectAnswers();
            
            // Check if answers changed and clear cache if needed
            checkForAnswerChanges();
            
            // Save answers to localStorage for the loading screen to process
            saveAnswers();
            
            // Redirect to loading screen
            window.location.href = 'email-collection.html';
        }

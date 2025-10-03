// Loading page functionality
let progress = 0;
let currentStep = 1;
let currentFactIndex = 0;
let progressInterval;

const facts = [
    {
        text: "Your blood can reveal nutrient and hormone deficiencies even before you notice symptoms, allowing you to fix small imbalances early and feel better faster."
    },
    {
        text: "Many age-related diseases—such as diabetes and heart disease—can be predicted long before any signs appear, giving you a head start on prevention."
    },
    {
        text: "Blood results are like a health dashboard—they show your progress after dietary changes or supplements, making healthy habits much more motivating."
    },
    {
        text: "Urine is a window into your body's internal chemistry: it can spot dehydration, kidney function changes, or infection earlier than almost any other sign."
    },
    {
        text: "Modern urine tests detect tiny metabolic shifts and infections missed by old-school methods, helping catch problems at their earliest and most treatable stages."
    },
    {
        text: "A simple urine sample can also indicate how well your body processes nutrients, sugar, and salt—guiding you toward the most effective dietary adjustments."
    },
    {
        text: "Your microbiome is a living fingerprint—so unique that it can change in as little as a few days after you tweak your diet or travel abroad."
    },
    {
        text: "Imbalances in gut bacteria are now linked directly to mood, energy, weight regulation, and even skin health—improving your microbiome can lift your spirits and energy."
    },
    {
        text: "Microbiome tests empower people with chronic bloating, food sensitivities, or skin issues to pinpoint the cause and resolve symptoms that seemed mysterious for years."
    },
    {
        text: "Seeing improvements after lifestyle changes on your blood, urine, or microbiome reports provides powerful feedback, boosting your confidence in taking charge of your well-being."
    },
    {
        text: "Many advanced panels can now reveal your \"biological age,\" helping you track aging at the cellular level and intervene for a longer, healthier life."
    },
    {
        text: "Regular screening moves you from reacting to problems to actively shaping your future health—a major psychological shift that is proven to increase life satisfaction and well-being."
    }
];

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Update progress bar with smooth animation
function updateProgress(newProgress, text) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    // Update text immediately
    if (text) {
        progressText.textContent = text;
    }
    
    // Animate progress bar smoothly
    const targetProgress = newProgress;
    const startProgress = progress;
    const duration = 1000; // 1 second animation
    const startTime = Date.now();
    
    function animateProgress() {
        const elapsed = Date.now() - startTime;
        const progressRatio = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progressRatio, 4);
        const currentProgress = startProgress + (targetProgress - startProgress) * easeOutQuart;
        
        progress = currentProgress;
        progressFill.style.width = progress + '%';
        
        // Update steps based on progress
        if (progress < 25) {
            updateStep(1);
        } else if (progress < 50) {
            updateStep(2);
        } else if (progress < 75) {
            updateStep(3);
        } else if (progress < 100) {
            updateStep(4);
        }
        
        if (progressRatio < 1) {
            requestAnimationFrame(animateProgress);
        }
    }
    
    requestAnimationFrame(animateProgress);
}

// Update current step
function updateStep(step) {
    if (step !== currentStep) {
        // Remove active class from all steps
        document.querySelectorAll('.step').forEach(s => {
            s.classList.remove('active', 'completed');
        });
        
        // Add completed class to previous steps
        for (let i = 1; i < step; i++) {
            document.getElementById(`step${i}`).classList.add('completed');
        }
        
        // Add active class to current step
        document.getElementById(`step${step}`).classList.add('active');
        currentStep = step;
    }
}

// Show next fact
function showNextFact() {
    const currentFact = document.getElementById('currentFact');
    
    // Fade out current fact
    currentFact.classList.remove('active');
    
    setTimeout(() => {
        // Update fact content
        const fact = facts[currentFactIndex];
        currentFact.innerHTML = fact.text;
        
        // Fade in new fact
        currentFact.classList.add('active');
        
        // Move to next fact
        currentFactIndex = (currentFactIndex + 1) % facts.length;
    }, 500);
}

// Start steady progress animation
function startSteadyProgress() {
    let currentProgress = 0;
    const totalDuration = 25000; // 25 seconds total
    const updateInterval = 100; // Update every 100ms
    const progressPerUpdate = 100 / (totalDuration / updateInterval);
    
    progressInterval = setInterval(() => {
        currentProgress += progressPerUpdate;
        
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(progressInterval);
        }
        
        // Update progress bar smoothly
        updateProgress(currentProgress);
        
        // Update progress text at key milestones
        if (currentProgress >= 10 && currentProgress < 25) {
            updateProgress(currentProgress, 'Preparing your data...');
        } else if (currentProgress >= 25 && currentProgress < 50) {
            updateProgress(currentProgress, 'Decoding Your Testing Status and Needs');
        } else if (currentProgress >= 50 && currentProgress < 75) {
            updateProgress(currentProgress, 'Matching the map of the screenings');
        } else if (currentProgress >= 75 && currentProgress < 100) {
            updateProgress(currentProgress, 'Generating your personalized report...');
        } else if (currentProgress >= 100) {
            updateProgress(currentProgress, 'Complete! Redirecting to your results...');
        }
    }, updateInterval);
}

// Create a simple hash function for answer fingerprinting
function createAnswerHash(answers) {
    // Sort answers by key to ensure consistent hashing
    const sortedAnswers = Object.keys(answers)
        .sort()
        .map(key => `${key}:${answers[key]}`)
        .join('|');
    
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < sortedAnswers.length; i++) {
        const char = sortedAnswers.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString();
}

// Check if we have cached results for these answers
function getCachedResults(answerHash) {
    try {
        const cachedData = localStorage.getItem('cachedResults');
        if (cachedData) {
            const cache = JSON.parse(cachedData);
            return cache[answerHash] || null;
        }
    } catch (error) {
        console.error('Error reading cached results:', error);
    }
    return null;
}

// Cache results for future use
function cacheResults(answerHash, results) {
    try {
        const cachedData = localStorage.getItem('cachedResults');
        let cache = cachedData ? JSON.parse(cachedData) : {};
        
        // Store results with timestamp
        cache[answerHash] = {
            results: results,
            timestamp: Date.now()
        };
        
        // Keep only last 10 cached results to prevent localStorage bloat
        const cacheKeys = Object.keys(cache);
        if (cacheKeys.length > 10) {
            // Sort by timestamp and remove oldest
            const sortedKeys = cacheKeys.sort((a, b) => cache[a].timestamp - cache[b].timestamp);
            for (let i = 0; i < sortedKeys.length - 10; i++) {
                delete cache[sortedKeys[i]];
            }
        }
        
        localStorage.setItem('cachedResults', JSON.stringify(cache));
    } catch (error) {
        console.error('Error caching results:', error);
    }
}

// Submit questionnaire and get results
async function submitQuestionnaire() {
    try {
        // Get answers from localStorage
        const answers = JSON.parse(localStorage.getItem('questionnaireAnswers') || '{}');
        
        if (Object.keys(answers).length === 0) {
            throw new Error('No questionnaire data found');
        }
        
        // Create fingerprint of current answers
        const answerHash = createAnswerHash(answers);
        
        // Check if we have cached results for these exact answers
        const cachedResults = getCachedResults(answerHash);
        
        if (cachedResults) {
            console.log('Using cached results for same answers');
            updateProgress(10, 'Loading your previous results...');
            
            // Use cached results
            localStorage.setItem('healthAssessmentResults', JSON.stringify(cachedResults.results));
            
            // Fast progress to 100% since we're using cache
            setTimeout(() => {
                clearInterval(progressInterval);
                updateProgress(100, 'Complete! Redirecting to your results...');
                
                setTimeout(() => {
                    window.location.href = 'results.html';
                }, 1000);
            }, 2000);
            
            return;
        }
        
        // No cached results, proceed with API call
        console.log('No cached results found, making API call');
        
        // Start steady progress animation
        startSteadyProgress();
        
        // Wait a bit before starting API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const responses = Object.keys(answers).map(key => ({
            question: key,
            answer: answers[key]
        }));

        const response = await fetch('http://localhost:3001/api/analyze-health', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ responses })
        });

        const result = await response.json();
        
        if (result.success) {
            // Cache the results for future use
            cacheResults(answerHash, result.data);
            
            localStorage.setItem('healthAssessmentResults', JSON.stringify(result.data));
            
            // Ensure progress reaches 100%
            clearInterval(progressInterval);
            updateProgress(100, 'Complete! Redirecting to your results...');
            
            setTimeout(() => {
                window.location.href = 'results.html';
            }, 1500);
        } else {
            throw new Error(result.error || 'Failed to analyze health data');
        }
    } catch (error) {
        console.error('Error submitting questionnaire:', error);
        clearInterval(progressInterval);
        updateProgress(100, 'Error processing your data. Redirecting...');
        setTimeout(() => {
            window.location.href = 'questionnaire.html';
        }, 2000);
    }
}

// Initialize
function init() {
    createParticles();
    
    // Start fact rotation - changed from 4000ms to 8000ms (8 seconds) for slower rotation
    setInterval(showNextFact, 8000);
    
    // Start the questionnaire submission
    setTimeout(submitQuestionnaire, 1000);
}

// Start when page loads
document.addEventListener('DOMContentLoaded', init);

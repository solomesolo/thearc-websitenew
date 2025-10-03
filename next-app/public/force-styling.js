// Force circular checkboxes and radio buttons
function forceCircularInputs() {
    // Get all checkboxes and radio buttons
    const inputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    
    inputs.forEach(input => {
        // Force circular styling
        input.style.width = '20px';
        input.style.height = '20px';
        input.style.borderRadius = '50%';
        input.style.appearance = 'none';
        input.style.webkitAppearance = 'none';
        input.style.mozAppearance = 'none';
        input.style.background = 'rgba(255, 255, 255, 0.1)';
        input.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        input.style.transition = 'all 0.3s ease';
        input.style.cursor = 'pointer';
        
        // Add event listeners for hover and checked states
        input.addEventListener('mouseenter', function() {
            if (!this.checked) {
                this.style.borderColor = '#3b82f6';
                this.style.background = 'rgba(59, 130, 246, 0.1)';
            }
        });
        
        input.addEventListener('mouseleave', function() {
            if (!this.checked) {
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }
        });
        
        input.addEventListener('change', function() {
            if (this.checked) {
                this.style.background = '#3b82f6';
                this.style.borderColor = '#3b82f6';
            } else {
                this.style.background = 'rgba(255, 255, 255, 0.1)';
                this.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }
        });
    });
}

// Force unified text input styling
function forceTextInputStyling() {
    const textInputs = document.querySelectorAll('input[type="text"]');
    
    textInputs.forEach(input => {
        input.style.background = 'rgba(255, 255, 255, 0.05)';
        input.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        input.style.borderRadius = '8px';
        input.style.padding = '0.75rem 1rem';
        input.style.color = '#ffffff';
        input.style.width = '100%';
        input.style.fontSize = '1rem';
        input.style.transition = 'all 0.3s ease';
        
        input.addEventListener('focus', function() {
            this.style.outline = 'none';
            this.style.borderColor = '#3b82f6';
            this.style.background = 'rgba(255, 255, 255, 0.08)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            this.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });
}

// Run the styling functions when the page loads
document.addEventListener('DOMContentLoaded', function() {
    forceCircularInputs();
    forceTextInputStyling();
    
    // Also run when new content is added
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                forceCircularInputs();
                forceTextInputStyling();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

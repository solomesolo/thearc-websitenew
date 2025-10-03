import re

# Read the file
with open('questionnaire.html', 'r') as f:
    content = f.read()

# Replace the entire submitQuestionnaire function
old_function = r'async function submitQuestionnaire\(\) \{[^}]*\{[^}]*\}[^}]*\}[^}]*\}'
new_function = '''function submitQuestionnaire() {
            collectAnswers();
            
            // Save answers to localStorage for the loading screen to process
            saveAnswers();
            
            // Redirect to loading screen
            window.location.href = 'loading.html';
        }'''

# Use a more specific pattern to match the entire function
pattern = r'async function submitQuestionnaire\(\) \{.*?^\s*\}'
replacement = new_function

# Find and replace with multiline and dotall flags
content = re.sub(pattern, replacement, content, flags=re.MULTILINE | re.DOTALL)

# Write back to file
with open('questionnaire.html', 'w') as f:
    f.write(content)

print("Function replaced successfully")

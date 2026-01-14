# website-extension

## Overview
This project is a browser extension designed to provide a questionnaire layout and design for user screening recommendations. The extension allows users to fill out a questionnaire, and it collects their responses for further analysis.

## Project Structure
```
website-extension
├── src
│   ├── content
│   │   ├── questionnaire.js
│   │   └── styles.css
│   ├── background
│   │   └── background.js
│   └── popup
│       ├── popup.html
│       ├── popup.js
│       └── popup.css
├── manifest.json
├── package.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd website-extension
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Load the extension in your browser:
   - For Chrome: Go to `chrome://extensions/`, enable "Developer mode", and click "Load unpacked". Select the `website-extension` directory.
   - For Firefox: Go to `about:debugging#/runtime/this-firefox`, click "Load Temporary Add-on", and select the `manifest.json` file.

2. Click on the extension icon to open the questionnaire popup.

## Features
- User-friendly questionnaire layout
- Data collection and handling
- Background task management

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
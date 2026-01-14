// This file manages background tasks for the extension.

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed and background script running.');
});

// Example of handling a message from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getData') {
        // Handle the request and send a response
        sendResponse({ data: 'Sample data from background script' });
    }
});

// Additional background tasks can be added here
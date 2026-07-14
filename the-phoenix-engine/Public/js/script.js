// public/js/script.js

document.getElementById('executeBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const outputDiv = document.getElementById('output');

    outputDiv.innerText = "Processing command...";

    try {
        // API call to the backend route
        const response = await fetch('/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: userInput, tier: 'INSTITUTIONAL' })
        });

        const data = await response.json();
        
        // Display lethal response
        outputDiv.innerText = data.result;
    } catch (error) {
        outputDiv.innerText = "System Failure: Connection Error.";
    }
});

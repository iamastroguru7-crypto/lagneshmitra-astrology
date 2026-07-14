// Public/js/script.js

document.getElementById('executeBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const apiKey = document.getElementById('apiKeyInput').value; // UI se key fetch ki
    const outputDiv = document.getElementById('output');

    // 1. Validation
    if (!apiKey.trim()) {
        outputDiv.innerText = "> Error: API Key is required.";
        return;
    }
    if (!userInput.trim()) {
        outputDiv.innerText = "> Error: Command input required.";
        return;
    }

    outputDiv.innerText = "> Initializing core engine with provided credentials...";

    try {
        // 2. API call with Key and Query
        const response = await fetch('/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                query: userInput, 
                apiKey: apiKey, // Key yahan pass ho rahi hai
                tier: 'INSTITUTIONAL',
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.result || 'Server unreachable');
        }

        const data = await response.json();
        
        // 3. Display Result
        outputDiv.innerText = data.result || "> Engine executed successfully.";
    } catch (error) {
        outputDiv.innerText = `> System Failure: ${error.message}`;
        console.error("Execution Error:", error);
    }
});

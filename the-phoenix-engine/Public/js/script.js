// Public/js/script.js

document.getElementById('executeBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    const outputDiv = document.getElementById('output');

    if (!userInput.trim()) {
        outputDiv.innerText = "Error: Input required for analysis.";
        return;
    }

    outputDiv.innerText = "> Initializing core engine...";

    try {
        // API call to the backend route
        const response = await fetch('/api/execute', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                query: userInput, 
                tier: 'INSTITUTIONAL',
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Server unreachable');
        }

        const data = await response.json();
        
        // Display lethal response
        outputDiv.innerText = data.result || "> Engine executed successfully.";
    } catch (error) {
        outputDiv.innerText = "> System Failure: Connection Error. Verify server status.";
        console.error("Execution Error:", error);
    }
});

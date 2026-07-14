// core/orchestrator.js
const axios = require('axios');

class Orchestrator {
    constructor() {
        this.apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    }

    // Ab hum key argument mein lenge (Frontend/Route se pass hogi)
    async execute(prompt, userApiKey, context = "You are the Chief Strategy Officer for The Phoenix. Provide tactical, versatile, and high-precision analysis.") {
        
        if (!userApiKey) {
            throw new Error("System Error: API Key missing.");
        }

        try {
            const response = await axios.post(this.apiUrl, {
                // Versatile model activated
                model: "llama-3.1-70b-versatile", 
                messages: [
                    { role: "system", content: context },
                    { role: "user", content: prompt }
                ],
                temperature: 0.5 // Balanced for versatile operations
            }, {
                headers: {
                    'Authorization': `Bearer ${userApiKey}`, // Dynamic Key from user
                    'Content-Type': 'application/json'
                },
                timeout: 20000 // 20s limit for heavier model processing
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error.message : error.message;
            console.error(`[ORCHESTRATOR_ERROR]: ${errorMessage}`);
            
            throw new Error("Versatile engine execution failed.");
        }
    }
}

module.exports = new Orchestrator();

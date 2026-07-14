// core/orchestrator.js
const axios = require('axios');
require('dotenv').config();

class Orchestrator {
    constructor() {
        this.apiKey = process.env.GROQ_API_KEY;
        this.apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
        
        // Security Check: Key load hui ya nahi
        if (!this.apiKey) {
            console.error("[CRITICAL]: GROQ_API_KEY is not defined in environment variables.");
        }
    }

    async execute(prompt, context = "You are the Chief Strategy Officer for The Phoenix. Provide precise, tactical, and institutional-grade analysis.") {
        if (!this.apiKey) {
            return "System Error: API Key missing. Execution aborted.";
        }

        try {
            const response = await axios.post(this.apiUrl, {
                model: "llama3-groq-70b-8192-tool-use-preview",
                messages: [
                    { role: "system", content: context },
                    { role: "user", content: prompt }
                ],
                temperature: 0.2 // Optimized for institutional precision
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: 15000 // 15-second timeout to prevent engine hang
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            // Detailed Error Logging
            const errorMessage = error.response ? error.response.data.error.message : error.message;
            console.error(`[ORCHESTRATOR_ERROR]: ${errorMessage}`);
            
            throw new Error("Lethal execution failed: Engine unreachable.");
        }
    }
}

module.exports = new Orchestrator();

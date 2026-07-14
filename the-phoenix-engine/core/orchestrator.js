const axios = require('axios');

class Orchestrator {
    constructor() {
        this.apiKey = process.env.GROQ_API_KEY;
        this.apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
    }

    async execute(prompt, context = "You are the Chief Strategy Officer for The Phoenix.") {
        try {
            const response = await axios.post(this.apiUrl, {
                model: "llama3-groq-70b-8192-tool-use-preview",
                messages: [
                    { role: "system", content: context },
                    { role: "user", content: prompt }
                ],
                temperature: 0.2 // Low temperature for high precision
            }, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json'
                }
            });

            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("[ORCHESTRATOR_ERROR]:", error.message);
            throw new Error("Lethal execution failed.");
        }
    }
}

module.exports = new Orchestrator();

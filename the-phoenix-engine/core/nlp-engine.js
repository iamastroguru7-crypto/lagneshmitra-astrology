// /core/nlp-engine.js

class NLPEngine {
    // Incoming text ko clean aur process karne ke liye
    process(input) {
        if (!input || typeof input !== 'string') return null;

        // 1. Sanitize input (remove unwanted characters)
        const sanitized = input.trim().replace(/[<>]/g, "");

        // 2. Extract core intent (Simplified simulation of NLP)
        const intent = this.detectIntent(sanitized);

        return {
            original: sanitized,
            tokens: sanitized.split(" "),
            intent: intent,
            timestamp: new Date().toISOString()
        };
    }

    detectIntent(text) {
        if (text.includes("sell") || text.includes("buy")) return "FINANCIAL_ACTION";
        if (text.includes("help") || text.includes("how")) return "ADVISORY";
        return "GENERAL";
    }
}

module.exports = new NLPEngine();


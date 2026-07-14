// api/routes.js
const express = require('express');
const router = express.Router();
const Orchestrator = require('../core/orchestrator');
const Humanizer = require('../core/humanizer');
const NLPEngine = require('../core/nlp-engine');

router.post('/execute', async (req, res) => {
    try {
        // API key bhi destructure kar
        const { query, tier, apiKey } = req.body;

        if (!query || !apiKey) {
            return res.status(400).json({ result: "Error: Query and API Key are required." });
        }
        
        console.log(`[EXECUTION_START] Tier: ${tier}`);

        // 1. NLP Processing
        const nlpData = NLPEngine.process(query);
        
        // 2. Orchestrator ko apiKey pass kar
        const rawResponse = await Orchestrator.execute(nlpData.original || query, apiKey);
        
        // 3. Humanizer
        const finalResponse = Humanizer.applyTone(rawResponse, tier || 'INSTITUTIONAL');
        
        res.json({ result: finalResponse });

    } catch (error) {
        console.error("[CRITICAL_FAILURE]:", error.message);
        res.status(500).json({ 
            result: "System Failure: Authentication or Engine connection error." 
        });
    }
});

module.exports = router;

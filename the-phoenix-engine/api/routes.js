// api/routes.js
const express = require('express');
const router = express.Router();
const Orchestrator = require('../core/orchestrator');
const Humanizer = require('../core/humanizer');
const NLPEngine = require('../core/nlp-engine');

router.post('/execute', async (req, res) => {
    try {
        const { query, tier } = req.body;

        // Validation: Query khali nahi honi chahiye
        if (!query) {
            return res.status(400).json({ result: "Error: Input required." });
        }
        
        console.log(`[EXECUTION_START] Tier: ${tier} | Query: ${query}`);

        // 1. Process Input via NLP Engine
        const nlpData = NLPEngine.process(query);
        
        // 2. Get AI Response via Orchestrator
        const rawResponse = await Orchestrator.execute(nlpData.original || query);
        
        // 3. Humanize Response via Humanizer
        const finalResponse = Humanizer.applyTone(rawResponse, tier || 'INSTITUTIONAL');
        
        console.log(`[EXECUTION_SUCCESS]`);
        
        res.json({ result: finalResponse });

    } catch (error) {
        console.error("[CRITICAL_FAILURE]:", error.message);
        res.status(500).json({ 
            result: "System Failure: The Phoenix Engine encountered a critical error during execution." 
        });
    }
});

module.exports = router;

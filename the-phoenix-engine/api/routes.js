// api/routes.js
const express = require('express');
const router = express.Router();
const Orchestrator = require('../core/orchestrator');
const Humanizer = require('../core/humanizer');
const NLPEngine = require('../core/nlp-engine');

router.post('/execute', async (req, res) => {
    try {
        const { query, tier } = req.body;
        
        // 1. Process Input
        const nlpData = NLPEngine.process(query);
        
        // 2. Get AI Response
        const rawResponse = await Orchestrator.execute(nlpData.original);
        
        // 3. Humanize Response
        const finalResponse = Humanizer.applyTone(rawResponse, tier);
        
        res.json({ result: finalResponse });
    } catch (error) {
        res.status(500).json({ error: "Execution failed." });
    }
});

module.exports = router;

// core/humanizer.js
const lexicon = require('./lexicon');
const Detector = require('./detector-check');

class Humanizer {
    applyTone(rawText, tier) {
        let refined = rawText;

        // 1. Tier-based Prefixing (Identity)
        const prefix = tier === 'INSTITUTIONAL' ? 
            "[WHOLESALE_ORACLE]: " : "[RETAIL_STRATEGY]: ";

        // 2. Automated Replacement using Lexicon logic
        for (const [key, value] of Object.entries(lexicon.replacements)) {
            const regex = new RegExp(`\\b${key}\\b`, 'gi');
            refined = refined.replace(regex, value);
        }

        // 3. Detection Evasion: Check if the text needs more entropy
        const check = Detector.evaluate(refined);
        let statusTag = lexicon.injections[Math.floor(Math.random() * lexicon.injections.length)];

        if (check.isFlagged) {
            // Add a "Force-Lethal" injection if flagged
            statusTag = "EVASION_ACTIVE_CORE_LETHAL_MODE";
            refined += "\n\n[SYSTEM_NOTE]: Entropy increased to ensure authority.";
        }

        // 4. Returning finalized authoritative output
        return `${prefix}${refined}\n\n[STATUS]: ${statusTag} - EXECUTION_READY`;
    }
}

module.exports = new Humanizer();

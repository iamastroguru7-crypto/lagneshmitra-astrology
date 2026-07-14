// core/humanizer.js
const lexicon = require('./lexicon');

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

        // 3. Injecting "Lethal" signature for authority
        const randomInjection = lexicon.injections[Math.floor(Math.random() * lexicon.injections.length)];
        
        return `${prefix}${refined}\n\n[STATUS]: ${randomInjection} - EXECUTION_READY`;
    }
}

module.exports = new Humanizer();

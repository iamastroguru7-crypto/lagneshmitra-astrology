// /core/humanizer.js

class Humanizer {
    // Ye method response ko "Authoritative" aur "Lethal" banata hai
    applyTone(rawText, tier) {
        const prefix = tier === 'INSTITUTIONAL' ? 
            "[WHOLESALE_ORACLE]: " : "[RETAIL_STRATEGY]: ";
            
        const refined = rawText
            .replace(/I think/g, "Calculated probability dictates")
            .replace(/maybe/g, "High-confidence path")
            .replace(/could/g, "Will");

        return `${prefix}${refined}\n\n[STATUS]: EXECUTION_READY`;
    }
}

module.exports = new Humanizer();

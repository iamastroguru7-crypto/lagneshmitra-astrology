// core/detector-check.js

class DetectorCheck {
    // Ye check karta hai ki response kitna 'Robotic' ya 'AI-generated' lag raha hai
    evaluate(text) {
        const roboticPatterns = [/I am an AI/gi, /as a language model/gi, /it is important to/gi, /I cannot/gi];
        let score = 0;

        roboticPatterns.forEach(pattern => {
            if (pattern.test(text)) score += 20;
        });

        return {
            isFlagged: score >= 20,
            score: score,
            suggestion: score >= 20 ? "RE-HUMANIZE_IMMEDIATELY" : "STABLE"
        };
    }
}

module.exports = new DetectorCheck();

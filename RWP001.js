function RWP001(text){

    // Rule 001
    text = text.replace(/and planet/gi, "and the planets");

    // Rule 002
    text = text.replace(/planetary combination/gi, "the planetary combinations");

    // Rule 003
    text = text.replace(/indicates good wealth/gi, "indicates the good wealth");

    // Rule 004
    text = text.replace(/the\s+the/gi, "the");

    // Rule 005
    text = text.replace(/\blife\b/gi, "the life");

    // Rule 006
    text = text.replace(/\bcompanionship\b/gi, "the companionship");

    // Rule 007
    text = text.replace(/\btrust\b/gi, "the trust");

    // Rule 008
    text = text.replace(/\bgrowth\b/gi, "the growth");

    // Rule 009
    text = text.replace(/\bstrength\b/gi, "the strength");

    // Rule 010
    text = text.replace(/\bstability\b/gi, "the stability");

    // ==================================
// Rule 11 - Page 159 Pluralism
// ==================================

const pluralRules = {

    "Relationship Legacy Potential": "Relationship Legacy Potentials",

    "relationship potential": "relationship potentials",

    "relationship development": "relationship developments",

    "relationship": "relationships",

    "commitment": "commitments",

    "attraction": "attractions",

    "understanding": "understandings",

    "communication": "communications",

    "mutual respect": "mutual respects",

    "Saturn influence": "Saturn influences",

    "endurance": "endurances",

    "experience": "experiences",

    "compassion": "compassions",

    "adaptation": "adaptations",

    "partnership development": "partnership developments",

    "fulfilment": "fulfilments"

};

for (const [find, replace] of Object.entries(pluralRules)) {

    text = text.replace(
        new RegExp(find, "gi"),
        replace
    );

}

// return text; iske baad

    // ==================================
// RWP Rule 012
// LM Definite Article Repository
// Version : 1.0
// Status  : Testing
// ==================================

const articleRules = {

    "strengths": "the strengths",
    "progress": "the progress",
    "challenges": "the challenges",
    "growth": "the growth",
    "purpose": "the purpose",
    "limitations": "the limitations",
    "developmental themes": "the developmental themes",
    "maturity": "the maturity",
    "self-improvement": "the self-improvement",
    "intellectual curiosity": "the intellectual curiosity",
    "adaptability": "the adaptability",
    "divided attention": "the divided attention",
    "priorities": "the priorities",
    "significant learning": "the significant learning",
    "expectations": "the expectations",
    "experience": "the experiences",
    "emotional intensity": "the emotional intensity",
    "transformation": "the transformation",
    "resilience": "the resilience",
    "patience": "the patience",
    "ability": "the ability",
    "greater focus": "the greater focus",
    "emotional balance": "the emotional balance",
    "long-term perspective": "the long-term perspective"

};

for (const [find, replace] of Object.entries(articleRules)) {

    text = text.replace(
        new RegExp("\\b" + find + "\\b", "gi"),
        replace
    );

}
    // ==================================
// RWP Rule 013
// LM Pluralism Repository
// Version : 1.0
// Status  : Testing
// ==================================

const pluralRules = {

    "challenge": "challenges",
    "developmental theme": "developmental themes",
    "relationship": "relationships",
    "partnership": "partnerships",
    "expectation": "expectations",
    "communication": "communications",
    "understanding": "understandings",
    "phase": "phases",
    "outcome": "outcomes",
    "lesson": "lessons",
    "experience": "experiences",
    "result": "results",
    "strength": "strengths",
    "limitation": "limitations"

};

for (const [find, replace] of Object.entries(pluralRules)) {

    text = text.replace(
        new RegExp("\\b" + find + "\\b", "gi"),
        replace
    );

}

    return text;
}

export default RWP001;

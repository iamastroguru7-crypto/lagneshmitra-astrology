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

    return text;
}

export default RWP001;

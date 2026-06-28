/*
======================================
RWP002
Advanced LM Cadence Engine
Version : 0.0.1
Status  : Experimental
======================================
*/

function RWP002(text){

    // ==========================
    // Rule 012
    // The Factor
    // ==========================

    const articleRules = {

        "life":"the life",
        "companionship":"the companionship",
        "purpose":"the purpose",
        "progress":"the progress",
        "growth":"the growth",
        "strength":"the strength",
        "stability":"the stability",
        "trust":"the trust",
        "goodwill":"the goodwill",
        "patience":"the patience",
        "maturity":"the maturity",
        "adaptability":"the adaptability",
        "resilience":"the resilience",
        "transformation":"the transformation",
        "priorities":"the priorities",
        "limitations":"the limitations",
        "challenges":"the challenges"

    };

    for (const [find, replace] of Object.entries(articleRules)) {

        text = text.replace(
            new RegExp("\\b" + find + "\\b","gi"),
            replace
        );

    }

    // ==========================
    // Rule 013
    // LM Pluralism
    // ==========================

    const pluralRules = {

        "relationship":"relationships",
        "challenge":"challenges",
        "partnership":"partnerships",
        "communication":"communications",
        "understanding":"understandings",
        "experience":"experiences",
        "lesson":"lessons",
        "outcome":"outcomes",
        "commitment":"commitments",
        "adaptation":"adaptations"

    };

    for (const [find, replace] of Object.entries(pluralRules)) {

        text = text.replace(
            new RegExp("\\b" + find + "\\b","gi"),
            replace
        );

    }

    return text;

}

export default RWP002;

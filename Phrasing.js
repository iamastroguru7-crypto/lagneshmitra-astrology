/*
======================================
Phrasing Engine
Version : 0.0.1
Status  : Experimental
======================================
*/

function Phrasing(text){

    const phraseRules = {

        "personal growth" : "the personal growth",

        "relationship legacy" : "the relationship legacy",

        "shared experiences" : "the shared experiences",

        "emotional balance" : "the emotional balance",

        "long-term development" : "the long-term development",

        "long-term fulfilment" : "the long-term fulfilment",

        "mutual respect" : "the mutual respect",

        "good health" : "the good health",

        "planetary combinations" : "the planetary combinations",

        "important outcomes" : "the important outcomes",

        "intellectual curiosity" : "the intellectual curiosity",

        "divided attention" : "the divided attention",

        "personal character" : "the personal character",

        "lasting stability" : "the lasting stability"

    };

    for (const [find, replace] of Object.entries(phraseRules)) {

        text = text.replace(
            new RegExp("\\b" + find + "\\b","gi"),
            replace
        );

    }

    return text;

}

export default Phrasing;

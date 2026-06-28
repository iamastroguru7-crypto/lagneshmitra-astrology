/*
======================================
LM Grammar Engine
Version : 0.0.1
Status  : Experimental
======================================
*/

function Grammar(text){

    // =========================
    // G001
    // Remove Duplicate "the"
    // =========================

    text = text.replace(/\bthe\s+the\b/gi, "the");


    // =========================
    // G002
    // Remove Double Plural
    // =========================

    text = text.replace(/\brelationshipss\b/gi, "relationships");
    text = text.replace(/\bexperiencess\b/gi, "experiences");
    text = text.replace(/\bdevelopmentss\b/gi, "developments");
    text = text.replace(/\bcommitmentss\b/gi, "commitments");
    text = text.replace(/\bunderstandingss\b/gi, "understandings");


    // =========================
    // G003
    // LM Phrase Corrections
    // =========================

    text = text.replaceAll(
        "personal the growth",
        "the personal growth"
    );

    text = text.replaceAll(
        "emotional the growth",
        "the emotional growth"
    );

    text = text.replaceAll(
        "relationships the legacy",
        "the relationship legacy"
    );

    text = text.replaceAll(
        "shared the experiences",
        "the shared experiences"
    );


    // =========================
    // G004
    // LM Signature Grammar
    // =========================

    text = text.replaceAll(
        "both strengths",
        "both the strengths"
    );

    text = text.replaceAll(
        "and challenges",
        "and the challenges"
    );


    // =========================
    // G005
    // Cleanup
    // =========================

    text = text.replace(/\s{2,}/g," ");

    return text;

}

export default Grammar;

/*
======================================
RWP003
IF Condition Engine
Version : 0.0.1
======================================
*/

function RWP003(text){

    // Remove duplicate "the"
    text = text.replace(/\bthe\s+the\b/gi, "the");

    // Remove duplicate plural
    text = text.replace(/\brelationshipss\b/gi, "relationships");

    text = text.replace(/\bcommunicationss\b/gi, "communications");

    text = text.replace(/\bunderstandingss\b/gi, "understandings");

    text = text.replace(/\bcommitmentss\b/gi, "commitments");

    return text;

}

export default RWP003;

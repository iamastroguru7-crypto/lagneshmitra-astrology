/*
======================================
LagneshMitra Engine
Version : 0.0.1
======================================
*/

function RunLME(text){

    // =========================
    // RWP Rule 001
    // =========================

    text = text.replaceAll(
        "and planet",
        "and the planets"
    );

    // =========================
    // RWP Rule 002
    // =========================

    text = text.replaceAll(
        "planetary combination",
        "the planetary combinations"
    );

    // =========================
    // RWP Rule 003
    // =========================

    text = text.replaceAll(
        "indicates good wealth",
        "indicates the good wealth"
    );

    /*
====================================================
RWP004
Rule Name : Add Definite Article Before Planetary Combinations
Version   : 1.0
Status    : Active

Purpose:
Whenever the phrase "planetary combinations"
appears without the definite article "the",
automatically prepend "the".

Example:

Input:
Planetary combinations indicate success.

Output:
The planetary combinations indicate success.

Input:
Mars creates planetary combinations.

Output:
Mars creates the planetary combinations.

====================================================
*/

function RWP004(text){

    return text.replace(
        /\b(?<!the\s)planetary combinations\b/gi,
        "the planetary combinations"
    );

}

export default RWP004;

    return text;

}

export default RunLME;

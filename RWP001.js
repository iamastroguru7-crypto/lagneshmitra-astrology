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

    return text;

}

export default RunLME;

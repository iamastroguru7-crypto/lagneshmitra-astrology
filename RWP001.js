/*
======================================
LagneshMitra Engine (LME)
Version : 0.0.1
======================================
*/

function RunLME(text) {

    // ==================================
    // RWP Rule 001
    // and planet
    // ->
    // and the planets
    // ==================================

    text = text.replaceAll(
        "and planet",
        "and the planets"
    );

    // ==================================
    // RWP Rule 002
    // planetary combination
    // ->
    // the planetary combinations
    // ==================================

    text = text.replaceAll(
        "planetary combination",
        "the planetary combinations"
    );

    // ==================================
    // RWP Rule 003
    // indicates good wealth
    // ->
    // indicates the good wealth
    // ==================================

    text = text.replaceAll(
        "indicates good wealth",
        "indicates the good wealth"
    );

    // ==================================
    // RWP Rule 004
    // planetary combinations
    // ->
    // the planetary combinations
    // ==================================

    text = text.replace(
        /planetary combinations/gi,
        "the planetary combinations"
    );

    return text;
}

export default RunLME;

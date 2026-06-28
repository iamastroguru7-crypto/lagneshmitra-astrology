/*
=========================================
RWP RULE 001
Natural Grammar Rule
Version : 1.0
Status  : Active
=========================================

Purpose:
Avoid unnatural singular references.

Example:

❌ and planet
✔ and the planets

❌ planet indicates
✔ the planets indicate

*/

function RWP001(text) {

    let output = text;

    output = output.replace(/\band planet\b/gi, "and the planets");
    output = output.replace(/\bplanet indicates\b/gi, "the planets indicate");
    output = output.replace(/\bplanet gives\b/gi, "the planets give");

    return output;
}

export default RWP001;

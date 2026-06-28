/*
=========================================
RWP001.js
Rule ID   : RWP001
Version   : 1.0
Status    : Active
=========================================
*/

function RWP001(text){

    // Rule 1
    text = text.replace(/and planet/gi, "and the planets");

    // Rule 2
    text = text.replace(/planetary combination/gi, "the planetary combinations");

    // Rule 3
    text = text.replace(/indicates good wealth/gi, "indicates the good wealth");

    // Rule 4
    text = text.replace(/the\s+the/gi, "the");

    return text;

}

export default RWP001;

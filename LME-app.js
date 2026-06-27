import { LMERules } from "./LME-Rules.js";

const prompt=document.getElementById("prompt");

const button=document.getElementById("sendBtn");

const response=document.getElementById("response");

button.onclick=()=>{

response.innerHTML=

"LM Engine Loaded Successfully.\n\n"+

"Version : "+LMERules.version+

"\n\nPrompt Received:\n\n"+

prompt.value;

};

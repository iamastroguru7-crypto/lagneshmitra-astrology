import { LMERules } from "./LME-Rules.js";
import { GEMINI_API_KEY } from "./LME-config.js";

const prompt=document.getElementById("prompt");

const button=document.getElementById("sendBtn");

const response=document.getElementById("response");

button.onclick = async () => {

    if(prompt.value.trim()==""){

        alert("Enter Prompt");

        return;

    }

    response.innerHTML="Generating...";

    try{

        const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key="+GEMINI_API_KEY,
        {

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                contents:[{

                    parts:[{

                        text:prompt.value

                    }]

                }]

            })

        });

        const data = await res.json();

        response.innerHTML =
        data.candidates[0].content.parts[0].text;

    }

    catch(error){

        console.error(error);

        response.innerHTML="❌ Error connecting to Gemini";

    }

};

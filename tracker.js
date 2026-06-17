import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
doc,
getDoc,
setDoc,
updateDoc,
serverTimestamp,
increment
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyBzLT95nrwLDu-bYGVJdstUKQ6tEL2GM2w",
authDomain: "lagneshmitra-astrology-e72fb.firebaseapp.com",
projectId: "lagneshmitra-astrology-e72fb",
storageBucket: "lagneshmitra-astrology-e72fb.firebasestorage.app",
messagingSenderId: "223772639779",
appId: "1:223772639779:web:49341578713e2c0c9ae796",
measurementId: "G-KN4F9HFQPD"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function trackVisitor(){

let visitorId =
localStorage.getItem("lm_visitor_id");

if(!visitorId){

visitorId =
"VIS-" +
Math.random().toString(36).substring(2,10);

localStorage.setItem(
"lm_visitor_id",
visitorId
);

}

const visitorRef =
doc(db,"visitors",visitorId);

const visitorSnap =
await getDoc(visitorRef);

const now =
Date.now();

if(!visitorSnap.exists()){

await setDoc(visitorRef,{

visitor_id: visitorId,

browser:navigator.userAgent,

language:navigator.language,

device_type:
window.innerWidth < 768
? "Mobile"
: "Desktop",

country:"Unknown",

source:
document.referrer || "direct",

timezone:
Intl.DateTimeFormat()
.resolvedOptions()
.timeZone,

first_visit:
serverTimestamp(),

last_visit:
serverTimestamp(),

last_visit_ms: now,

total_sessions:1

});

console.log(
"New Visitor Created"
);

}else{

const data =
visitorSnap.data();

const gap =
now -
(data.last_visit_ms || 0);

const THIRTY_MIN =
30 * 60 * 1000;

if(gap > THIRTY_MIN){

await updateDoc(visitorRef,{

total_sessions:
increment(1),

last_visit:
serverTimestamp(),

last_visit_ms: now

});

console.log(
"New Session Added"
);

}else{

await updateDoc(visitorRef,{

last_visit:
serverTimestamp(),

last_visit_ms: now

});

console.log(
"Same Session"
);

}

}

}

trackVisitor();

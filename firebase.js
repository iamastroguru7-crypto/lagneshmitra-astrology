import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

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

export { db };

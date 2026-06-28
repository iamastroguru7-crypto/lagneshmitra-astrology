import { db, storage } from "./firebase.js";

import {
doc,
setDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

/*==================================================
ATCCCO v2

PART-1

INITIALIZATION
==================================================*/

console.log("ATCCCO v2 Loaded Successfully");

/*==================================================
DOM ELEMENTS
==================================================*/

const form=document.getElementById("postForm");

const title=document.getElementById("title");

const slug=document.getElementById("slug");

const postId=document.getElementById("postId");

const category=document.getElementById("category");

const featuredImage=document.getElementById("featuredImage");

const imagePreview=document.getElementById("imagePreview");

const imageName=document.getElementById("imageName");

const keywords=document.getElementById("keywords");

const metaDescription=document.getElementById("metaDescription");

const shortDescription=document.getElementById("shortDescription");

const content=document.getElementById("content");

const featured=document.getElementById("featured");

const allowComments=document.getElementById("allowComments");

const googleIndex=document.getElementById("googleIndex");

const previewBtn=document.getElementById("previewBtn");

const publishBtn=document.getElementById("publishBtn");

/*==================================================
STARTUP
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

console.log("ATCCCO Ready");

});


/*==================================================
PART-2

AUTO SLUG GENERATOR
==================================================*/

title.addEventListener("keyup",()=>{

const cleanTitle=title.value

.toLowerCase()

.replace(/[^a-z0-9\s]/g,"")

.trim()

.replace(/\s+/g,"-");

slug.value=cleanTitle;

});

/*==================================================
AUTO META DESCRIPTION
==================================================*/

shortDescription.addEventListener("keyup",()=>{

if(metaDescription.value===""){

metaDescription.value=

shortDescription.value.substring(0,160);

}

});

/*==================================================
PART-3

POST ID
==================================================*/

function generateTemporaryPostId(){

const now = new Date();

return "LMP" +

now.getFullYear() +

String(now.getMonth()+1).padStart(2,"0") +

String(now.getDate()).padStart(2,"0") +

"-" +

String(now.getHours()).padStart(2,"0") +

String(now.getMinutes()).padStart(2,"0") +

String(now.getSeconds()).padStart(2,"0");

}

document.addEventListener("DOMContentLoaded",()=>{

if(postId.value.trim()===""){

postId.value=generateTemporaryPostId();

}

});

/*==================================================
PART-4

FEATURED IMAGE PREVIEW
==================================================*/

featuredImage.addEventListener("change",()=>{

const file = featuredImage.files[0];

if(!file){

imagePreview.style.display="none";

imageName.innerHTML="No Image Selected";

return;

}

imageName.innerHTML=file.name;

const reader = new FileReader();

reader.onload=function(e){

imagePreview.src=e.target.result;

imagePreview.style.display="block";

}

reader.readAsDataURL(file);

});

/*==================================================
REMOVE PREVIEW IF IMAGE CLEARED
==================================================*/

featuredImage.addEventListener("click",()=>{

if(featuredImage.value===""){

imagePreview.style.display="none";

imageName.innerHTML="No Image Selected";

}

});

/*==================================================
PART-5

PREVIEW ENGINE
==================================================*/

previewBtn.addEventListener("click",()=>{

const previewWindow=window.open("","Preview","width=1100,height=800");

const image=imagePreview.src || "";

previewWindow.document.write(`

<!DOCTYPE html>

<html>

<head>

<title>Article Preview</title>

<style>

body{

font-family:Arial,Helvetica,sans-serif;

background:#f5f5f5;

margin:0;

padding:40px;

line-height:1.8;

}

.container{

max-width:950px;

margin:auto;

background:#ffffff;

padding:40px;

border-radius:20px;

box-shadow:0 8px 30px rgba(0,0,0,.12);

}

.hero{

width:100%;

max-height:450px;

object-fit:cover;

border-radius:16px;

margin-bottom:30px;

}

.category{

display:inline-block;

padding:6px 16px;

background:#FFD700;

color:#111;

font-weight:bold;

border-radius:30px;

margin-bottom:20px;

}

h1{

font-size:40px;

margin-bottom:10px;

}

.meta{

color:#777;

margin-bottom:30px;

}

.summary{

font-size:18px;

margin-bottom:30px;

padding:20px;

background:#fafafa;

border-left:5px solid #FFD700;

border-radius:8px;

}

.article{

font-size:18px;

}

</style>

</head>

<body>

<div class="container">

${image ? `<img class="hero" src="${image}">` : ""}

<div class="category">

${category.value}

</div>

<h1>

${title.value}

</h1>

<div class="meta">

${postId.value}

</div>

<div class="summary">

${shortDescription.value}

</div>

<div class="article">

${content.value.replace(/\n/g,"<br>")}

</div>

</div>

</body>

</html>

`);

});

/*==================================================
PART-6

FIREBASE STORAGE UPLOAD
==================================================*/

async function uploadFeaturedImage(){

const file = featuredImage.files[0];

if(!file){

return "";

}

try{

const fileName =

postId.value +

"-" +

Date.now() +

"-" +

file.name;

const storageRef =

ref(

storage,

"knowledgehub/" + fileName

);

await uploadBytes(

storageRef,

file

);

const downloadURL =

await getDownloadURL(storageRef);

return downloadURL;

}

catch(error){

console.error(error);

alert("Image Upload Failed!");

return "";

}

}

/*==================================================
PART-7

PUBLISH TO FIRESTORE
==================================================*/

form.addEventListener("submit", async (e)=>{

e.preventDefault();

if(title.value.trim()===""){

alert("Please Enter Post Title");

return;

}

if(postId.value.trim()===""){

alert("Please Enter Post ID");

return;

}

publishBtn.disabled=true;

publishBtn.innerHTML="Uploading...";

try{

const imageURL=await uploadFeaturedImage();

await setDoc(

doc(db,"posts",postId.value),

{

postId:postId.value,

title:title.value,

slug:slug.value,

category:category.value,

featuredImage:imageURL,

keywords:keywords.value,

metaDescription:metaDescription.value,

shortDescription:shortDescription.value,

content:content.value,

featured:featured.checked,

allowComments:allowComments.checked,

googleIndex:googleIndex.checked,

status:"Published",

views:0,

likes:0,

shares:0,

commentsCount:0,

createdAt:serverTimestamp(),

updatedAt:serverTimestamp()

}

);

alert("🚀 Article Published Successfully!");

form.reset();

imagePreview.src="";

imagePreview.style.display="none";

imageName.innerHTML="No Image Selected";

}

catch(error){

console.error(error);

alert("❌ Publish Failed");

}

finally{

publishBtn.disabled=false;

publishBtn.innerHTML="🚀 Publish";

}

});

/*==================================================
PART-8

FINAL INITIALIZATION
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

console.log("================================");

console.log("ATCCCO v2 Initialized");

console.log("LagneshMitra Publishing Engine Ready");

console.log("================================");

/* Auto Focus */

title.focus();

/* Image Preview Reset */

imagePreview.style.display="none";

imageName.innerHTML="No Image Selected";

/* Default Values */

if(slug.value===""){

slug.placeholder="Automatically Generated";

}

if(postId.value===""){

postId.placeholder="LMP000001";

}

});

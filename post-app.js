/* ===========================================
   LagneshMitra Knowledge Hub
   post-app.js
   Version : 2.0
=========================================== */

/* ===========================================
   POSTS DATABASE (Temporary)
   Future : Firestore
=========================================== */

const posts = [

{
    id: "LMP000001",

    title: "Why a Horoscope Cannot Be Judged Through Just One House or One Planet",

    date: "26 June 2026",

    views: "1,245",

    likes: "182",

    read: "6 min",

    category: "Research",

    image: "images/LMP000001.jpg",

    description:
    "Learn why a horoscope should always be judged holistically instead of relying upon only one house or one planet.",

    url: "post.html?pid=LMP000001"
},

{
    id: "LMP000002",

    title: "When Shani Blesses Malavya Yoga",

    date: "24 June 2026",

    views: "986",

    likes: "143",

    read: "5 min",

    category: "Yoga",

    image: "images/LMP000002.png",

    description:
    "Understand how Saturn can actually strengthen Malavya Yoga under certain planetary conditions.",

    url: "post.html?pid=LMP000002"
},

{
    id: "LMP000003",

    title: "Understanding Mahalakshmi Yoga",

    date: "20 June 2026",

    views: "2,110",

    likes: "298",

    read: "7 min",

    category: "Wealth",

    image: "images/LMP000003.jpg",

    description:
    "Explore one of the strongest wealth combinations in Vedic Astrology with practical understanding.",

    url: "post.html?pid=LMP000003"
}

];


/* ===========================================
   HTML ELEMENTS
=========================================== */

const container = document.getElementById("postsContainer");

const searchBox = document.getElementById("searchBox");

const previewBox = document.getElementById("previewBox");

const previewImage = document.getElementById("previewImage");

const previewTitle = document.getElementById("previewTitle");

const previewDate = document.getElementById("previewDate");

const previewViews = document.getElementById("previewViews");

const previewRead = document.getElementById("previewRead");

const previewDescription = document.getElementById("previewDescription");

const previewButton = document.getElementById("previewButton");


/* ===========================================
   LOAD POSTS
=========================================== */

function loadPosts(data){

container.innerHTML="";

data.forEach(post=>{

container.innerHTML += `

<div class="post-card">

<a href="${post.url}" style="text-decoration:none;color:white;">

<img
src="${post.image}"
onerror="this.onerror=null;this.src=this.src.replace('.jpg','.png').replace('.png','.jpg');">

<div class="card-body">

<h2>${post.title}</h2>

<div class="card-meta">

<span>📅 ${post.date}</span>

<span>👁 ${post.views}</span>

</div>

<div class="card-meta">

<span>❤️ ${post.likes}</span>

<span>📖 ${post.read}</span>

</div>

<p class="card-description">

${post.description}

</p>

</div>

</a>

</div>

`;

});


const cards=document.querySelectorAll(".post-card");

cards.forEach((card,index)=>{

card.addEventListener("mouseenter",()=>{

showPreview(data[index]);

});

card.addEventListener("mouseleave",()=>{

previewBox.style.display="none";

});

});

}


/* ===========================================
   PREVIEW BOX
=========================================== */

function showPreview(post){

previewBox.style.display="block";

previewImage.src = post.image;

previewImage.onerror=function(){

this.onerror=null;

this.src=this.src.replace(".jpg",".png").replace(".png",".jpg");

}

previewTitle.innerHTML=post.title;

previewDate.innerHTML="📅 "+post.date;

previewViews.innerHTML="👁 "+post.views;

previewRead.innerHTML="📖 "+post.read;

previewDescription.innerHTML=post.description;

previewButton.href=post.url;

}


/* ===========================================
   SEARCH
=========================================== */

searchBox.addEventListener("keyup",()=>{

const value=searchBox.value.toLowerCase();

const filtered=posts.filter(post=>

post.title.toLowerCase().includes(value)

||

post.description.toLowerCase().includes(value)

||

post.category.toLowerCase().includes(value)

);

loadPosts(filtered);

});


/* ===========================================
   INITIAL LOAD
=========================================== */

loadPosts(posts);

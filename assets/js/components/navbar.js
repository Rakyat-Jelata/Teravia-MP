/* ==========================================================
   TERAVIA
   Navbar Component
   assets/js/components/navbar.js
   Version : 3.0
========================================================== */

const TERAVIA_NAVBAR={

init(){

this.basePath=this.getBasePath();

this.render();

},

getBasePath(){

const path=window.location.pathname.toLowerCase();

return path.includes("/pages/")?"../":"";

},

render(){

const base=this.basePath;

const container=document.querySelector("[data-navbar]");

if(!container)return;

container.innerHTML=`

<nav class="navbar">

<div class="container navbar-container">

<a href="${base}index.html" class="navbar-brand">

<img
src="${base}assets/img/logo.png"
alt="TERAVIA"
class="navbar-logo">

</a>

<button
id="hamburger"
class="hamburger"
type="button"
aria-label="Toggle Navigation">

<span></span>
<span></span>
<span></span>

</button>

<ul class="nav-menu">

<li class="nav-item">

<a
href="${base}index.html"
class="nav-link">

Beranda

</a>

</li>

<li class="nav-item">

<a
href="${base}pages/home.html"
class="nav-link">

Cari Properti

</a>

</li>

<li class="nav-item">

<a
href="${base}pages/pasang-iklan.html"
class="nav-link">

Pasang Iklan

</a>

</li>

<li class="nav-item">

<a
href="${base}pages/blog.html"
class="nav-link">

Blog

</a>

</li>

<li class="nav-item">

<a
href="${base}pages/tentang.html"
class="nav-link">

Tentang

</a>

</li>

<li class="nav-item">

<a
href="${base}login.html"
class="btn btn-primary">

Masuk

</a>

</li>

</ul>

</div>

</nav>

`;

},</ul>

</div>

</nav>

`;

}
bindMobileMenu(){

const hamburger=
document.getElementById("hamburger");

const navMenu=
document.querySelector(".nav-menu");

if(!hamburger||!navMenu)return;

hamburger.addEventListener("click",()=>{

hamburger.classList.toggle("active");

navMenu.classList.toggle("active");

document.body.classList.toggle("menu-open");

});

navMenu.querySelectorAll("a").forEach(link=>{

link.addEventListener("click",()=>{

hamburger.classList.remove("active");

navMenu.classList.remove("active");

document.body.classList.remove("menu-open");

});

});

window.addEventListener("resize",()=>{

if(window.innerWidth>=992){

hamburger.classList.remove("active");

navMenu.classList.remove("active");

document.body.classList.remove("menu-open");

}

});

},

setActiveMenu(){

const current=window.location.pathname
.toLowerCase()
.split("/")
.pop();

const links=document.querySelectorAll(".nav-link");

links.forEach(link=>{

const href=link.getAttribute("href");

if(!href)return;

const page=href.split("/").pop().toLowerCase();

if(
(current===""&&page==="index.html")||
current===page
){

link.classList.add("active");

}

});

}
};

/* ==========================================================
   AUTO INIT
========================================================== */

document.addEventListener(
"DOMContentLoaded",
()=>{

TERAVIA_NAVBAR.init();

}
);

/* ==========================================================
   EXPORT
========================================================== */

export{
TERAVIA_NAVBAR
};

window.TERAVIA_NAVBAR=
TERAVIA_NAVBAR;

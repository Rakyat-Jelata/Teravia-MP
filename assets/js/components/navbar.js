/* ==========================================================
   TERAVIA
   Navbar Component
   assets/js/components/navbar.js
   Version : 2.0
========================================================== */

const TERAVIA_NAVBAR={

init(){

this.basePath=this.getBasePath();
this.render();
this.bindMobileMenu();
this.setActiveMenu();

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

<a href="${base}index.html" class="navbar-logo">

<img src="${base}assets/img/logo.png" alt="TERAVIA">

</a>

<button
class="hamburger"
id="hamburger"
type="button"
aria-label="Toggle Menu">

<span></span>
<span></span>
<span></span>

</button>

<ul class="nav-menu">

<li>
<a href="${base}index.html" data-page="landing">
Beranda
</a>
</li>

<li>
<a href="${base}pages/home.html" data-page="property">
Cari Properti
</a>
</li>

<li>
<a href="${base}pages/pasang-iklan.html" data-page="listing">
Pasang Iklan
</a>
</li>

<li>
<a href="${base}pages/blog.html" data-page="blog">
Blog
</a>
</li>

<li>
<a href="${base}pages/tentang.html" data-page="about">
Tentang
</a>
</li>

<li class="nav-login">

<a href="${base}login.html"
class="btn btn-primary">

Masuk

</a>

</li>

</ul>

</div>

</nav>

`;

},

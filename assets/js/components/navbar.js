/* ==========================================
   TERAVIA Navbar
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    const hamburger=document.getElementById("hamburger");
    const navMenu=document.querySelector(".nav-menu");
    const body=document.body;

    if(!hamburger||!navMenu) return;

    hamburger.addEventListener("click",()=>{

        navMenu.classList.toggle("active");
        body.classList.toggle("menu-open");
        hamburger.classList.toggle("active");

    });

    document.querySelectorAll(".nav-menu a").forEach(link=>{

        link.addEventListener("click",()=>{

            navMenu.classList.remove("active");
            body.classList.remove("menu-open");
            hamburger.classList.remove("active");

        });

    });

    window.addEventListener("resize",()=>{

        if(window.innerWidth>=992){

            navMenu.classList.remove("active");
            body.classList.remove("menu-open");
            hamburger.classList.remove("active");

        }

    });

});

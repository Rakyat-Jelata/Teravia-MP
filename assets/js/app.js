/* ==========================================================
   TERAVIA
   Application Core
   app.js
   Version : 2.0
========================================================== */


/* ==========================================================
   CORE IMPORT
========================================================== */

import "./config.js";
import "./supabase.js";


/* ==========================================================
   COMPONENT IMPORT
========================================================== */

import "./components/navbar.js";
import "./components/footer.js";
import "./components/toast.js";
import "./components/modal.js";
import "./components/dropdown.js";
import "./components/slider.js";



/* ==========================================================
   SERVICE IMPORT
========================================================== */

import "./services/auth-service.js";
import "./services/user-service.js";
import "./services/property-service.js";
import "./services/storage-service.js";
import "./services/activity-service.js";



/* ==========================================================
   APP START
========================================================== */

document.addEventListener(
"DOMContentLoaded",
()=>{
    initApp();
});



function initApp(){

    console.log(
        "🚀 TERAVIA Application Initialized"
    );


    initPage();

    initGlobalEvents();

}




/* ==========================================================
   PAGE ROUTER
========================================================== */

function initPage(){

    const page =
    document.body.dataset.page;


    if(!page){

        console.log(
            "Page attribute not found"
        );

        return;

    }


    switch(page){


        case "landing":

            initLanding();

        break;



        case "home":

            initHome();

        break;



        case "detail-property":

            initDetailProperty();

        break;



        case "dashboard":

            initDashboard();

        break;



        case "profile":

            initProfile();

        break;



        case "admin":

            initAdmin();

        break;



        default:

            console.log(
                "Unknown page:",
                page
            );

    }

}




/* ==========================================================
   LANDING PAGE
========================================================== */

function initLanding(){

    console.log(
        "🏠 Landing Page Ready"
    );

}



/* ==========================================================
   HOME PAGE
========================================================== */

function initHome(){

    console.log(
        "🏘 Property Marketplace Ready"
    );

}



/* ==========================================================
   DETAIL PROPERTY
========================================================== */

function initDetailProperty(){

    console.log(
        "🏡 Property Detail Ready"
    );

}



/* ==========================================================
   DASHBOARD
========================================================== */

function initDashboard(){

    console.log(
        "📊 Dashboard Ready"
    );

}



/* ==========================================================
   PROFILE
========================================================== */

function initProfile(){

    console.log(
        "👤 Profile Ready"
    );

}



/* ==========================================================
   ADMIN
========================================================== */

function initAdmin(){

    console.log(
        "🛡 Admin Panel Ready"
    );

}



/* ==========================================================
   GLOBAL EVENTS
========================================================== */

function initGlobalEvents(){


    initBackToTop();


    console.log(
        "✓ Global Events Loaded"
    );


}



/* ==========================================================
   BACK TO TOP
========================================================== */

function initBackToTop(){


    const button =
    document.querySelector(
        "[data-action='back-to-top']"
    );


    if(!button) return;



    window.addEventListener(
        "scroll",
        ()=>{


            if(window.scrollY > 300){

                button.classList.add(
                    "show"
                );

            }else{

                button.classList.remove(
                    "show"
                );

            }


        }
    );



    button.addEventListener(
        "click",
        ()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );


}



/* ==========================================================
   ERROR HANDLER
========================================================== */

window.addEventListener(
"error",
(event)=>{


    console.error(
        "TERAVIA Error:",
        event.error
    );


});

/* =====================================================
   TERAVIA - Navbar Component
   File: assets/js/components/navbar.js
===================================================== */


const TERAVIA_NAVBAR = {


    /**
     * Initialize Navbar
     */

    init(){

        this.bindMobileMenu();

    },



    /**
     * Mobile Menu Handler
     */

    bindMobileMenu(){


        const hamburger =
            document.getElementById(
                "hamburger"
            );


        const navMenu =
            document.querySelector(
                ".nav-menu"
            );


        const body =
            document.body;



        if(
            !hamburger ||
            !navMenu
        ){

            return;

        }



        hamburger.addEventListener(
            "click",
            ()=>{


                navMenu.classList.toggle(
                    "active"
                );


                hamburger.classList.toggle(
                    "active"
                );


                body.classList.toggle(
                    "menu-open"
                );


            }
        );



        /**
         * Close menu when link clicked
         */

        navMenu
        .querySelectorAll("a")
        .forEach(link=>{


            link.addEventListener(
                "click",
                ()=>{


                    navMenu.classList.remove(
                        "active"
                    );


                    hamburger.classList.remove(
                        "active"
                    );


                    body.classList.remove(
                        "menu-open"
                    );


                }
            );


        });



        /**
         * Reset on desktop
         */

        window.addEventListener(
            "resize",
            ()=>{


                if(
                    window.innerWidth >= 992
                ){

                    navMenu.classList.remove(
                        "active"
                    );


                    hamburger.classList.remove(
                        "active"
                    );


                    body.classList.remove(
                        "menu-open"
                    );

                }


            }
        );


    }


};




/**
 * Export Module
 */

export {
    TERAVIA_NAVBAR
};



/**
 * Global Access
 */

window.TERAVIA_NAVBAR =
    TERAVIA_NAVBAR;

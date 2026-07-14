/* =====================================================
   TERAVIA - Application Core
   File: assets/js/app.js
===================================================== */


/**
 * TERAVIA APP INITIALIZER
 */

const TERAVIA_APP = {


    /**
     * Initialize Application
     */

    init(){

        console.log(
            "🚀 TERAVIA Application Started"
        );


        this.detectPage();


        this.initGlobalEvents();


        this.checkAuthSession();


    },


    /**
     * Detect Current Page
     */

    detectPage(){

        const page =
            document.body.dataset.page;


        if(!page) return;


        console.log(
            "Current Page:",
            page
        );


        window.TERAVIA_PAGE = page;

    },


    /**
     * Global Event Listener
     */

    initGlobalEvents(){


        document.addEventListener(
            "click",
            (event)=>{


                const target =
                    event.target.closest(
                        "[data-action]"
                    );


                if(!target) return;


                const action =
                    target.dataset.action;


                this.handleAction(action,target);


            }
        );


    },


    /**
     * Global Action Handler
     */

    handleAction(action,element){


        switch(action){


            case "logout":

                this.logout();

            break;


            case "toggle-menu":

                document
                .body
                .classList
                .toggle(
                    "menu-open"
                );

            break;


            default:

                console.log(
                    "Unknown action:",
                    action
                );

        }

    },


    /**
     * Check User Session
     */

    async checkAuthSession(){


        if(
            typeof supabaseClient ===
            "undefined"
        ){

            console.warn(
                "Supabase not initialized"
            );

            return;

        }



        const {
            data,
            error
        } =
        await supabaseClient
        .auth
        .getSession();



        if(error){

            console.error(
                error
            );

            return;

        }



        window.TERAVIA_USER =
            data.session?.user || null;



        if(
            TERAVIA_USER
        ){

            console.log(
                "User Login:",
                TERAVIA_USER.email
            );

        }
        else{

            console.log(
                "Guest Visitor"
            );

        }


    },


    /**
     * Logout User
     */

    async logout(){


        if(
            typeof supabaseClient ===
            "undefined"
        ){

            return;

        }


        const {
            error
        } =
        await supabaseClient
        .auth
        .signOut();



        if(error){

            console.error(error);

            return;

        }


        window.location.href =
            "/login.html";


    },


    /**
     * Redirect Helper
     */

    redirect(url){

        window.location.href = url;

    },


    /**
     * Simple Notification
     */

    notify(message,type="info"){


        console.log(
            `[${type}]`,
            message
        );


    }


};



/**
 * Start Application
 */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        TERAVIA_APP.init();

    }
);


/**
 * Export Global
 */

window.TERAVIA_APP =
    TERAVIA_APP;

/* =====================================================
   TERAVIA - Toast Notification Component
   File: assets/js/components/toast.js
===================================================== */


const TERAVIA_TOAST = {


    /**
     * Initialize
     */

    init(){


        this.createContainer();


    },


    /**
     * Create Toast Container
     */

    createContainer(){


        if(
            document.querySelector(
                "#teravia-toast-container"
            )
        ){

            return;

        }



        const container =
            document.createElement(
                "div"
            );


        container.id =
            "teravia-toast-container";


        container.className =
            "toast-container";



        document.body.appendChild(
            container
        );


    },


    /**
     * Show Toast
     */

    show(
        message,
        type="success",
        duration=null
    ){


        const container =
            document.querySelector(
                "#teravia-toast-container"
            );



        if(!container)
            return;



        const toast =
            document.createElement(
                "div"
            );



        toast.className =
            `toast toast-${type}`;



        toast.innerHTML = `


<div class="toast-icon">

    ${this.icon(type)}

</div>


<div class="toast-message">

    ${message}

</div>


<button class="toast-close">

    ×

</button>


`;



        container.appendChild(
    toast
);


toast.classList.add(
    "active"
);


        // Close button

        toast
        .querySelector(
            ".toast-close"
        )
        .onclick =
        ()=>{


            this.remove(toast);


        };



        // Auto remove

        setTimeout(
            ()=>{


                this.remove(toast);


            },

            duration ||
            TERAVIA_CONFIG.TOAST_DURATION

        );


    },


    /**
     * Remove Toast
     */
remove(toast){


    if(!toast)
        return;



    toast.classList.remove(
        "active"
    );


    setTimeout(
        ()=>{

            toast.remove();

        },

        300

    );


},


    /**
     * Icon
     */

    icon(type){


        const icons = {


            success:
            "✓",


            error:
            "×",


            warning:
            "!",


            info:
            "i"


        };



        return icons[type]
        ||
        icons.info;


    },



    /**
     * Shortcut Methods
     */


    success(message){

        this.show(
            message,
            "success"
        );

    },


    error(message){

        this.show(
            message,
            "error"
        );

    },


    warning(message){

        this.show(
            message,
            "warning"
        );

    },


    info(message){

        this.show(
            message,
            "info"
        );

    }


};





/**
 * Export Global
 */

export {
    TERAVIA_TOAST
};


window.TERAVIA_TOAST =
    TERAVIA_TOAST;

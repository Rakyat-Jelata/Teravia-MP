/* =====================================================
   TERAVIA - Modal Component
   File: assets/js/components/modal.js
===================================================== */


const TERAVIA_MODAL = {


    /**
     * Initialize
     */

    init(){


        this.createContainer();


        this.bindEvents();


    },


    /**
     * Create Modal Wrapper
     */

    createContainer(){


        if(
            document.querySelector(
                "#teravia-modal"
            )
        ){

            return;

        }



        const modal =
        document.createElement(
            "div"
        );


        modal.id =
            "teravia-modal";


        modal.className =
            "modal-wrapper";



        modal.innerHTML = `


<div class="modal-overlay"
     data-modal-close>
</div>


<div class="modal-box">


    <button class="modal-close"
            data-modal-close>

        ×

    </button>


    <div data-modal-content>

    </div>


</div>


`;



        document.body.appendChild(
            modal
        );


    },


    /**
     * Open Modal
     */

    open(content){


        const modal =
            document.querySelector(
                "#teravia-modal"
            );


        const box =
            document.querySelector(
                "[data-modal-content]"
            );


        if(
            !modal ||
            !box
        ){

            return;

        }



        box.innerHTML =
            content;



        modal.classList.add(
            "show"
        );



        document.body.classList.add(
            "modal-open"
        );


    },


    /**
     * Close Modal
     */

    close(){


        const modal =
            document.querySelector(
                "#teravia-modal"
            );


        if(!modal)
            return;



        modal.classList.remove(
            "show"
        );


        document.body.classList.remove(
            "modal-open"
        );


    },


    /**
     * Confirmation Modal
     */

    confirm(
        title,
        message,
        callback
    ){


        this.open(`


<div class="modal-header">

    <h3>
        ${title}
    </h3>

</div>


<div class="modal-body">

    <p>
        ${message}
    </p>

</div>


<div class="modal-footer">


<button class="btn btn-outline"
        data-modal-close>

    Batal

</button>



<button class="btn btn-primary"
        id="modal-confirm">

    Ya, Lanjutkan

</button>


</div>


`);



        const button =
            document.querySelector(
                "#modal-confirm"
            );



        if(button){


            button.onclick =
            ()=>{


                callback();


                this.close();


            };


        }



    },


    /**
     * Event Handler
     */

    bindEvents(){


        document.addEventListener(
            "click",
            (event)=>{


                const close =
                event.target.closest(
                    "[data-modal-close]"
                );


                if(close){

                    this.close();

                }


            }
        );


    }


};




/**
 * Export Global
 */

window.TERAVIA_MODAL =
    TERAVIA_MODAL;



/**
 * Auto Init
 */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        TERAVIA_MODAL.init();

    }
);

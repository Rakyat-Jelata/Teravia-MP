/* =====================================================
   TERAVIA - Dropdown Component
   File: assets/js/components/dropdown.js
===================================================== */


const TERAVIA_DROPDOWN = {


    /**
     * Initialize
     */

    init(){

        this.bindEvents();

        this.initSelectDropdown();

    },


    /**
     * Global Dropdown Click
     */

    bindEvents(){


        document.addEventListener(
            "click",
            (event)=>{


                const trigger =
                    event.target.closest(
                        "[data-dropdown-toggle]"
                    );



                if(trigger){


                    const target =
                        trigger.dataset.dropdownToggle;


                    this.toggle(target);


                    return;

                }



                // Click Outside

                if(
                    !event.target.closest(
                        ".dropdown"
                    )
                ){

                    this.closeAll();

                }


            }
        );


    },


    /**
     * Toggle Dropdown
     */

    toggle(id){


        const dropdown =
            document.getElementById(
                id
            );


        if(!dropdown)
            return;



        const active =
            dropdown.classList.contains(
                "active"
            );



        this.closeAll();



        if(!active){

            dropdown.classList.add(
                "active"
            );

        }


    },


    /**
     * Close All Dropdown
     */

    closeAll(){


        document
        .querySelectorAll(
            ".dropdown-menu.active"
        )
        .forEach(menu=>{


            menu.classList.remove(
                "active"
            );


        });


    },


    /**
     * Custom Select Dropdown
     */

    initSelectDropdown(){


        document
        .querySelectorAll(
            "[data-custom-select]"
        )
        .forEach(select=>{


            const button =
                select.querySelector(
                    "[data-select-button]"
                );


            const options =
                select.querySelector(
                    "[data-select-options]"
                );



            if(
                !button ||
                !options
            )
            return;



            button.addEventListener(
                "click",
                ()=>{


                    options.classList.toggle(
                        "show"
                    );


                }
            );



            options
            .querySelectorAll(
                "[data-option]"
            )
            .forEach(option=>{


                option.addEventListener(
                    "click",
                    ()=>{


                        button.textContent =
                            option.textContent;



                        select.dataset.value =
                            option.dataset.option;



                        options.classList.remove(
                            "show"
                        );


                        select.dispatchEvent(
                            new CustomEvent(
                                "change",
                                {
                                    detail:{
                                        value:
                                        option.dataset.option
                                    }
                                }
                            )
                        );


                    }
                );


            });


        });


    },


    /**
     * Get Selected Value
     */

    getValue(element){


        return element.dataset.value || null;


    }


};





/**
 * Export Global
 */

export {
    TERAVIA_DROPDOWN
};


window.TERAVIA_DROPDOWN =
    TERAVIA_DROPDOWN;



/**
 * Auto Init
 */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        TERAVIA_DROPDOWN.init();

    }
);

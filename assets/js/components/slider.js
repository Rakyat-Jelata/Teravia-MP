/* =====================================================
   TERAVIA - Slider Component
   File: assets/js/components/slider.js
===================================================== */


const TERAVIA_SLIDER = {


    /**
     * Initialize All Slider
     */

    init(){


        document
        .querySelectorAll(
            "[data-slider]"
        )
        .forEach(slider=>{


            this.create(
                slider
            );


        });


    },


    /**
     * Create Slider
     */

    create(slider){


        const slides =
            slider.querySelectorAll(
                ".slide"
            );


        if(
            slides.length <= 1
        )
        return;



        let current = 0;



        const next =
            slider.querySelector(
                "[data-slider-next]"
            );


        const prev =
            slider.querySelector(
                "[data-slider-prev]"
            );



        const dots =
            slider.querySelectorAll(
                "[data-slider-dot]"
            );



        const showSlide =
        (index)=>{


            slides.forEach(
                (slide,i)=>{


                    slide.classList.remove(
                        "active"
                    );


                    if(i===index){

                        slide.classList.add(
                            "active"
                        );

                    }


                }
            );



            dots.forEach(
                (dot,i)=>{


                    dot.classList.remove(
                        "active"
                    );


                    if(i===index){

                        dot.classList.add(
                            "active"
                        );

                    }


                }
            );


        };



        const nextSlide =
        ()=>{


            current++;


            if(
                current >= slides.length
            ){

                current = 0;

            }


            showSlide(
                current
            );


        };



        const prevSlide =
        ()=>{


            current--;


            if(
                current < 0
            ){

                current =
                    slides.length - 1;

            }


            showSlide(
                current
            );


        };



        if(next){

            next.onclick =
                nextSlide;

        }



        if(prev){

            prev.onclick =
                prevSlide;

        }



        dots.forEach(
            (dot,index)=>{


                dot.onclick =
                ()=>{


                    current =
                        index;


                    showSlide(
                        current
                    );


                };


            }
        );



        // Auto Play

        const autoplay =
            slider.dataset.autoplay;



        if(
            autoplay === "true"
        ){

            setInterval(
                nextSlide,
                5000
            );

        }



        showSlide(
            current
        );


    }


};





/**
 * Export Global
 */

export {
    TERAVIA_SLIDER
};


window.TERAVIA_SLIDER =
    TERAVIA_SLIDER;


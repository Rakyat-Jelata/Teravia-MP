/* =====================================================
   TERAVIA - Footer Component
   File: assets/js/components/footer.js
===================================================== */


const TERAVIA_FOOTER = {


    /**
     * Initialize Footer
     */

    init(){


        const container =
            document.querySelector(
                "[data-footer]"
            );


        if(!container) return;



        container.innerHTML =
            this.template();



        this.updateYear();


    },


    /**
     * Footer Template
     */

    template(){


        return `

<footer class="footer">


    <div class="footer-container">


        <div class="footer-grid">


            <!-- Brand -->

            <div class="footer-column">


                <img src="assets/images/logo.png"
                     class="footer-logo"
                     alt="TERAVIA">


                <p>
                    JUAL - BELI - SEWA
                    PROPERTI SELURUH INDONESIA.
                    Platform properti terpercaya
                    untuk owner, broker,
                    dan pencari properti.
                </p>


            </div>



            <!-- Navigation -->

            <div class="footer-column">


                <h3>
                    Navigasi
                </h3>


                <a href="index.html">
                    Home
                </a>


                <a href="property.html">
                    Properti
                </a>


                <a href="blog.html">
                    Blog
                </a>


                <a href="tentang.html">
                    Tentang Kami
                </a>


            </div>



            <!-- Services -->

            <div class="footer-column">


                <h3>
                    Layanan
                </h3>


                <a href="membership.html">
                    Membership Premium
                </a>


                <a href="pasang-iklan.html">
                    Pasang Properti
                </a>


                <a href="dashboard.html">
                    Dashboard Member
                </a>


                <a href="login.html">
                    Login
                </a>


            </div>



            <!-- Contact -->

            <div class="footer-column">


                <h3>
                    Hubungi Kami
                </h3>


                <p>
                    Email:
                    support@teravia.id
                </p>


                <p>
                    WhatsApp:
                    +62 xxx xxxx xxxx
                </p>



                <div class="footer-social">


                    <a href="#">
                        Facebook
                    </a>


                    <a href="#">
                        Instagram
                    </a>


                    <a href="#">
                        LinkedIn
                    </a>


                </div>


            </div>



        </div>



        <div class="footer-bottom">


            <p>

                ©
                <span data-year></span>
                TERAVIA.
                All Rights Reserved.

            </p>


        </div>



    </div>


</footer>

        `;


    },


    /**
     * Dynamic Year
     */

    updateYear(){


        const year =
            document.querySelector(
                "[data-year]"
            );


        if(year){

            year.textContent =
                new Date()
                .getFullYear();

        }


    }


};





/**
 * Export Global
 */

window.TERAVIA_FOOTER =
    TERAVIA_FOOTER;



/**
 * Auto Init
 */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        TERAVIA_FOOTER.init();

    }
);

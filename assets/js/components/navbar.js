/* =====================================================
   TERAVIA - Navbar Component
   File: assets/js/components/navbar.js
===================================================== */


const TERAVIA_NAVBAR = {


    /**
     * Initialize Navbar
     */

    async init(){


        const container =
            document.querySelector(
                "[data-navbar]"
            );


        if(!container) return;



        container.innerHTML =
            this.template();



        await this.updateUserMenu();


        this.initMobileMenu();


        this.setActiveMenu();


    },


    /**
     * Navbar Template
     */

    template(){


        return `

<nav class="navbar">


    <div class="navbar-container">


        <a href="index.html"
           class="navbar-logo">

            <img src="assets/images/logo.png"
                 alt="TERAVIA">

        </a>



        <button class="navbar-toggle"
                data-action="toggle-menu">

            ☰

        </button>



        <div class="navbar-menu">


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
                Tentang
            </a>



            <div data-user-menu>


                <a href="login.html"
                   class="btn btn-primary">

                    Login

                </a>


                <a href="register.html"
                   class="btn btn-outline">

                    Daftar

                </a>


            </div>



        </div>


    </div>


</nav>

        `;


    },


    /**
     * Update Menu Based On User
     */

    async updateUserMenu(){


        const userMenu =
            document.querySelector(
                "[data-user-menu]"
            );


        if(!userMenu) return;



        const user =
            window.TERAVIA_USER;



        if(!user){


            return;


        }



        // User Login

        userMenu.innerHTML = `


<a href="dashboard.html">
    Dashboard
</a>


<a href="pasang-iklan.html"
   class="btn btn-primary">

    Pasang Iklan

</a>


<button data-action="logout"
        class="btn btn-outline">

    Logout

</button>


`;



    },


    /**
     * Mobile Menu
     */

    initMobileMenu(){


        const toggle =
            document.querySelector(
                "[data-action='toggle-menu']"
            );


        const menu =
            document.querySelector(
                ".navbar-menu"
            );


        if(!toggle || !menu)
            return;



        toggle.addEventListener(
            "click",
            ()=>{


                menu.classList.toggle(
                    "active"
                );


            }
        );


    },


    /**
     * Active Link
     */

    setActiveMenu(){


        const links =
            document.querySelectorAll(
                ".navbar-menu a"
            );


        const current =
            window.location.pathname;



        links.forEach(link=>{


            if(
                link.href.includes(current)
            ){

                link.classList.add(
                    "active"
                );

            }


        });


    }


};





/**
 * Export
 */

window.TERAVIA_NAVBAR =
    TERAVIA_NAVBAR;



/**
 * Auto Init
 */

document.addEventListener(
    "DOMContentLoaded",
    ()=>{

        TERAVIA_NAVBAR.init();

    }
);

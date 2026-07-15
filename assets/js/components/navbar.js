const TERAVIA_NAVBAR = {

    init(){

        this.render();
        this.bindMobileMenu();

    },


    render(){

        const container = document.querySelector("[data-navbar]");

        if(!container) return;

        container.innerHTML = `
        <nav class="navbar">
            <div class="navbar-container">

                <a href="../index.html" class="navbar-brand">
                    TERAVIA
                </a>

                <button id="hamburger" class="hamburger">
                    ☰
                </button>

                <ul class="nav-menu">
                    <li><a href="../index.html">Beranda</a></li>
                    <li><a href="home.html">Cari Properti</a></li>
                    <li><a href="pasang-iklan.html">Pasang Iklan</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="tentang.html">Tentang</a></li>
                    <li><a href="login.html" class="btn btn-primary">Masuk</a></li>
                </ul>

            </div>
        </nav>
        `;

    },


    bindMobileMenu(){

        const hamburger =
            document.getElementById("hamburger");

        const navMenu =
            document.querySelector(".nav-menu");

        const body =
            document.body;


        if(!hamburger || !navMenu) return;


        hamburger.addEventListener("click",()=>{

            navMenu.classList.toggle("active");
            hamburger.classList.toggle("active");
            body.classList.toggle("menu-open");

        });


        navMenu.querySelectorAll("a")
        .forEach(link=>{

            link.addEventListener("click",()=>{

                navMenu.classList.remove("active");
                hamburger.classList.remove("active");
                body.classList.remove("menu-open");

            });

        });

    }

};


document.addEventListener("DOMContentLoaded",()=>{

    TERAVIA_NAVBAR.init();

});


window.TERAVIA_NAVBAR = TERAVIA_NAVBAR;

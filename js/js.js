"use strict";

  // section Loading
window.addEventListener('load', function() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.transition = "top 0.7s ease";
        loading.style.top = "-100%";
        loading.addEventListener('transitionend', function() {
            loading.remove();
        });
    }
});

   // section Navbar
document.addEventListener('DOMContentLoaded', function() {

    const htmlBody = document.documentElement;
    const navBar = document.querySelector('.navbar');
    const scrollToTop = document.querySelector('.scrolltop');
    let countersCheck = false;

    function activeNavbar() {
        if (window.scrollY >50) {
            navBar.classList.add("active-nav");
        } else {
            navBar.classList.remove("active-nav");
        }
    }
    activeNavbar();
    window.addEventListener("scroll", activeNavbar);

    
    const menuToggle = document.querySelector(".navbar .menu-toggle");
    if (menuToggle) {
        menuToggle.addEventListener("click", function() {
            navBar.classList.toggle("menu-active");
        });
    }

    function smoothScroll(targetSelector, offset = 0, duration = 600) {
        const target = document.querySelector(targetSelector);
        if (target) {
            const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPos, behavior: "smooth" });
        }
    }

    document.querySelectorAll(".navbar .navbar-nav > li:not(.nav-brand) > a").forEach(a => {
        a.addEventListener("click", function(e) {
            if (this.getAttribute('href').startsWith("#")) {
                e.preventDefault();
                smoothScroll(this.getAttribute('href'), 62, 600);
            }
        });
    });

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navbar .navbar-nav > li > a");

    function updateActiveLink() {
        const scrollPos = window.scrollY + 80;
        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector(
                    ".navbar .navbar-nav > li > a[href='#" + section.id + "']"
                );
                if (activeLink) activeLink.classList.add("active");
            }
        });
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            navLinks.forEach(link => link.classList.remove("active"));
            const lastLink = navLinks[navLinks.length - 1];
            if (lastLink) lastLink.classList.add("active");
        }
    }
    updateActiveLink();
    window.addEventListener("scroll", updateActiveLink);

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });


  // section Home
    document.querySelectorAll(".home .main-btn, .actionSection .main-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
            if (this.getAttribute('href').startsWith("#")) {
                e.preventDefault();
                smoothScroll(this.getAttribute('href'), 62, 800);
            }
        });
    });

    document.querySelectorAll(".header .main-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
            if (this.getAttribute('href').startsWith("#")) {
                e.preventDefault();
                smoothScroll(this.getAttribute('href'), 0, 800);
            }
        });
    });

  // section Counters
    function startCounters() {
        const counters = document.querySelectorAll(".counters .number");
        if (!countersCheck && counters.length > 0) {
            const countersTop = document.querySelector(".counters").getBoundingClientRect().top + window.scrollY;
            if (window.scrollY >= countersTop - 400) {
                counters.forEach(c => {
                    let target = parseInt(c.dataset.to, 10);
                    let count = parseInt(c.dataset.from, 10);
                    const step = Math.ceil(target / 100);
                    const interval = setInterval(() => {
                        count += step;
                        if (count >= target) {
                            count = target;
                            clearInterval(interval);
                        }
                        c.innerText = count;
                    }, 20);
                });
                countersCheck = true;
            }
        }
    }
    startCounters();
    window.addEventListener("scroll", startCounters);


  // section Services
    const animatedItems = document.querySelectorAll(".seritem.animate ,.member.animate,.pricingplan.animate");
    function scrollAnimation() {
        const triggerPoint = window.innerHeight * 0.9;
        animatedItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < triggerPoint) {
                item.classList.add("show");
            }
        });
    }
    scrollAnimation();
    window.addEventListener("scroll", scrollAnimation);

  // section Portfolio
    const filterButtons = document.querySelectorAll('#control li');
    const items = document.querySelectorAll('#filtr-container .filtritem');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            items.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => { item.style.opacity = '1'; }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

 // section Testimonials
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        let isDragging = false;
        let startX;
        let scrollLeft;
        let autoScroll = true;

        carousel.style.touchAction = "pan-y";
        carousel.style.userSelect = "none";
        carousel.style.cursor = "grab";

        carousel.addEventListener('pointerdown', (e) => {
            isDragging = true;
            carousel.style.cursor = "grabbing";
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            autoScroll = false;
            carousel.setPointerCapture(e.pointerId);
        });

        carousel.addEventListener('pointerup', (e) => {
            isDragging = false;
            carousel.style.cursor = "grab";
            setTimeout(() => autoScroll = true, 2000);
            carousel.releasePointerCapture(e.pointerId);
        });

        carousel.addEventListener('pointercancel', () => {
            isDragging = false;
            carousel.style.cursor = "grab";
        });

        carousel.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        let scrollAmount = 0;
        const scrollStep = 320;
        const delay = 3000;

        setInterval(() => {
            if (!autoScroll) return;
            scrollAmount += scrollStep;
            if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                scrollAmount = 0;
            }
            carousel.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        }, delay);
    }
  //section Scroll Top
    function scrollUpFunc() {
        if (window.scrollY >= 1100) {
            scrollToTop.classList.add("active");
        } else {
            scrollToTop.classList.remove("active");
        }
    }
    scrollUpFunc();
    window.addEventListener("scroll", scrollUpFunc);

    if (scrollToTop) {
        scrollToTop.addEventListener("click", function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

});

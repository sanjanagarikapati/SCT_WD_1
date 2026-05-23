// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
    lucide.createIcons();
    
    // -------------------------------------------------------------
    // 1. DYNAMIC NAVIGATION MENUS ON SCROLL (Fixed header design)
    // -------------------------------------------------------------
    const navbar = document.getElementById("navbar");
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };
    
    // Register scroll listener and run initially
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // -------------------------------------------------------------
    // 2. MOBILE HAMBURGER MENU TOGGLE
    // -------------------------------------------------------------
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    const toggleMenu = () => {
        hamburgerBtn.classList.toggle("open");
        navMenu.classList.toggle("open");
        
        // Prevent body scrolling when mobile menu is active
        if (navMenu.classList.contains("open")) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    const closeMenu = () => {
        hamburgerBtn.classList.remove("open");
        navMenu.classList.remove("open");
        document.body.style.overflow = "";
    };

    hamburgerBtn.addEventListener("click", toggleMenu);

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (navMenu.classList.contains("open") && 
            !navMenu.contains(e.target) && 
            !hamburgerBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // -------------------------------------------------------------
    // 3. SCROLLSPY (Highlight nav menu links depending on scroll)
    // -------------------------------------------------------------
    const sections = document.querySelectorAll("section");
    
    const scrollSpy = () => {
        let currentSectionId = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset header height
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-section") === currentSectionId) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", scrollSpy);
    scrollSpy();

    // -------------------------------------------------------------
    // 4. SERVICE CARDS HOVER MOUSE TRACKING (Glow borders)
    // -------------------------------------------------------------
    const cards = document.querySelectorAll(".service-card");
    
    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty("--x", `${x}px`);
            card.style.setProperty("--y", `${y}px`);
        });
    });

    // -------------------------------------------------------------
    // 5. PORTFOLIO FILTERING LOGIC
    // -------------------------------------------------------------
    const filterButtons = document.querySelectorAll(".filter-btn");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active status from other buttons and set to current
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                // Apply animation/opacity transitions for cleaner filtering
                item.style.opacity = "0";
                item.style.transform = "scale(0.95)";
                
                setTimeout(() => {
                    if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
                        item.classList.remove("hidden");
                        // Trigger reflow to restart animation smoothly
                        setTimeout(() => {
                            item.style.opacity = "1";
                            item.style.transform = "scale(1)";
                        }, 50);
                    } else {
                        item.classList.add("hidden");
                    }
                }, 200);
            });
        });
    });

    // -------------------------------------------------------------
    // 6. CONTACT FORM SUBMISSION WITH SIMULATED LOADER
    // -------------------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const formSuccess = document.getElementById("form-success");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            // Show sending status on CTA button
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Sending... <span class="spinner"></span>`;
            
            // Simulate 1.5 seconds server API call delay
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
                
                // Show success container and reset form inputs
                formSuccess.classList.remove("hidden");
                contactForm.reset();
                
                // Remove success validation banner after 5 seconds
                setTimeout(() => {
                    formSuccess.classList.add("hidden");
                }, 5000);
            }, 1500);
        });
    }

    // -------------------------------------------------------------
    // 7. NEWSLETTER FORM ACTION SIMULATION
    // -------------------------------------------------------------
    const newsletterForm = document.getElementById("newsletter-form");
    const newsletterSuccess = document.getElementById("newsletter-success");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            
            newsletterSuccess.classList.remove("hidden");
            newsletterForm.reset();

            setTimeout(() => {
                newsletterSuccess.classList.add("hidden");
            }, 4000);
        });
    }
});

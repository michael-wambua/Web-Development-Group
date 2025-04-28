// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add active class to current navigation item
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Scroll to section when clicking on navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar-wrapper');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(17, 46, 66, 0.95)';
            navbar.style.position = 'fixed';
            navbar.style.padding = '10px 0';
        } else if (window.location.pathname === '/') {
            navbar.style.backgroundColor = 'transparent';
            navbar.style.position = 'absolute';
            navbar.style.padding = '20px 0';
        }
    });
    
    // Counter animation for statistics section
    const statisticItems = document.querySelectorAll('.statistic-item h3');
    let counted = false;
    
    function startCounting() {
        if (counted) return;
        
        statisticItems.forEach(item => {
            const target = parseInt(item.textContent);
            let count = 0;
            const duration = 2000; // 2 seconds
            const interval = Math.floor(duration / target);
            
            const counter = setInterval(() => {
                count++;
                item.textContent = count;
                
                if (count >= target) {
                    clearInterval(counter);
                }
            }, interval);
        });
        
        counted = true;
    }
    
    // Check if statistics section is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Start counting when statistics section is in viewport
    window.addEventListener('scroll', function() {
        const statisticsSection = document.querySelector('.statistics-section');
        if (statisticsSection && isInViewport(statisticsSection)) {
            startCounting();
        }
    });
    
    // Handle dark mode toggle
    const darkModeToggle = document.querySelector('.fa-moon');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            this.classList.toggle('fa-moon');
            this.classList.toggle('fa-sun');
        });
    }
});
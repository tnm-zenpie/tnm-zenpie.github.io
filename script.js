// --- CONFIGURATION ---
// 0.1 = Fast/Snappy
// 0.05 = Normal Smooth
// 0.02 = Heavy/Cinematic (Very Slow)
const SCROLL_SPEED = 0.04; 


// 1. CUSTOM CURSOR LOGIC
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Hover effects for cursor
const links = document.querySelectorAll('a, .project-card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursorOutline.style.width = '80px';
        cursorOutline.style.height = '80px';
        cursorOutline.style.borderColor = '#ff1a1a';
        cursorOutline.style.mixBlendMode = 'difference';
    });
    link.addEventListener('mouseleave', () => {
        cursorOutline.style.width = '40px';
        cursorOutline.style.height = '40px';
        cursorOutline.style.borderColor = '#e0e0e0';
        cursorOutline.style.mixBlendMode = 'normal';
    });
});

// 2. MOMENTUM SCROLL LOGIC
const body = document.body;
const main = document.getElementById('smooth-content');

let sx = 0, sy = 0;
let dx = sx, dy = sy;

function render() {
    // We use SCROLL_SPEED here to control the "heaviness"
    dx = lerp(dx, window.scrollX, SCROLL_SPEED);
    dy = lerp(dy, window.scrollY, SCROLL_SPEED);
    
    dx = Math.floor(dx * 100) / 100;
    dy = Math.floor(dy * 100) / 100;
    
    main.style.transform = `translate(-${dx}px, -${dy}px)`;
    
    window.requestAnimationFrame(render);
}

function lerp(a, b, n) {
    return (1 - n) * a + n * b;
}

function setHeight() {
    document.body.style.height = main.clientHeight + 'px';
}

window.addEventListener('load', setHeight);
window.addEventListener('resize', setHeight);

// Initialize Smooth Scroll only on Desktop
if (window.innerWidth > 768) {
    main.style.position = 'fixed';
    main.style.top = 0;
    main.style.left = 0;
    main.style.width = '100%';
    render();
} else {
    main.style.position = 'relative';
}

// 3. NAVIGATION SCROLL FIX (With Smooth Setting)
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            if (window.innerWidth > 768) {
                const offsetTop = targetSection.offsetTop;
                
                // Changed to 'smooth' to make the target move slower
                // The render loop will follow this slower movement
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth' 
                });
            } else {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

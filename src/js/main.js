/* -------------------------------------------------------------------------- */
/*                            initParallaxMouseMove                           */
/* -------------------------------------------------------------------------- */

function initParallaxMouseMove() {
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', function (e) {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        mouseX = e.pageX - centerX;
        mouseY = e.pageY - centerY;
    });

    const paralaxElements = document.querySelectorAll('.move-paralax');

    paralaxElements.forEach(function (block) {
        let currentX = 0;
        let currentY = 0;

        function animate() {
            const ease = 0.05;
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;

            block.style.setProperty('--mouse-x', `${currentX}px`);
            block.style.setProperty('--mouse-y', `${currentY}px`);

            requestAnimationFrame(animate);
        }

        animate();
    });
}

/* -------------------------------------------------------------------------- */
/*                              startAnimations;                              */
/* -------------------------------------------------------------------------- */
function startAnimations() {
    const tlh = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power2.out' },
    });
    tlh.from('.header__logo', { x: -50, opacity: 0 });
    tlh.from('.header__drop', { x: 50, opacity: 0 }, '-=0.3');
    tlh.from('.header__currency', { opacity: 0 }, '-=0.3');
    tlh.from('.header__actions', { x: 50, opacity: 0 }, '-=0.3');
    tlh.from('.header-menu-btn', { opacity: 0 }, '-=0.3');

    const tlbg = gsap.timeline({
        defaults: { duration: 1, ease: 'power2.out' },
    });
    tlbg.from('.main-section__text-img', { x: -100, opacity: 0, delay: 0.6 });
    tlbg.from('.main-section__car-img', { x: 100, opacity: 0 }, '-=0.5');
    tlbg.from('.main-section__graham-img', { opacity: 0, opacity: 0 }, '-=0.5');

    const tlContnt = gsap.timeline({
        defaults: { duration: 1, ease: 'power2.out' },
    });
    tlContnt.from('.main-section__text', { y: 50, opacity: 0, delay: 1 });
    tlContnt.from('.main-section__coins', { opacity: 0 }, '-=0.5');
}

/* -------------------------------------------------------------------------- */
/*                              scrollAnimations                              */
/* -------------------------------------------------------------------------- */

function scrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    const titlesBlocks = document.querySelectorAll('.section-title');
    const coinCards = document.querySelectorAll('.coin-card .coin-card');

    titlesBlocks.forEach((title) => {
        gsap.from(title, {
            x: 50,
            opacity: 0,
            duration: 0.3,
            scrollTrigger: {
                trigger: title,
                start: 'top 80%',
                //markers: true,
            },
        });
    });

    gsap.from('.coins-cards .coin-card', {
        opacity: 0,
        x: 50,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.coins-cards',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
    });
}

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    gsap.to('.loader', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => (loader.style.display = 'none'),
    });
    initParallaxMouseMove();
    startAnimations();
    scrollAnimations();
});

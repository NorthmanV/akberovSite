document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (!navToggle || !navMenu) {
        return;
    }

    const handleCloseMenu = () => {
        if (!navMenu.classList.contains('active')) {
            return;
        }
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
    };

    const handleToggleMenu = () => {
        const isExpanded = navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(isExpanded));
    };

    const handleClickOutside = (event) => {
        if (navMenu.contains(event.target) || navToggle.contains(event.target)) {
            return;
        }
        handleCloseMenu();
    };

    const handleKeyDown = (event) => {
        if (event.key !== 'Escape') {
            return;
        }
        if (navMenu.classList.contains('active')) {
            handleCloseMenu();
            navToggle.focus();
        }
    };

    const handleAnchorClick = (event) => {
        const link = event.currentTarget;
        const targetId = link.getAttribute('href');

        if (!targetId || targetId === '#' || !targetId.startsWith('#')) {
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (!targetElement) {
            return;
        }

        event.preventDefault();
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        handleCloseMenu();
    };

    navToggle.addEventListener('click', handleToggleMenu);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    document.querySelectorAll('.nav__menu a').forEach((link) => {
        link.addEventListener('click', handleCloseMenu);
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', handleAnchorClick);
    });
});

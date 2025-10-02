document.addEventListener('DOMContentLoaded', function () {

    const container = document.getElementById('#wrap');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (!container || !scrollToTopBtn) return;

    function toggleScrollTopButton() {
        scrollToTopBtn.style.display = container.scrollTop > 100 ? 'flex' : 'none';
    }

    container.addEventListener('scroll', () => {
        requestAnimationFrame(toggleScrollTopButton);
    });

    scrollToTopBtn.addEventListener('click', () => {
        container.scrollTo({ top: 0, behavior: 'smooth' });
    });

    toggleScrollTopButton();
});

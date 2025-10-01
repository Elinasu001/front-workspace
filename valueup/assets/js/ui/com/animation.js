document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 화면에 들어오면
            entry.target.classList.add('show');
        } else {
            // 화면에서 벗어나면
            entry.target.classList.remove('show');
        }
        });
    }, {
        threshold: 0.2
    });

    galleryItems.forEach(item => observer.observe(item));

});
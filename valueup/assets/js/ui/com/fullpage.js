document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('full-container');
    const sections = document.querySelectorAll('.section');
    const pagination = document.getElementById('pagination');
    if (!container || !sections.length || !pagination) return;

    let isScrolling = false;

    // 페이지네이션 생성
    sections.forEach((section, index) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${section.id}`;
        a.classList.add('pagination-dot');
        a.textContent = `페이지 ${index + 1}`;
        li.appendChild(a);
        pagination.appendChild(li);
    });

    const paginationDots = document.querySelectorAll('.pagination-dot');

    function updateActiveSection() {
        let currentIndex = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5) {
                currentIndex = index;
            }
        });

        paginationDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    container.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                updateActiveSection();
                isScrolling = false;
            });
        }
    });

    // 네비게이션 / 페이지네이션 클릭 이동
    const allLinks = document.querySelectorAll('#gnbFull .menu-list a, .m-link, .pagination-dot');
    allLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const id = link.getAttribute('href').substring(1);
            const target = document.getElementById(id);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    updateActiveSection();
});

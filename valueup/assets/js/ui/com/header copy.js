document.addEventListener('DOMContentLoaded', function() {
const container = document.getElementById('full-container');  // 스크롤 컨테이너
const nav = document.getElementById('gnbFull');

// ==== 풀스크린 전용 로직 ====
if (container) {
    const sections = document.querySelectorAll('.section');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const pagination = document.getElementById('pagination');
    let isScrolling = false;

    // 네비게이션 box-shadow 토글
    function updateNavbarShadow() {
        const header = document.querySelector('header');  // header 요소
        if (container.scrollTop > 0) {
            header.classList.add('scrolled');   // header에 붙이기
        } else {
            header.classList.remove('scrolled');
        }
    }

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
        let currentSectionIndex = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.5) {
                currentSectionIndex = index;
            }
        });

        paginationDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSectionIndex);
        });

        if (currentSectionIndex > 0) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    }

    container.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                updateNavbarShadow(); 
                updateActiveSection();
                isScrolling = false;
            });
        }
    });

    // 메뉴 & 페이지네이션 클릭 이동
    const allNavLinks = document.querySelectorAll('#gnbFull .menu-list a, .m-link, .pagination-dot');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Scroll To Top 버튼
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            container.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 초기 상태
    updateNavbarShadow();
    updateActiveSection();
}

// ==== 공통 GNB (데스크톱 메뉴, 모바일 햄버거) ====
const items = document.querySelectorAll('#gnbFull .menu-item');
function openItem(item) {
    closeAll();
    item.classList.add('on');
    const link = item.querySelector('a');
    if (link) link.setAttribute('aria-expanded', 'true');
}
function closeItem(item) {
    item.classList.remove('on');
    const link = item.querySelector('a');
    if (link) link.setAttribute('aria-expanded', 'false');
}
function closeAll() {
    const opened = document.querySelectorAll('#gnbFull .menu-item.on');
    for (let i = 0; i < opened.length; i++) closeItem(opened[i]);
}

items.forEach(item => {
    const link = item.querySelector('a');
    item.addEventListener('mouseenter', () => openItem(item));
    item.addEventListener('mouseleave', () => closeItem(item));
    if (link) {
        link.addEventListener('focus', () => openItem(item));
    }
});
document.addEventListener('focusin', function(e) {
    if (!e.target.closest || !e.target.closest('#gnbFull')) closeAll();
});
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeAll();
});

// ==== 모바일 햄버거 ====
const btn = document.getElementById('btnMobileMenu');
const wrap = document.getElementById('mobileMenu');
const closeBtn = document.getElementById('mobileClose');

if (btn && wrap) {
    let previousActiveElement = null;

    function openMenu() {
        previousActiveElement = document.activeElement;
        wrap.setAttribute('aria-hidden', 'false');
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('is-open');
        document.body.classList.add('body-lock');
    }
    function closeMenu() {
        wrap.setAttribute('aria-hidden', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('is-open');
        document.body.classList.remove('body-lock');
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
    }
    function toggleMenu() {
        const hidden = wrap.getAttribute('aria-hidden') !== 'false';
        if (hidden) openMenu();
        else closeMenu();
    }

    btn.addEventListener('click', (e) => { e.preventDefault(); toggleMenu(); });
    if (closeBtn) closeBtn.addEventListener('click', () => closeMenu());
    wrap.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-close') === 'backdrop') closeMenu();
    });
    document.addEventListener('keydown', (e) => {
        if (wrap.getAttribute('aria-hidden') === 'false' && (e.key === 'Escape' || e.keyCode === 27)) {
            closeMenu();
        }
    });


    // 아코디언
    const acc = wrap.querySelectorAll('.m-acc');
        acc.forEach(item => {
            const b = item.querySelector('.m-acc-btn');
            const p = item.querySelector('.m-acc-panel');
            if (!b || !p) return;
            b.addEventListener('click', () => {
                const open = item.classList.contains('open');
                if (open) {
                    item.classList.remove('open');
                    b.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('open');
                    b.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

});
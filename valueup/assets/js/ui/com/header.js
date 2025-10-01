document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('full-container');  // 스크롤 컨테이너
    const btn = document.getElementById('btnMobileMenu');         // 햄버거 버튼
    const wrap = document.getElementById('mobileMenu');           // 모바일 메뉴 래퍼
    const closeBtn = document.getElementById('mobileClose');      // 닫기 버튼

    // ==== 헤더 스크롤 box-shadow 토글 ====
    function updateNavbarShadow() {
        const header = document.querySelector('header');
        if (container && container.scrollTop > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    if (container) {
        container.addEventListener('scroll', () => {
            requestAnimationFrame(updateNavbarShadow);
        });
        updateNavbarShadow(); // 초기 실행
    }

    // ==== 모바일 햄버거 메뉴 ====
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

        // 버튼 클릭 이벤트
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // 닫기 버튼
        if (closeBtn) closeBtn.addEventListener('click', () => closeMenu());

        // 배경(backdrop) 클릭 시 닫기
        wrap.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-close') === 'backdrop') closeMenu();
        });

        // ESC 키 닫기
        document.addEventListener('keydown', (e) => {
            if (wrap.getAttribute('aria-hidden') === 'false' && (e.key === 'Escape' || e.keyCode === 27)) {
                closeMenu();
            }
        });
    }

    
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
});

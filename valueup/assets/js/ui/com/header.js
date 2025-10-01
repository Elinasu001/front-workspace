document.addEventListener('DOMContentLoaded', function () {
    // ==== 공통 GNB (데스크톱 메뉴) ====
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
        opened.forEach(el => closeItem(el));
    }

    items.forEach(item => {
        const link = item.querySelector('a');
        item.addEventListener('mouseenter', () => openItem(item));
        item.addEventListener('mouseleave', () => closeItem(item));
        if (link) {
            link.addEventListener('focus', () => openItem(item));
        }
    });

    document.addEventListener('focusin', function (e) {
        if (!e.target.closest || !e.target.closest('#gnbFull')) closeAll();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeAll();
    });

    // ==== 모바일 햄버거 메뉴 ====
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

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        if (closeBtn) closeBtn.addEventListener('click', () => closeMenu());

        wrap.addEventListener('click', (e) => {
            if (e.target.getAttribute('data-close') === 'backdrop') closeMenu();
        });

        document.addEventListener('keydown', (e) => {
            if (wrap.getAttribute('aria-hidden') === 'false' && (e.key === 'Escape' || e.keyCode === 27)) {
                closeMenu();
            }
        });

        // ==== 모바일 아코디언 ====
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

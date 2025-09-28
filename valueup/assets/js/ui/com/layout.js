document.addEventListener("DOMContentLoaded", () => {
    /*---------------------------------------------
        load, init
    ---------------------------------------------*/
    window.addEventListener("load", () => {
        if (document.querySelector(".fullPopupOn .pop-con-wrap")) {
        headerPopupL.scrolling();
        }

        if (document.querySelector(".contentWrap")) {
        sideToolsL.scrolling();
        }

        if (document.querySelector("#gnbFull")) {
        gnbFullL.init();
        }

        if (document.querySelector("#gnb")) {
        gnbL.init();
        }

        if (document.querySelector("#skipnavi")) {
        skipNaviL.init();
        }

        console.log("[layout.js] 초기화 완료");
    });

    /*---------------------------------------------
        resize
    ---------------------------------------------*/
    window.addEventListener("resize", () => {
        if (document.querySelector(".wrap .contentWrap")) {
        headerL.scrolling();
        }

        if (document.querySelector(".fullPopupOn .pop-con-wrap")) {
        headerPopupL.scrolling();
        }
    });

    /*---------------------------------------------
        GNB 메뉴 제어 모듈
    ---------------------------------------------*/
    const gnbFullL = (() => {
        return {
        gnbItems: null,

        mouseOverFocusIn: function () {
            this.gnbItems.forEach((item) => {
            const link = item.firstElementChild

            // 마우스 오버
            item.addEventListener("mouseenter", () => {
                this.openMenu(item);
            });

            // 키보드 탭 포커스
            if (link) {
                link.addEventListener("focus", () => {
                this.openMenu(item);
                });
            }
            });
        },

        mouseLeave: function () {
            this.gnbItems.forEach((item) => {
            item.addEventListener("mouseleave", () => {
                this.closeMenu(item);
            });
            });
        },

        focusOutGnb: function () {
            document.body.addEventListener("focusin", (e) => {
            if (!e.target.closest("#gnbFull")) {
                this.gnbItems.forEach((item) => this.closeMenu(item));
            }
            });
        },

        openMenu: function (item) {
            this.gnbItems.forEach((sibling) => {
            if (sibling !== item) this.closeMenu(sibling);
            });
            item.classList.add("on");
            const subMenu = item.querySelector(".menu-sub");
            if (subMenu) subMenu.style.display = "flex";
        },

        closeMenu: function (item) {
            item.classList.remove("on");
            const subMenu = item.querySelector(".menu-sub");
            if (subMenu) subMenu.style.display = "none";
        },

        init: function () {
            this.gnbItems = document.querySelectorAll(
            "#gnbFull .menu-list .menu-item"
            );
            this.mouseOverFocusIn();
            this.mouseLeave();
            this.focusOutGnb();
        },
        };
    })();

    /*---------------------------------------------
        GNB (모바일/서브) 메뉴 제어 모듈
    ---------------------------------------------*/
    const gnbL = (() => {
        return {
        init: function () {
            this.bindDepthToggle();
            this.bindMenuClick();
            this.bindResize();
        },

        bindMenuClick: function () {
            document.addEventListener("click", (e) => {
            if (e.target.matches("#gnb .menu-list .menu-item > a")) {
                e.preventDefault();
                const parent = e.target.parentElement;

                if (parent.classList.contains("on")) {
                parent.classList.remove("on");
                parent.querySelectorAll(".on").forEach((el) =>
                    el.classList.remove("on")
                );
                } else {
                parent.classList.add("on");
                parent.parentElement
                    .querySelectorAll(".menu-item")
                    .forEach((sibling) => {
                    if (sibling !== parent) {
                        sibling.classList.remove("on");
                        sibling
                        .querySelectorAll(".on")
                        .forEach((el) => el.classList.remove("on"));
                    }
                    });
                }
            }
            });
        },

        bindDepthToggle: function () {
            document.addEventListener("click", (e) => {
            if (e.target.matches("#gnb .depth-con ul > li > a")) {
                const parentLi = e.target.parentElement;
                const nextDepth = parentLi.querySelector("div, ul");

                if (!nextDepth) return;
                e.preventDefault();

                parentLi.classList.toggle("on");
                parentLi.parentElement
                .querySelectorAll("li")
                .forEach((sibling) => {
                    if (sibling !== parentLi) {
                    sibling.classList.remove("on");
                    sibling
                        .querySelectorAll("li")
                        .forEach((el) => el.classList.remove("on"));
                    sibling
                        .querySelectorAll("div, ul")
                        .forEach((el) => el.classList.remove("on"));
                    }
                });
            }
            });
        },

        bindResize: function () {
            window.addEventListener("resize", () => {
            this.resetGnb();
            });
        },

        resetGnb: function () {
            document
            .querySelectorAll("#gnb .menu-item, #gnb li")
            .forEach((el) => el.classList.remove("on"));
            document
            .querySelectorAll("#gnb .menu-sub, #gnb .depth02, #gnb .depth03")
            .forEach((el) => {
                el.removeAttribute("style");
            });
        },
        };
    })();

    /*---------------------------------------------
        Skip Navi 포커스 이동 모듈
    ---------------------------------------------*/
    const skipNaviL = (() => {
        return {
        moveFocus: function () {
            document.querySelectorAll("#skipnavi a").forEach((link) => {
            link.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                if (link.getAttribute("href") === "#gotoContentArea") {
                    const gotoContent = document.querySelector("#gotoContentArea");
                    if (gotoContent) {
                    gotoContent.setAttribute("tabindex", "-1");
                    gotoContent.focus();
                    }
                } else if (link.getAttribute("href") === "#gnbFull") {
                    const firstMenu = document.querySelector(
                    ".menu-list .menu-item > a"
                    );
                    if (firstMenu) firstMenu.focus();
                }
                }
            });
            });
        },
        init: function () {
            this.moveFocus();
        },
        };
    })();

    /*---------------------------------------------
        header on 클래스 제어
    ---------------------------------------------*/
    const headerL = (() => {
        let scrollY = 0;

        return {
        headerAni: function () {
            const targets = document.querySelectorAll(".headerOn, .btmWrap");
            targets.forEach((t) => {
            if (scrollY > 0) t.classList.add("on");
            else t.classList.remove("on");
            });
        },
        scrolling: function () {
            const wrap = document.querySelector(".wrap .contentWrap");
            scrollY = wrap ? wrap.scrollTop : 0;
            this.headerAni();
        },
        };
    })();

    if (document.querySelector(".wrap .contentWrap")) {
        document
        .querySelector(".wrap .contentWrap")
        .addEventListener("scroll", () => {
            headerL.scrolling();
        });
    }

    /*---------------------------------------------
        popup header on 클래스 제어
    ---------------------------------------------*/
    const headerPopupL = (() => {
        let scrollY = 0;

        return {
        headerAni: function () {
            const headers = document.querySelectorAll(
            ".fullPopupOn .pop-header, .fullPopupOn .pop-btm-wrap"
            );
            headers.forEach((h) => {
            if (scrollY > 0) h.classList.add("on");
            else h.classList.remove("on");
            });
        },
        scrolling: function () {
            const wrap = document.querySelector(".fullPopupOn .pop-con-wrap");
            scrollY = wrap ? wrap.scrollTop : 0;
            this.headerAni();
        },
        };
    })();

    if (document.querySelector(".fullPopupOn .pop-con-wrap")) {
        document
        .querySelector(".fullPopupOn .pop-con-wrap")
        .addEventListener("scroll", () => {
            headerPopupL.scrolling();
        });
    }

    /*---------------------------------------------
        sideTools (스크롤 업 버튼 등)
    ---------------------------------------------*/
    const sideToolsL = (() => {
        let isOn = false;

        return {
        scrolling: function () {
            const contentWrap = document.querySelector(".contentWrap");
            if (!contentWrap) return;

            const scrollTop = contentWrap.scrollTop;
            const sideTools = document.querySelector("#sideTools");

            if (scrollTop >= 200 && !isOn) {
            sideTools.classList.add("on");
            isOn = true;
            } else if (scrollTop < 200 && isOn) {
            sideTools.classList.remove("on");
            isOn = false;
            }
        },

        moveTop: function () {
            const contentWrap = document.querySelector(".contentWrap");
            if (contentWrap) {
            contentWrap.scrollTo({ top: 0, behavior: "smooth" });
            }
        },

        plusMenu: function () {
            const plusMenu = document.querySelector("#sideTools .sideMenu ul");
            const overlay = document.querySelector(".overlay");
            if (plusMenu) plusMenu.style.display = "none";
            if (overlay) overlay.classList.remove("on");

            document.addEventListener("click", (e) => {
            if (e.target.matches("#sideTools .sideMenu > button")) {
                e.preventDefault();
                const thisUl = e.target.nextElementSibling;
                if (thisUl && thisUl.tagName === "UL") {
                if (thisUl.style.display === "block") {
                    thisUl.style.display = "none";
                    if (overlay) overlay.classList.remove("on");
                    e.target.parentElement.classList.remove("on");
                    document.querySelector("#sideTools").style.zIndex = "9";
                    e.target.textContent = "퀵메뉴 열기";
                } else {
                    thisUl.style.display = "block";
                    if (overlay) overlay.classList.add("on");
                    e.target.parentElement.classList.add("on");
                    document.querySelector("#sideTools").style.zIndex = "12";
                    e.target.textContent = "퀵메뉴 닫기";
                }
                }
            }
            });
        },
        };
    })();

    if (document.querySelector("#sideTools")) {
        const contentWrap = document.querySelector(".contentWrap");
        if (contentWrap) {
        contentWrap.addEventListener("scroll", () => {
            sideToolsL.scrolling();
        });
        }

        const scrollUpBtn = document.querySelector("#sideTools .scrollUpBtn");
        if (scrollUpBtn) {
        scrollUpBtn.addEventListener("click", () => {
            sideToolsL.moveTop();
        });
        }

        sideToolsL.plusMenu();
    }
});

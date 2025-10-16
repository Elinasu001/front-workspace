
/*
 * 반응형 컨텐츠 높이
*/

document.addEventListener("DOMContentLoaded", function() {
    const contentWrap = document.querySelector(".contentWrap");
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");

    function setContentHeight() {
        if (contentWrap && header && footer) {
        const totalHeight = window.innerHeight;
        const headerHeight = header.offsetHeight;
        const footerHeight = footer.offsetHeight;
        contentWrap.style.height = (totalHeight - headerHeight - footerHeight) + "px";
        }
    }

    setContentHeight();

    // 리사이즈 성능 최적화
    let resizeTimer;
    function debounceResize() {
        cancelAnimationFrame(resizeTimer); // 이전 예약된 작업 취소
        resizeTimer = requestAnimationFrame(setContentHeight); // 새로 예약
    }

    //  윈도우 리사이즈 시 높이 재계산
    window.addEventListener("resize", debounceResize);

    // 모바일 대응 
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", debounceResize);
    }
});

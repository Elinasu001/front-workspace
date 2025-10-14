document.addEventListener('DOMContentLoaded', function () {
    // 스크롤되는 영역(#full-container)과 버튼 요소를 가져옴
    const container = document.getElementById('full-container');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    // 요소가 존재하지 않으면 코드 실행 중단 (안전 처리)
    if (!container || !scrollToTopBtn) return;

    // 스크롤 위치에 따라 버튼 보이기/숨기기
    function toggleScrollTopButton() {
        const scrollPos = container.scrollTop; // 내부 스크롤 위치
        scrollToTopBtn.style.display = scrollPos > 100 ? 'flex' : 'none';
    }

    // 스크롤 시 버튼 상태 업데이트
    container.addEventListener('scroll', () => {
        requestAnimationFrame(toggleScrollTopButton);
    });

    // 클릭 시 부드럽게 맨 위로 이동
    scrollToTopBtn.addEventListener('click', () => {
        container.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 초기 상태 확인
    toggleScrollTopButton();
});

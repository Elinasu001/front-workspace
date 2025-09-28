let timer = null;         // setTimeout 타이머 ID 저장 (8초 지연 시작)
let interval = null;      // setInterval 타이머 ID 저장 (퍼센트 증가)
let progress = 0;         // 현재 퍼센트 값
let resolved = false;     // 퍼센트가 끝났는지 여부

export const PercentLoader = {

    // 퍼센트 애니메이션 지연 후 실행
    showDelayed: function () {
        progress = 0;       // 퍼센트 초기화
        resolved = false;   // 응답이 빨랐으면 퍼센트 안 보이게

        // Promise를 반환하여 퍼센트 완료까지 대기 가능
        return new Promise((resolve) => {

            timer = setTimeout(() => {  // 8초 후에 퍼센트 시작

                if (resolved) return; // 응답이 빨랐으면 퍼센트 안 보이게

                const bar = document.getElementById('globalLoader');
                if (!bar) return;

                const numberEl = bar.querySelector('.progressText span');
                const textWrapper = bar.querySelector('.progressText');
                if (textWrapper) textWrapper.style.display = 'block'; // 퍼센트 텍스트 표시

                interval = setInterval(() => {   // 퍼센트 증가
                    if (progress >= 100) {
                        clearInterval(interval); // 퍼센트 완료 시 인터벌 종료
                        resolved = true;         // 퍼센트 완료
                        resolve();               // 퍼센트 100% 완료 시 resolve
                        return;
                    }

                    progress += 1;               // 1초에 20% 증가
                    if (numberEl) numberEl.innerText = progress;  // 퍼센트 텍스트 업데이트
                }, 50); // 약 5초간 진행 (50ms * 100)

            }, 2000); // 8초 뒤에 퍼센트 시작

        });
    },

    // 강제로 퍼센트 숨기기 및 초기화
    hide: function () {
        resolved = true;          // 응답이 빨랐으면 퍼센트 안 보이게
        clearTimeout(timer);      // 타이머 초기화
        clearInterval(interval);  // 인터벌 초기화
        progress = 0;             // 퍼센트 초기화

        const bar = document.getElementById('globalLoader');
        if (!bar) return;

        const textEl = bar.querySelector('.progressText span');
        const textWrapper = bar.querySelector('.progressText');
        if (textEl) textEl.innerText = '0';
        if (textWrapper) textWrapper.style.display = 'none'; // 다시 숨기기

        bar.style.display = 'none';
    }
};
// 1. 타임아웃 테스트용 가짜 fetch 함수
export async function fetchWithTimeout(url, timeout = 10000) {
    const controller = new AbortController();
    const signal = controller.signal;
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { signal });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

export function fakeFetch(url, delay = 12000) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve({
                    name: '홍길동',
                    email: 'hong@example.com'
                })
            });
        }, delay);
    });
}
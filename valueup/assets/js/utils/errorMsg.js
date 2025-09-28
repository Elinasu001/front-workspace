// errorMsg.js
const messages = {
    ERR_NOT_FOUND: '정보가 존재하지 않습니다.',
    ERR_TIMEOUT: '요청 시간이 너무 길어요.',
};

export function getErrorMessage(error) {
    if (!error || typeof error !== 'object') return '알 수 없는 오류가 발생했습니다.';
    if (messages[error.message]) return messages[error.message];
    return error.message || '알 수 없는 오류가 발생했습니다.';
}
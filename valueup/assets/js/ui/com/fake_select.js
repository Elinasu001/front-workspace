document.addEventListener('DOMContentLoaded', function () {

    /*---------------------------------------------
     * ready, load
     *---------------------------------------------*/
    window.addEventListener('load', function () {
        fnPreload();
    });

    /*---------------------------------------------
     * preload, init
     *---------------------------------------------*/
    /* preload */
    function fnPreload() {
        seSelect.init();
    }

    /*---------------------------------------------
     * Custom Select Function #셀렉트
     *---------------------------------------------*/
    var customSelect = function (selectElement) {
        /* Funtion Define */
        const fnName = '[data-stove="select"]';
        const thisEl = selectElement.closest(fnName);
        const stage = document.querySelector('.contentWrap');

        if (!thisEl) return;

        /* Class Define */
        const onClass = 'on';
        const dimClass = 'stove-dim';
        const optionLayerClass = 'stove-option-layer';
        const optionLayerScrollClass = 'stove-option-scroll';
        const optionListClass = 'stove-options';
        const optionClass = 'stove-option';
        const optionTitleClass = 'stove-options-title';

        /* Extend Define */
        const nowStatus = thisEl.getAttribute('data-status');
        const statusDisabled = selectElement.disabled;
        const statusReadonly = selectElement.hasAttribute('readonly');
        const uiCase = thisEl.getAttribute('data-uicase');
        const options = selectElement.options;

        /* Reset */
        if (statusDisabled || statusReadonly) return;
        thisEl.querySelectorAll(`.${dimClass}, .${optionLayerClass}`).forEach(el => el.remove());

        /* Option Init */
        const dim = document.createElement('div');
        dim.className = dimClass;
        selectElement.before(dim);

        const optionLayer = document.createElement('div');
        optionLayer.className = optionLayerClass;
        optionLayer.setAttribute('role', 'dialog');
        selectElement.after(optionLayer);

        const optionScroll = document.createElement('div');
        optionScroll.className = optionLayerScrollClass;
        optionLayer.appendChild(optionScroll);

        const optionList = document.createElement('div');
        optionList.className = optionListClass;
        optionScroll.appendChild(optionList);

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (option.disabled && option.selected && option.hidden) {
                // 주석 처리된 부분은 생략
            } else if (option.disabled) {
                const button = document.createElement('button');
                button.className = optionClass;
                button.textContent = option.text;
                button.disabled = true;
                button.dataset.value = option.value;
                optionList.appendChild(button);
            } else if (option.hidden) {
                // 기본 옵션(hidden)은 표시하지 않음
            } else {
                const button = document.createElement('button');
                button.className = optionClass;
                button.textContent = option.text;
                button.dataset.value = option.value;
                optionList.appendChild(button);
            }
        }

        const optionBtns = optionList.querySelectorAll('button');

        const optionTitle = document.createElement('div');
        optionTitle.className = optionTitleClass;
        const hiddenTitle = thisEl.querySelector('.e-hidden-title');
        if (hiddenTitle) {
            optionTitle.textContent = hiddenTitle.textContent;
        }
        optionLayer.prepend(optionTitle);


        setTimeout(() => {
            optionBtns.forEach(btn => {
                const thisRel = btn.getAttribute('data-value');
                const thisValue = selectElement.value;
                if (thisRel === thisValue) {
                    btn.classList.add(onClass);
                    btn.setAttribute('title', '선택됨');
                }
            });
        }, 0);

        /* Common Function */
        function open() {
            optionLayer.classList.add(`va-${uiCase}`);
            if (uiCase === 'slide') {
                setTimeout(() => {
                    dim.classList.add(onClass);
                    optionLayer.classList.add(onClass);
                    if (window.innerWidth > 960 && stage) {
                        stage.style.overflow = 'hidden';
                    }
                }, 0);
                setTimeout(() => {
                    optionLayer.setAttribute('tabindex', '0');
                    optionLayer.focus();
                }, 0);

                dim.addEventListener('click', e => {
                    close();
                    e.stopPropagation();
                });
            }
            thisEl.setAttribute('data-status', 'open');
        }

        function close() {
            if (uiCase === 'slide') {
                setTimeout(() => {
                    dim.remove();
                    optionLayer.remove();
                    if (typeof fkSelAndPopupResetOverflow === 'function') {
                         fkSelAndPopupResetOverflow(); // 모든 팝업과 select layer 닫힘 여부 확인 후 overflow 초기화
                    } else if (stage) {
                        stage.style.overflow = '';
                    }
                }, 0);
            }
            setTimeout(() => {
                thisEl.removeAttribute('data-status');
            }, 1);
        }

        /* Event Binding */
        selectElement.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                close();
            }
        });

        optionLayer.addEventListener('click', e => e.stopPropagation());
        optionLayer.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                close();
            }
        });

        optionBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                e.preventDefault(); // select 선택 시 기본 폼 리셋 방지

                selectElement.value = this.getAttribute('data-value');
                // 'change' 이벤트를 수동으로 발생시켜 다른 리스너들이 반응하도록 함
                selectElement.dispatchEvent(new Event('change', { 'bubbles': true }));

                close();

                const fakeSlt = thisEl.closest('.se-select').querySelector('.btn-fake-slt');
                if (fakeSlt) {
                    const fakeSltVal = fakeSlt.querySelector('.value');
                    const sltVal = this.textContent;

                    fakeSlt.focus();
                    fakeSlt.classList.add('selected');
                    if (fakeSltVal) {
                        fakeSltVal.textContent = sltVal;
                    }
                }
            });
        });

        /* Init */
        if (nowStatus === 'open') {
            close();
        } else {
            open();
        }
    };

    /*
     * event - Delegated Event Listener
     */
    document.addEventListener('click', function (e) {
        const fakeButton = e.target.closest('.se-select .btn-fake-slt');
        if (fakeButton) {
            const select = fakeButton.closest('.se-select').querySelector('select');
            if (select && select.disabled) return;
            customSelect(select);
        }
    });


    /*---------------------------------------------
     * select #셀렉트
     *---------------------------------------------*/
    const seSelect = (function () {
        return {
            init: function () {
                document.querySelectorAll('.se-select').forEach(function (el) {
                    if (el.getAttribute('data-stove') === 'select') {
                        if (el.querySelector('.btn-fake-slt')) return;

                        const button = document.createElement('button');
                        button.type = 'button';
                        button.className = 'se-btn btn-fake-slt';
                        button.innerHTML = '<span class="placeholder"></span><span class="value"></span>';
                        el.appendChild(button);

                        const select = el.querySelector('select');
                        const fakeSlt = el.querySelector('.btn-fake-slt');
                        const fakeSltPlaceholder = fakeSlt.querySelector('.placeholder');
                        const fakeSltVal = fakeSlt.querySelector('.value');

                        if (select.disabled) {
                            fakeSlt.classList.add('disabled');
                        }
                        if (select.hasAttribute('readonly')) {
                            fakeSlt.classList.add('readonly');
                        }

                        Array.from(select.options).forEach(function (option) {
                            if (option.hidden) {
                                fakeSltPlaceholder.textContent = option.text;
                            }
                            if (option.selected) {
                                fakeSlt.classList.add('selected');
                                fakeSltVal.textContent = option.text;
                            }
                        });
                    }
                });
            },
            errorChk: function (_target) {
                const slt = _target;
                const sltWrap = slt.closest('.se-select');
                const formGroup = sltWrap ? sltWrap.closest('.form-group') : null;
                
                if (formGroup) {
                    if (formGroup.classList.contains('user-invalid')) {
                        // The logic seems to re-add the class if it exists. Maybe the intent was different?
                        // This maintains the original logic.
                        formGroup.classList.add('user-invalid'); 
                    } else {
                        formGroup.classList.remove('user-invalid');
                    }
                }
            },
            valChk: function (_target) {
                const seSlt = typeof _target === 'string' ? document.querySelector(_target) : _target;
                if (!seSlt) return;
                
                const select = seSlt.querySelector('select');
                const fakeSlt = seSlt.querySelector('.btn-fake-slt');
                const fakeSltVal = fakeSlt.querySelector('.value');

                if (!select || !fakeSlt || !fakeSltVal) return;

                if (select.disabled) {
                    fakeSlt.classList.add('disabled');
                } else {
                    fakeSlt.classList.remove('disabled');
                }

                Array.from(select.options).forEach(function (option, index) {
                    if (option.selected && !option.hidden) {
                        fakeSlt.classList.add('selected');
                        fakeSltVal.textContent = option.text;
                    }
                    if (option.selected && option.hidden && index === 0) {
                        fakeSlt.classList.remove('selected');
                        fakeSltVal.textContent = '';
                    }
                });
            }
        };
    })();

    /*
     * event - Delegated Event Listener for change
     */
    document.addEventListener('change', function (e) {
        const select = e.target.closest('[data-stove="select"] select');
        if (select) {
            seSelect.errorChk(select);
        }
    });

});
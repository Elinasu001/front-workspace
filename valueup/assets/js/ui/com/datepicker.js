$(document).ready(function () {
    var datepickerL = {
        init: function () {
            $(".datepicker").datepicker({
                minDate: 0,
                closeText: "닫기",
                prevText: "이전달",
                nextText: "다음달",
                currentText: "오늘",
                monthNames: ["1월", "2월", "3월", "4월", "5월", "6월",
                    "7월", "8월", "9월", "10월", "11월", "12월"
                ],
                monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월",
                    "7월", "8월", "9월", "10월", "11월", "12월"
                ],
                dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
                dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
                dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
                weekHeader: "주",
                dateFormat: "yy.m.d",
                firstDay: 0,
                isRTL: false,
                showMonthAfterYear: true,
                showButtonPanel: true,
                yearSuffix: "년",
                changeMonth: true,
                changeYear: true,
                yearRange: "c-10:c+10",
                showOn: "button",
                buttonText: "날짜 선택",
                beforeShow: function (input, inst) {
                    setTimeout(function () {
                        var $datepicker = $(".ui-datepicker");
                
                        // 열릴 때는 무조건 body에 클래스 추가
                        $("body").addClass("datepicker-open");
                
                        if (window.innerWidth <= 960) {
                            if (!$datepicker.parent().hasClass("datepicker-container")) {
                                $datepicker.wrap("<div class='datepicker-container'></div>");
                            }
                
                            $datepicker.css({
                                position: "fixed",
                                left: "0",
                                bottom: "0",
                                top: "inherit",
                                width: "100%",
                            });
                        }
                
                        // 오늘 날짜 포커스
                        $(".ui-state-highlight").focus();
                    }, 0);
                },
                onClose: function () {
                    var $datepicker = $(".ui-datepicker");
                
                    // 닫힐 때는 무조건 클래스 제거
                    $("body").removeClass("datepicker-open");
                
                    // 감싼 컨테이너도 제거
                    if ($datepicker.parent().hasClass("datepicker-container")) {
                        $datepicker.unwrap();
                    }
                
                    // 포커스 복원
                    $(".datepicker").focus();
                }
            });

            // 버튼 수정
            setTimeout(function () {
                $(".ui-datepicker-trigger").each(function () {
                    $(this)
                        .addClass("ipt-right ico ico-date")
                        .html('<span class="sr-only">날짜 선택</span>');
                });
            }, 100);
        }
    };

    // 리사이징 이벤트: 데이트피커 무조건 닫기 + 상태 초기화
    $(window).on("resize", function () {
        var $datepicker = $(".ui-datepicker");

        // 무조건 닫기
        $.datepicker._hideDatepicker(); // 내부 메서드로 강제 닫기

        // 클래스 제거
        $("body").removeClass("datepicker-open");

        // 스타일 초기화
        $datepicker.css({
            position: "",
            left: "",
            bottom: "",
            top: "",
            width: "",
        });

        // 컨테이너 제거
        if ($datepicker.parent().hasClass("datepicker-container")) {
            $datepicker.unwrap();
        }
    });

    datepickerL.init();
});
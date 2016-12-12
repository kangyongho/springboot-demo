/**
 * Created by NPOST on 2016-12-08.
 */
$(document).ready(function() {
    /* 슬라이더를 움직이는 함수 (기본) */
    function moveSlider(index) {
        // 이미지를 이동합니다.
        var willMoveLeft = -(index * 892);
        $('.slider-image-panel').animate({left: willMoveLeft}, 'slow');
        // 글자를 이동합니다.
        $('.slider-text[data-index='+ index +']').show().animate({
            left: 0
        }, 'slow');
        $('.slider-text[data-index!='+index+']').hide('slow', function() {
            $(this).css('left', -300);
        });
    }
    function moveSliderRes(index) {
        // 이미지를 이동합니다.
        var willMoveLeft = -(index * 353);
        $('.slider-image-panel').animate({left: willMoveLeft}, 'slow');
        // 글자를 이동합니다.
        $('.slider-text[data-index='+ index +']').show().animate({
            left: 0
        }, 'slow');
        $('.slider-text[data-index!='+index+']').hide('slow', function() {
            $(this).css('left', -300);
        });
    }
    // 반응형 대응 (캔버스, 패널, 이미지 사이즈를 고정으로 하면 사이즈 조절이 안된다.)
    var windowWidth = $(window).width();
    // 텍스트 data-index 할당 (위치 파악 목적)
    $('.slider-text').each(function(index) {
        $(this).attr('data-index', index);
    });
    // 컨트롤러 버튼 data-index 할당 (위치 파악 목적)
    $('.control-button').each(function(index) {
        $(this).attr('data-index', index);
    }).click(function() {
        var index = $(this).attr('data-index');
        // 반응형 대응
        if (windowWidth <= 767) {
            moveSliderRes(index);
        }
        else {
            moveSlider(index);
        }
    });
    // 초기 슬라이더 위치 지정
    var initialSlider = 0;
    moveSlider(initialSlider);


    /* ul 리스트 슬라이더 */
    function moveListSlider(index) {
        var willMoveLeft = -(index * 100);
        $('.slider-box > .slider-img-panel').animate({left: willMoveLeft + '%'}, 'slow');
    }
    // 좌우 컨트롤 패널 인덱스 재설정 함수
    function setAngleIndex(index) {
        // 좌우 순서: 2,1 / 0,2 / 1,0
        switch (index) {
            case '0':
                $('.sap-left').attr('data-index', 2);
                $('.sap-right').attr('data-index', 1);
                break;
            case '1':
                $('.sap-left').attr('data-index', 0);
                $('.sap-right').attr('data-index', 2);
                break;
            case '2':
                $('.sap-left').attr('data-index', 1);
                $('.sap-right').attr('data-index', 0);
                break;
        }
    }
    // 위치 파악 인덱스 부여 - 하단
    $('.control-button-2').each(function(index) {
        $(this).attr('data-index', index);
    }).click(function() {
        var index = $(this).attr('data-index');
        moveListSlider(index);
        setAngleIndex(index);
    });
    // 위치 파악 인덱스 부여 - 좌우
    $('.sap-left').attr('data-index', 2).click(function(){
        var index = $(this).attr('data-index');
        moveListSlider(index);
        setAngleIndex(index);
    });
    $('.sap-right').attr('data-index', 1).click(function(){
        var index = $(this).attr('data-index');
        moveListSlider(index);
        setAngleIndex(index);
    });

    /* 터치 이벤트 swipe */
    $('.slider-box-1').slideshow();
    $('.slider-box-2').slideshow();
    $('.slider-box-3').slideshowInfinite();
});
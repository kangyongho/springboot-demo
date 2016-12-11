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
        $('.slider-img-panel').animate({left: willMoveLeft + '%'}, 'slow');
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


    /* 터치 swipe 슬라이더 */
    /*
    * TODO: 리팩토링, 좌우 재설정 함수, 모듈화
     * 전역변수 처리
    */
    function moveListSlider3(index) {
        var willMoveLeft = -(index * 100);
        $('.slider-img-panel-3').animate({left: willMoveLeft + '%'}, 'slow');
    }
    var percent = 0;
    // 좌우 컨트롤 패널 인덱스 재설정 함수
    function setAngleIndex3(index) {
        // 좌우 순서: 2,1 / 0,2 / 1,0
        switch (index) {
            case '0':
                $('.sap-left-3').attr('data-index', 2);
                $('.sap-right-3').attr('data-index', 1);
                percent = 0;
                break;
            case '1':
                $('.sap-left-3').attr('data-index', 0);
                $('.sap-right-3').attr('data-index', 2);
                percent = -100;
                break;
            case '2':
                $('.sap-left-3').attr('data-index', 1);
                $('.sap-right-3').attr('data-index', 0);
                percent = -200;
                break;
        }
    }
    // 위치 파악 인덱스 부여 - 하단
    $('.control-button-3').each(function(index) {
        $(this).attr('data-index', index);
    }).click(function() {
        var index = $(this).attr('data-index');
        moveListSlider3(index);
        setAngleIndex3(index);
    });
    // 위치 파악 인덱스 부여 - 좌우
    $('.sap-left-3').attr('data-index', 2).click(function(){
        var index = $(this).attr('data-index');
        moveListSlider3(index);
        setAngleIndex3(index);
    });
    $('.sap-right-3').attr('data-index', 1).click(function(){
        var index = $(this).attr('data-index');
        moveListSlider3(index);
        setAngleIndex3(index);
    });

    var touchstart_x = 0;
    var touchstart_y = 0;
    var save_x = 0;
    var save_y = 0;
    var move_ds = 0;

    $('.slider-image-panel-li').on('touchstart', function(e){
        var event = e.originalEvent;
        touchstart_x = event.touches[0].pageX;
        touchstart_y = event.touches[0].pageY;
        e.preventDefault();
    });
    // 터치 드래그 하는 동안 DOM 이 따라오게 한다.
    function moveListSlider4(move_ds) {
        $('.slider-img-panel-3').css('left', move_ds+'%');
    }
    $('.slider-image-panel-li').on('touchmove', function(e){
        var event = e.originalEvent;
        var drag_dist = 0;
        var scroll_dist = 0;
        drag_dist = event.touches[0].pageX - touchstart_x;
        scroll_dist = event.touches[0].pageY - touchstart_y;
        move_ds = ( drag_dist / windowWidth ) * 100;
        moveListSlider4(percent+move_ds);

        if ( Math.abs( drag_dist ) > Math.abs( scroll_dist ) ) {
            // ... move slide element
            e.preventDefault( );
        }
        e.preventDefault();
    });
    $('.slider-image-panel-li').on('touchend', function(e){
        if ( Math.abs( move_ds ) > 15 && (move_ds < 0) ) {
            // ... move slide element to Next or Prev slide
            // 오른쪽 이동
            var index = $('.sap-right-3').attr('data-index');
            moveListSlider3(index);
            setAngleIndex3(index);
        } else if ( Math.abs( move_ds ) > 15 && (move_ds > 0) ) {
            // ... move slide element to save_x or save_y position
            // 왼쪽 이동
            var index = $('.sap-left-3').attr('data-index');
            moveListSlider3(index);
            setAngleIndex3(index);
        }

        if( Math.abs( move_ds ) < 15 && (move_ds < 0) ) {
            $('.slider-img-panel-3').animate({left: (percent) + '%'}, 'slow');
        } else if( Math.abs( move_ds ) < 15 && (move_ds > 0) ) {
            $('.slider-img-panel-3').animate({left: (percent) + '%'}, 'slow');
        }
        touchstart_x = 0;
        touchstart_y = 0;
        save_x = 0;
        save_y = 0;
        move_ds = 0;
        e.preventDefault();
    });
});
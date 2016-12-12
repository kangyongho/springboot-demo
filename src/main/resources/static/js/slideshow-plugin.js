/**
 * Created by NPOST on 2016-12-11.
 */
$(document).ready(function(){
    $.fn.slideshow = function (options) {
        /* 터치 swipe 슬라이더 모듈 */
        /*
         * TODO: 리팩토링, 좌우 재설정 함수, 모듈화-4
         * TODO: jQuery extend() 메서드로 옵션 확장하기
         * 전역변수 처리
         * 사용법: slider-box 클래스 속성을 부여하고 slideshow 함수를 호출한다.
         * 기준: slider-box 클래스 이름
         */
        /*
         * 파악할 클래스 요소 - 자손(바로아래), 후손(아래) 선택자 이용
         * 자손 '요소A > 요소B'
         * 후손 '요소A 요소B'
         * .slider-img-panel-4
         * .slider-img-panel-li-4
         * .sap-left-4
         * .control-right
         * .control-button
         * */
        var target = $(this);
        var slider_img_panel = target.children('.slider-img-panel');
        var slider_img = target.find('.slider-img');
        var control_left = target.children('.control-left');
        var control_right = target.children('.control-right');
        var control_button = target.find('.control-button');

        var touchstart_x = 0;
        var touchstart_y = 0;
        var move_ds = 0;
        var percent = 0;
        var windowWidth = $(window).width();

        function moveListSlider(index) {
            var willMoveLeft = -(index * 100);
            slider_img_panel.animate({left: willMoveLeft + '%'}, 'fast');
        }
        // 터치 드래그 하는 동안 DOM 이 따라오게 한다.
        function moveListSlider_1(move_ds) {
            slider_img_panel.css('left', move_ds+'%');
        }

        // 좌우 컨트롤 패널 인덱스 재설정 함수
        function setAngleIndex(index) {
            // 좌우 순서: 2,1 / 0,2 / 1,0
            switch (index) {
                case '0':
                    control_left.attr('data-index', 2);
                    control_right.attr('data-index', 1);
                    percent = 0;
                    break;
                case '1':
                    control_left.attr('data-index', 0);
                    control_right.attr('data-index', 2);
                    percent = -100;
                    break;
                case '2':
                    control_left.attr('data-index', 1);
                    control_right.attr('data-index', 0);
                    percent = -200;
                    break;
            }
        }

        // 위치 파악 인덱스 부여 - 하단
        control_button.each(function(index) {
            $(this).attr('data-index', index);
        }).click(function() {
            var index = $(this).attr('data-index');
            moveListSlider(index);
            setAngleIndex(index);
        });
        // 위치 파악 인덱스 부여 - 좌우
        control_left.attr('data-index', 2).click(function(){
            var index = $(this).attr('data-index');
            moveListSlider(index);
            setAngleIndex(index);
        });
        control_right.attr('data-index', 1).click(function(){
            var index = $(this).attr('data-index');
            moveListSlider(index);
            setAngleIndex(index);
        });


        // 터치 swipe 이벤트
        slider_img.on('touchstart', function(e){
            var event = e.originalEvent;
            touchstart_x = event.touches[0].pageX;
            touchstart_y = event.touches[0].pageY;
            e.preventDefault();
        });
        slider_img.on('touchmove', function(e){
            var event = e.originalEvent;
            var drag_dist = 0;
            var scroll_dist = 0;
            drag_dist = event.touches[0].pageX - touchstart_x;
            scroll_dist = event.touches[0].pageY - touchstart_y;
            move_ds = ( drag_dist / windowWidth ) * 100;
            moveListSlider_1(percent+move_ds);

            if ( Math.abs( drag_dist ) > Math.abs( scroll_dist ) ) {
                // ... move slide element
                e.preventDefault( );
            }
            e.preventDefault();
        });
        slider_img.on('touchend', function(e){
            if ( Math.abs( move_ds ) > 15 && (move_ds < 0) ) {
                // ... move slide element to Next or Prev slide
                // 오른쪽 이동
                var index = control_right.attr('data-index');
                moveListSlider(index);
                setAngleIndex(index);
            } else if ( Math.abs( move_ds ) > 15 && (move_ds > 0) ) {
                // ... move slide element to save_x or save_y position
                // 왼쪽 이동
                var index = control_left.attr('data-index');
                moveListSlider(index);
                setAngleIndex(index);
            }

            if( Math.abs( move_ds ) < 15 && (move_ds < 0) ) {
                slider_img_panel.animate({left: (percent) + '%'}, 'fast');
            } else if( Math.abs( move_ds ) < 15 && (move_ds > 0) ) {
                slider_img_panel.animate({left: (percent) + '%'}, 'fast');
            }
            touchstart_x = 0;
            touchstart_y = 0;
            move_ds = 0;
            e.preventDefault();
        });
    };



    $.fn.slideshowInfinite = function (options) {
        /* 터치 swipe 슬라이더 모듈 (무한 스크롤) */
        /*
        1 2 3 앞뒤로 추가 -> 3 1 2 3 1 로 변경
        마지막 1로 이동한 순간 처음 1로 캔버스를 이동
        처음 3으로 이동한 순간 마지막 3으로 이동
         */
        var target = $(this);
        var slider_img_panel = target.children('.slider-img-panel');
        var slider_img = target.find('.slider-img');
        var control_left = target.children('.control-left');
        var control_right = target.children('.control-right');
        var control_button = target.find('.control-button');
        var touchstart_x = 0;

        var touchstart_y = 0;
        var move_ds = 0;
        var percent = -100;
        var windowWidth = $(window).width();

        // 초기 슬라이드 위치 지정
        slider_img_panel.css('left', -100 + '%');

        function moveListSlider(index) {
            var willMoveLeft = -(index * 100);
            slider_img_panel.animate({left: willMoveLeft + '%'}, 'fast', function(){
                if (index == '4') {
                    slider_img_panel.css('left', -100 + '%');
                } else if (index == '0') {
                    slider_img_panel.css('left', -300 + '%');
                }
            });
        }
        // 터치 드래그 하는 동안 DOM 이 따라오게 한다.
        function moveListSlider_1(move_ds) {
            slider_img_panel.css('left', move_ds+'%');
        }
        // 좌우 컨트롤 패널 인덱스 재설정 함수
        function setAngleIndex(index) {
            // 좌우 순서: 2,1 / 0,2 / 1,0
            // 좌우 순서: 2,4 / 0,2(시작) / 1,3 / 2,4 / 0,2
            switch (index) {
                case '0':
                    control_left.attr('data-index', 2);
                    control_right.attr('data-index', 4);
                    percent = 0; // 터치이벤트에서 쓴다.
                    break;
                case '1':
                    control_left.attr('data-index', 0);
                    control_right.attr('data-index', 2);
                    percent = -100;
                    break;
                case '2':
                    control_left.attr('data-index', 1);
                    control_right.attr('data-index', 3);
                    percent = -200;
                    break;
                case '3':
                    control_left.attr('data-index', 2);
                    control_right.attr('data-index', 4);
                    percent = -300;
                    break;
                case '4':
                    control_left.attr('data-index', 0);
                    control_right.attr('data-index', 2);
                    percent = -400;
                    break;
            }
        }

        // 위치 파악 인덱스 부여 - 하단
        control_button.each(function(index) {
            $(this).attr('data-index', index);
        }).click(function() {
            var index = $(this).attr('data-index');
            moveListSlider(index);
            setAngleIndex(index);
        });
        // 위치 파악 인덱스 부여 - 좌우
        control_left.attr('data-index', 0).click(function(){
            var index = $(this).attr('data-index');
            moveListSlider(index);
            setAngleIndex(index);
        });
        control_right.attr('data-index', 2).click(function(){
            var index = $(this).attr('data-index');
            moveListSlider(index);
            setAngleIndex(index);
        });


        // 터치 swipe 이벤트
        slider_img.on('touchstart', function(e){
            var event = e.originalEvent;
            touchstart_x = event.touches[0].pageX;
            touchstart_y = event.touches[0].pageY;
            e.preventDefault();
        });
        slider_img.on('touchmove', function(e){
            var event = e.originalEvent;
            var drag_dist;
            var scroll_dist;
            drag_dist = event.touches[0].pageX - touchstart_x;
            scroll_dist = event.touches[0].pageY - touchstart_y;
            move_ds = ( drag_dist / windowWidth ) * 100;
            moveListSlider_1(percent+move_ds);

            if ( Math.abs( drag_dist ) > Math.abs( scroll_dist ) ) {
                // ... move slide element
                e.preventDefault( );
            }
            e.preventDefault();
        });
        slider_img.on('touchend', function(e){
            if ( Math.abs( move_ds ) > 15 && (move_ds < 0) ) {
                // 오른쪽 이동
                var index = control_right.attr('data-index');
                setAngleIndex(index);
                moveListSlider(index);
            } else if ( Math.abs( move_ds ) > 15 && (move_ds > 0) ) {
                // 왼쪽 이동
                var index = control_left.attr('data-index');
                setAngleIndex(index);
                moveListSlider(index);
            }
            // 페이지 전환되지 않았을 때 원상복귀
            if( Math.abs( move_ds ) < 15 && (move_ds < 0) ) {
                slider_img_panel.animate({left: (percent) + '%'}, 'fast');
            } else if( Math.abs( move_ds ) < 15 && (move_ds > 0) ) {
                slider_img_panel.animate({left: (percent) + '%'}, 'fast');
            }
            touchstart_x = 0;
            touchstart_y = 0;
            move_ds = 0;
            e.preventDefault();
        });
    };
});

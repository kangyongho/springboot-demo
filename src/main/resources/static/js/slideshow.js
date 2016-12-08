/**
 * Created by NPOST on 2016-12-08.
 */
$(document).ready(function() {
    // 슬라이더를 움직이는 함수
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

    // 반응형 대응 (캔버스, 패널, 이미지 사이즈를 고정으로 하면 제대로 적용할 수 없다)
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

    function autoSlide() {
        initialSlider++;
        if (initialSlider > 2) { initialSlider = 0; }
        setTimeout(moveSlider(initialSlider), 20000);
    }
    //autoSlide();
});
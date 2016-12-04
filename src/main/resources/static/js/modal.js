/**
 * Created by NPOST on 2016-12-03.
 */
$(document).ready(function(){
    function wrapWidowByMask(){
        //화면의 높이와 너비를 구한다.
        var maskHeight = $(document).height();
        var maskWidth = $(window).width();

        //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
        $('#mask').css({'width': maskWidth, 'height': maskHeight});


        //애니메이션 효과
        $('#mask').fadeIn(1000);
        $('#mask').fadeTo("slow", 0.8);

        //popup 위치 지정
        var popup = $('.window');
        var left = ($(window).scrollLeft() + ($(window).width() - popup.width()) / 2);
        var top = ($(window).scrollTop) + ($(window).height() - popup.height() / 2);
        popup.css({'left': left, 'top': top, 'position': 'absolute', 'background-color': '#fff'});

        //팝업 윈도우 띄우기
        $('.window').show();
    }

    //마스크 띄우기
    $('.open-mask').click(function(e){
        //링크 기본동작은 작동하지 않도록 한다.
        e.preventDefault();
        wrapWidowByMask();
    });
    //닫기 버튼을 눌렀을 때
    $('.window .close').click(function(e){
        e.preventDefault();
        $('#mask, .window').hide();
    });
    //검은 막을 눌렀을 때
    $('#mask').click(function(){
        $(this).hide();
        $('.window').hide();
    });
});

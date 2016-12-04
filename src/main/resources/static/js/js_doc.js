/**
 * Created by NPOST on 2016-12-04.
 */
$(document).ready(function(){
    $('button').css('margin-right', '2px');
    function appendText() {
        $('.cbi-text').html('텍스트가 추가되었습니다.');
        //$('.cbi-text').text('텍스트가 추가되었습니다.');
    }
    function changeColor() {
        $('.item').css('color', 'orange');
        $('.item, .select').css('background-color', 'red');
    }
    function appendClass() {
        $('h2').addClass(function (index) {
           return 'class' + index;
        });
    }
    function removeDocument() {
        $('.remove-target').remove();
        //$('.remove-target').empty();
    }
    function appendHtml() {
        $('<a></a>').html('Hello World').appendTo('.append-html-here');
    }
    $('#change-color').click(function(){
        changeColor();
    });
    $('#append-text').click(function(){
       appendText();
    });
    $('#append-class').click(function(){
        appendClass();
    });
    $('#remove').click(function(){
        removeDocument();
    });
    $('#append-html').click(function() {
        appendHtml();
    });
});
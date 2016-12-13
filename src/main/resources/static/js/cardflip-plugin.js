/**
 * Created by NPOST on 2016-12-13.
 */
$(document).ready(function(){
    $.fn.singleCardflip = function(){
        var target = $(this);
        var card_flip = target.children('.card-flip-basic');

        var flag = 0;
        card_flip.click(function(){
            if (flag == 0) {
                card_flip.css('transform', 'perspective(600px) rotateY(-180deg)');
                flag = 1;
            } else {
                card_flip.css('transform', 'perspective(600px) rotateY(0deg)');
                flag = 0;
            }
        });
    }

    $.fn.cardflip = function(){
        var target = $(this);
        var flip_button = target.find('.flip-button');
        var card_back = target.find('.card-back');
        var card_front = target.find('.card-front');

        var flag = 0;
        flip_button.click(function(){
            if (flag == 0) {
                card_back.css('transform', 'perspective(600px) rotateY(0deg)');
                card_front.css('transform', 'perspective(600px) rotateY(-180deg)');
                flag = 1;
            } else {
                card_back.css('transform', 'perspective(600px) rotateY(180deg)');
                card_front.css('transform', 'perspective(600px) rotateY(0deg)');
                flag = 0;
            }
        });
    }

    $('.card-flip-box-basic').singleCardflip();
    $('.card-flip-box').cardflip();
    $('.card-flip-box-2').cardflip();
});
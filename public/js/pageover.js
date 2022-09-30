function pageoverHeight() {
    var h = $('.pageover-full-screen .pageover-container').height() - 20;
    if ($('.pageover-full-screen .pageover-title').length) {
        h -= $('.pageover-full-screen .pageover-title').height() - 2;
    }
    if ($('.pageover-full-screen .pageover-footer').length) {
        h -= $('.pageover-full-screen .pageover-footer').height() - 2;
    }
    $('.pageover-full-screen .pageover-body').height(h);
}
$(window).resize(function () {
    pageoverHeight();
});
$.fn.extend({
    pageover: function (prop) {
        if (prop == 'show') {
            $(this).show();
            if ($(this).hasClass('pageover-full-screen')) {
                pageoverHeight();
            }
        }
        if (prop == 'hide') {
            $(this).hide();
        }
    }
});
$('body').on('click','[pageover-open]',function(){
    $('#'+$(this).attr('pageover-open')).pageover('show');
});
$('body').on('click','[pageover-close]',function(){
    $('#'+$(this).attr('pageover-close')).pageover('hide');
});
$('.pageover').each(function(){
    var backdrop=$(this).find('.pageover-backbrop').length?$(this).find('.pageover-backbrop'):$('<div class="pageover-backbrop"></div>');
    var container=$(this).find('.pageover-container').length?$(this).find('.pageover-container'):$('<div class="pageover-container"></div>');
    var contents=$(this).find('.pageover-container').length?$(this).find('.pageover-container').html():$(this).html();
    $(this).html(backdrop);
    $(this).append(container);
    $(container).html(contents);
    var pageover=this;
    $(this).find('.close-pageover').click(function(){
        $(pageover).pageover('hide');
    });
});
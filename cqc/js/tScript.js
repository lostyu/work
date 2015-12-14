//checked box
var _tCheck=$('.t-check');
_tCheck.click(function(){
    $(this).toggleClass('t-checked');
});

//radio box
var _tRadio=$('.t-radio');
_tRadio.on('click mousedown',function(){
    $(this).addClass('t-radio-on').parent().siblings().find('.t-radio').removeClass('t-radio-on');
});
//协议
$('.t-agree').click(function(){
    $(this).toggleClass('select');
});

//自动估值
/*$('.t-autoVal').click(function(){

});*/


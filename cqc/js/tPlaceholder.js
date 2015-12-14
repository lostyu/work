$(function(){
    //判断浏览器是否支持placeholder属性
    supportPlaceholder='placeholder'in document.createElement('input'),
        placeholder=function(input){
            var text = input.attr('placeholder'),
                defaultValue = input.defaultValue;
            if(!defaultValue){
                input.val(text).css("color",'#939a9a');
            }
            input.focus(function(){
                if(input.val() == text){
                    $(this).val("");
                }
            });
            input.blur(function(){
                if(input.val() == ""){
                    $(this).val(text).css("color",'#939a9a');
                }
            });
            //输入的字符不为灰色
            input.keydown(function(){
                $(this).css("color",'#616161');
            });
        };
    //当浏览器不支持placeholder属性时，调用placeholder函数
    if(!supportPlaceholder){
        $('input').each(function(){
            text = $(this).attr("placeholder");
            if($(this).attr("type") == "text"){
                placeholder($(this));
            }
        });
    }
});
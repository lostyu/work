/**
 * Created by colin on 2015/10/12.
 */

(function(){

    $(".t-form-input").focus(function(){
        $(this).parent().css("borderColor","#349aff");
    }).blur(function(){
        $(this).parent().css("borderColor","#d0d0d0");
    });

    $(".t-textarea textarea").focus(function(){
        $(this).parent().css("borderColor","#349aff");
    }).blur(function(){
        $(this).parent().css("borderColor","#d0d0d0");
    });

    $(".d-input,.d-textarea").focus(function(){
        $(this).css("borderColor","#349aff");
    }).blur(function(){
        $(this).css("borderColor","#d0d0d0");
    });


    //



    $(".y-rg-textarea").focus(function(){
        $(this).css("borderColor","#349aff");
    }).blur(function(){
        $(this).css("borderColor","#d0d0d0");
    });

    //返回顶部
    $("#backTop").on("click",move);

    var _top_btn = $(".toolbar");

    $(window).on("scroll",function(){
        check(300);
    });
    function move(){
        $("html,body").stop().animate({
            scrollTop:0
        },300);
    };
    function check(pos){
        if($(window).scrollTop() > pos){
            $("#backTop").fadeIn();
        }
        else{
            $("#backTop").fadeOut();
        }
    };
    //返回顶部判断
    $(window).on("scroll",function(){
        var htop = $(window).scrollTop();
        var ph = $(window).height();
        var dh = document.body.scrollHeight;
        var scroll_top = dh - htop - ph;
        if (scroll_top <= 261) {
            _top_btn.css("bottom", 387 - scroll_top);
        } else {
            _top_btn.css("bottom", 26);
        }
    })

    //搜索框
    $(".serarch_input").focus(function(){
        $(this).siblings(".sign").hide();
        $(this).parent(".serarch").css("borderColor","#349aff");
        if ($(this).val() == this.defaultValue) {
            $(this).val("");
        }
    }).blur(function(){
        $(this).siblings(".sign").show();
        $(this).parent(".serarch").css("borderColor","#dadada")
        if ($(this).val() == '') {
            $(this).val(this.defaultValue);
        }
    });

})();


/**
 * 验证表单
 */

//是否为中文
function isCn(cn){
    var chinese = /^[\u4E00-\u9FFF]{2,4}$/;
    return(chinese.test(cn));
}

//验证手机号码
function isMobile(str) {
    if (str.toString().length != 11)
        return false;
    var prefix = [130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 147, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189];
    var re = new RegExp("^(" + prefix.join("|") + ")\\d+$");
    return re.test(str);
}

//验证数字
function isNum1(obj){
    //非负整数、小数
    var isNum = /^([1-9]\d*|0)(\.\d{2})?$/;
    return(isNum.test(obj));
}

function isNum2(obj){
    //正浮点数
    var isNum = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([1-9]*[1-9][0-9]*))$/;
    return(isNum.test(obj));
}

//是否为身份证
function isSf(sf){
    var isIDCard1=/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;//(15位)
    var isIDCard2=/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;//(18位)
    return(isIDCard1.test(sf) || isIDCard2.test(sf));
}

//是否为数字
function isSz(obj){
    var sz = /^[0-9]*$/;
    return(sz.test(obj));
}

//验证邮箱
function isYx(yx){
    var reyx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    /*var reyx = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;*/
    return(reyx.test(yx));
}

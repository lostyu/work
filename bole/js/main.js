$(function () {
    // 首页
    main.ui.pageScroll();
    main.ui.tabs($('.j-tab-nav1 li'), $('.j-tab-panel1 .panel'));
    main.ui.navHover($('.j-nav'));

    // 首页动画
    (function() {
        var $animateBox = $('.j-animate');
        var $bg = $animateBox.find('.bg');
        var $logo = $animateBox.find('.logo');
        var $prog = $animateBox.find('.prog');
        var $line = $animateBox.find('.line');
        var $list = $('.j-lista');
        var $a1 = $('.j-a1');
        var timer = null;
        var $aImg = $('img');
        var arr = [];

//        setTimeout(function() {
//            $logo.fadeIn();
//            $prog.fadeIn().addClass('zoom');
//            $line.animate({width: '100%'}, 2000, function() {
//                $bg.fadeIn().addClass('zoom');
//
//
//                setTimeout(function() {
//                    $bg.fadeOut(function() {
//                        $(this).remove();
//                    });
//                    $animateBox.css('background', 'none');
//
//                    $line.animate({width: 0}, 1200, function() {
//                        $logo.css('visibility', 'hidden');
//                    });
//                    $prog.addClass('zoom2');
//                }, 1000);
//
//
//            });
//        }, 500);

        function init(){
            $list.hide();
            $a1.hide();

            setTimeout(function() {
                $logo.fadeIn();
                $prog.fadeIn().addClass('zoom');

//                timer = setInterval(function() {
//                    console.log(checkAll());
//                }, 10);

            }, 500);
        }
        init();

        function checkLoad() {
            $aImg.each(function(index, elem) {
                elem.onload = function() {
                    elem.loaded = true;
                    arr.push(index);
                }
            });
        }

        function checkAll() {
            return arr.length;
        }


    })();

    // 表单验证
    (function() {
        var $login = $('#login');
        if($login.length <= 0) return;
        var elements = $('#login').get(0).elements;
        var $uname = $('#uname');
        var $upass = $('#upass');
        var $btn = $('.j-btnLogin');
        var $tips = $login.find('.tips');
        var binput = false;
        var timer = null;
        var valid1 = false;

        $btn.click(function() {
            binput = true;
            if(check() && valid1){
                $login.submit();
            }
        });

        for(var i=0;i<elements.length;i++){

            elements[i].onkeyup = function() {
                if(binput){
                    check();
                }
            }
        }

        $uname.on('keyup', function() {
            var $this = $(this);

            clearTimeout(timer);
            timer = setTimeout(function() {
                $.ajax({
                    url: $this.attr('data-url'),
                    data: $this.val(),
                    success: function(str) {
                        valid1 = true;
                    },
                    error: function() {
                        $tips.show().html('该帐号不存在，请注册');
                    }
                })
            }, 300);
        });

        function check() {
            var valid = true;

            $tips.hide();
            $uname.parent().removeClass().addClass('succ');
            $upass.parent().removeClass().addClass('succ');

            if(!$.trim($uname.val()).length > 0 && !$.trim($uname.val()) != ''){
                $uname.parent().addClass('err');
                $tips.show().html('请输入账号！');
                valid = false;
            }
            if( !$.trim($upass.val()).length > 0 && !$.trim($upass.val()) != '' ){
                $upass.parent().addClass('err');
                $tips.show().html('请输入密码！');
                valid = false;
            }

            return valid;
        }

    })();

    (function() {
        var $reget = $('#reget');
        if($reget.length <= 0) return;
        var elements = $('#reget').get(0).elements;
        var $uphone = $('#uphone');
        var $uyzm = $('#uyzm');
        var $unpass = $('#unpass');
        var $btn = $('.j-btnsave');
        var $tips = $reget.find('.tips');
        var binput = false;

        $btn.click(function() {
            binput = true;
            if(check()){
                $reget.submit();
            }
        });

        for(var i=0;i<elements.length;i++){

            elements[i].onkeyup = function() {
                if(binput){
                    check();
                }
            }
        }


        function check() {
            var valid = true;
            var _val1 = $.trim($uphone.val());
            var _val2 = $.trim($uyzm.val());
            var _val3 = $.trim($unpass.val());
            var reg3 = /^(?![^a-zA-Z]+$)(?!\D+$).{8,15}$/;

            $tips.hide();
            if( !_val3.length > 0 && !_val3 != '' ){
                $tips.show().html('请输入密码！');
                valid = false;
            }else if(!reg3.test(_val3)){
                $tips.show().html('8-20位，必须含字母+数字');
                valid = false;
            }

            if( !_val2.length > 0 && !_val2 != ''){
                $tips.show().html('请输入验证码！');
                valid = false;
            }

            if(!_val1.length > 0 && !_val1 != ''){
                $tips.show().html('手机号码不能为空！');
                valid = false;
            }else if(!main.tool.check.isMobile(_val1)){
                $tips.show().html('请输入正确的手机号码！');
                valid = false;
            }

            return valid;
        }

    })();

    (function() {
        var $reget = $('#reget2');
        if($reget.length <= 0) return;
        var elements = $('#reget2').get(0).elements;
        var $uphone = $('#uphone2');
        var $uyzm = $('#uyzm2');
        var $unpass = $('#unpass2');
        var $btn = $('.j-btnzc');
        var $tips = $reget.find('.tips');
        var binput = false;

        $btn.click(function() {
            binput = true;
            if(check()){
                $reget.submit();
            }
        });

        for(var i=0;i<elements.length;i++){

            elements[i].onkeyup = function() {
                if(binput){
                    check();
                }
            }
        }


        function check() {
            var valid = true;
            var _val1 = $.trim($uphone.val());
            var _val2 = $.trim($uyzm.val());
            var _val3 = $.trim($unpass.val());
            var reg3 = /^(?![^a-zA-Z]+$)(?!\D+$).{8,15}$/;

            $tips.hide();
            if( !_val3.length > 0 && !_val3 != '' ){
                $tips.show().html('请输入密码！');
                valid = false;
            }else if(!reg3.test(_val3)){
                $tips.show().html('8-20位，必须含字母+数字');
                valid = false;
            }

            if( !_val2.length > 0 && !_val2 != ''){
                $tips.show().html('请输入验证码！');
                valid = false;
            }

            if(!_val1.length > 0 && !_val1 != ''){
                $tips.show().html('手机号码不能为空！');
                valid = false;
            }else if(!main.tool.check.isMobile(_val1)){
                $tips.show().html('请输入正确的手机号码！');
                valid = false;
            }

            return valid;
        }

    })();

    (function() {
        var $rzform = $('#rzform');
        if($rzform.length <= 0) return;
        var $lxr = $('#rzform-lxr');
        var $tel = $('#rzform-tel');
        var $mail = $('#rzform-mail');
        var $jj = $('#rzform-jj');
        var $file = $('#rzform-file');
        var $btn = $rzform.find('.j-rzform-btn');
        var $err = $rzform.find('p.error');

        $btn.click(function() {
            if(check()){
                alert();
            }
        });

        function check() {
            var valid = true;
            var _val1 = $.trim($lxr.val());
            var _val2 = $.trim($tel.val());
            var _val3 = $.trim($mail.val());
            var _val4 = $.trim($jj.val());
            var _val5 = $.trim($file.val());

            $err.hide();
            if(!_val1.length > 0 && !_val1 != ''){
                $lxr.next('.error').show().html('请输入联系人!');
                valid = false;
            }

            if(!_val2.length > 0 && !_val2 != ''){
                $tel.next('.error').show().html('手机号码不能为空!');
                valid = false;
            }else if(!main.tool.check.isMobile(_val2)){
                $tel.next('.error').show().html('请输入正确的手机号码!');
                valid = false;
            }

            if(!_val3.length > 0 && !_val3 != ''){
                $mail.next('.error').show().html('邮箱不能为空!');
                valid = false;
            }else if(!main.tool.check.isMail(_val3)){
                $mail.next('.error').show().html('邮箱格式错误!');
            }

            if(!_val4.length > 0 && !_val4 != ''){
                $jj.next('.error').show().html('入驻企业的情况或项目介绍!');
                valid = false;
            }

            if(!_val5.length > 0 && !_val5 != ''){
                $file.next('.error').show().html('上传项目相关的文档!');
                valid = false;
            }

            return valid;
        }
    })();

    $('.j-popBtnWeixin').click(function() {
        main.ui.loginPop().showLoginWeixin();
    });
    $('.j-popBtnZhanghao').click(function() {
        main.ui.loginPop().showLoginZhanghao();
    });
    $('.j-popBtnZhaohui').click(function() {
        main.ui.loginPop().showLoginZhaohui();
    });
    $('.j-popBtnZhuce').click(function() {
        main.ui.loginPop().showLoginZhuce();
    });
    $('.m-layout').click(function() {
        $(this).fadeOut();
        $('.j-rzform').fadeOut();
        main.ui.loginPop().hidePop();
    });


    // 园区企业
    main.ui.card($('.j-card'));


    // 孵化园
    $('.j-btnruzhu').on('click', function(){
        $('.m-layout').fadeIn();
        $('.j-rzform').fadeIn();
        $('#rzform')[0].reset();
        $('#rzform').find('p.error').hide();
    });
});

var main = {};

main.tool = {};
main.tool.check = {
    isMobile: function(str) {
        if (str.toString().length != 11) return false;
        var prefix = [130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 147, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189];
        var re = new RegExp("^(" + prefix.join("|") + ")\\d+$");
        return re.test(str);
    },
    isMail: function (yx) {
        var reyx = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return(reyx.test(yx));
    }
};


main.ui = {};
main.ui.pageScroll = function () {
    var $hd = $('.j-hd');
    var $window = $(window);
    var $navSdLi = $('.j-navSd li');
    var $body = $('body, html');

    $window.scroll(function () {
        var _top = $(this).scrollTop();

        if (_top <= 50) {
            $hd.stop().fadeOut();
        }
        if (_top > 50) {
            $hd.stop().fadeIn();
        }

        if (_top < 950) {
            $navSdLi.removeClass('z-crt');
            $navSdLi.eq(0).addClass('z-crt');
        }
        if (_top >= 950 && _top < 1863) {
            $navSdLi.removeClass('z-crt');
            $navSdLi.eq(1).addClass('z-crt');
        }
        if (_top >= 1863 && _top < 2849) {
            $navSdLi.removeClass('z-crt');
            $navSdLi.eq(2).addClass('z-crt');
        }
        if (_top >= 2849) {
            $navSdLi.removeClass('z-crt');
            $navSdLi.eq(3).addClass('z-crt');
        }
    });

    $navSdLi.click(function () {
        var $this = $(this);
        var _index = $this.index();

        if (_index == 0) {
            $body.animate({scrollTop: 0}, 500, function () {
                $navSdLi.removeClass('z-crt');
                $this.addClass('z-crt');
            });
        }
        if (_index == 1) {
            $body.animate({scrollTop: 950}, 500, function () {
                $navSdLi.removeClass('z-crt');
                $this.addClass('z-crt');
            });
        }
        if (_index == 2) {
            $body.animate({scrollTop: 1863}, 500, function () {
                $navSdLi.removeClass('z-crt');
                $this.addClass('z-crt');
            });
        }
        if (_index == 3) {
            $body.animate({scrollTop: 2849}, 500, function () {
                $navSdLi.removeClass('z-crt');
                $this.addClass('z-crt');
            });
        }
    });


};
main.ui.tabs = function(objTabNav, objTabPanel, type) {
    type = type || 'click';
    objTabNav.on(type, function() {
        var index = $(this).index();

        objTabNav.removeClass('z-crt');
        $(this).addClass('z-crt');
        objTabPanel.hide().eq(index).show();
    });
};
/**
 * 幻灯片
 * @param $obj  幻灯片父容器
 * @param aData 数据[{imgUrl:xxx, href:xxx, bgc:xxx}]
 */
main.ui.slide = function($obj, aData) {
    var $prev = $obj.find('.prev');
    var $next = $obj.find('.next');
    var $listWp = $obj.find('.pic');
    var $list = null;
    var $navWp = $obj.find('.nav');
    var $nav = null;
    var current = 0;
    var arrBg = [];
    var timer = null;

    function init(){
        var str = '';
        var strNav = '';
        for(var i=0;i<aData.length;i++){
            str += '<li style="display: none;"><a href="'+ aData[i]['href'] +'"><img width="1130" height="300" src="'+aData[i]['imgUrl']+'" alt=""/></a></li>';
            arrBg.push(aData[i]['bgc']);
            strNav += '<li></li>';
        }
        $listWp.html(str);
        $navWp.html(strNav);

        $list = $obj.find('.pic li');
        $list.eq(current).show();

        $nav = $obj.find('.nav li');
        $nav.eq(current).addClass('z-crt');

        $obj.css('backgroundColor',  arrBg[current]);
    }
    init();

    function tab() {
        $nav.removeClass('z-crt');
        $list.stop().fadeOut();
        $list.eq(current).stop().fadeIn();
        $nav.eq(current).addClass('z-crt');
        $obj.css('backgroundColor',  arrBg[current]);
    }

    timer = setInterval(function() {
        current++;
        current%=aData.length;
        tab();
    }, 5000);

    $obj.hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(function() {
            current++;
            current%=aData.length;
            tab();
        }, 5000);
    });

    $next.click(function() {
        current++;
        current%=aData.length;
        tab();
    });

    $prev.click(function() {
        current--;
        if(current < 0){
            current = aData.length-1;
        }
        tab();
    });

    $nav.click(function() {
        current = $(this).index();
        tab();
    });
};
main.ui.card = function($obj) {
    var $aLi = $obj.find('li');
    var current = $aLi.length - 1;

    function init() {
        $aLi.each(function(index, elem) {
            $(this).css({
                left: index*212,
                zIndex: index+1
            });
        });

        $aLi.mouseover(function() {
            var $this = $(this);
            current = $this.index();

            $aLi.each(function(index, elem) {
                if(index > current){
                    $(elem).stop().animate({'left': index*212+282});
                }else{
                    $(elem).stop().animate({'left': index*212});
                }
            });
        });
    }
    init();
};
main.ui.navHover = function($obj) {
    var $line = $obj.find('.line');
    var $aLi = $obj.find('li');
    var current;

    $aLi.hover(function() {
        $line.show();
        if(!current){
            current = $(this).index();
            $line.css('left', current * 137+26);
        }else{
            current = $(this).index();
            $line.stop().animate({left: current * 137+26});
        }



    }, function() {
        $line.hide();
    });
};
main.ui.loginPop = function() {
    var $mask = $('.m-layout');
    var $loginPop = $('.j-loginPop');
    var $weixin = $loginPop.find('.j-weixinBox');
    var $zhanghao = $loginPop.find('.j-zhanghaoBox');
    var $zhaohui = $loginPop.find('.j-zhaohuiBox');
    var $zhuce = $loginPop.find('.j-zhuceBox');
    var $box = $loginPop.find('.j-popBox');

    function showLoginWeixin() {
        showMask();
        $box.hide();
        $weixin.show();
        $loginPop.fadeIn();
    }
    function showLoginZhanghao() {
        showMask();
        $box.hide();
        $zhanghao.show();
        $loginPop.fadeIn();
    }
    function showLoginZhaohui() {
        showMask();
        $box.hide();
        $zhaohui.show();
        $loginPop.fadeIn();
    }
    function showLoginZhuce() {
        showMask();
        $box.hide();
        $zhuce.show();
        $loginPop.fadeIn();
    }

    function showMask() {
        $mask.fadeIn();
    }
    function hideMask() {
        $mask.fadeOut();
    }
    function hidePop() {
        $loginPop.fadeOut();
    }

    return {
        showLoginWeixin: showLoginWeixin,
        showLoginZhanghao: showLoginZhanghao,
        showLoginZhaohui: showLoginZhaohui,
        showLoginZhuce: showLoginZhuce,
        showMask: showMask,
        hideMask: hideMask,
        hidePop: hidePop
    }
};

main.app = {};

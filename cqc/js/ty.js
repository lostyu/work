$(function() {
    var $maxLBox = $('.j-maxLen textarea');

    for(var i=0;i<$maxLBox.length;i++){
        cqc.ui.textMaxLength($maxLBox.eq(i));
    }

});
var cqc = {};

cqc.validate = {
    required: {
        msg: '该项为必填',
        test: function(obj) {
            return obj.val().length > 0;
        }
    }
};

cqc.ui = {};
cqc.ui.tabs = function(objTabNav, objTabPanel, type) {
    type = type || 'click';
    objTabNav.on(type, function() {
        var index = $(this).index();

        objTabNav.removeClass('active');
        $(this).addClass('active');
        objTabPanel.hide().eq(index).show();
    });
};
cqc.ui.scroll = function(obj) {
    obj[0].innerHTML += obj[0].innerHTML;
    var child = obj.children(),
        len = child.length,
        h = child.height(),
        timer = null,
        iNow = 0;


    timer = setInterval(function() {
        iNow++;
        obj.animate({top: -h*iNow+'px'}, function() {
            if(iNow == len-1){
                iNow = 0;
                obj.css('top', 0);
            }
        });
    }, 10000);
};
cqc.ui.textMaxLength = function(obj) {
    var $parent = obj.parent();
    var maxLen = obj.attr('maxlength');
    var count = 0;
    var $span = $('<span>');

    $span.html(count+'/'+maxLen);
    $parent.append($span);

    obj[0].oninput = function() {
        $span.html($(this).val().length+'/'+maxLen);
    };


};
cqc.ui.layout = function() {
    var $overlay = $('<div class="m-overlay"></div>');
    var defaults = {
        opacity: 0.7,
        click2close: false,
        handler4close: null
    };

    var show = function(cfg) {
        $('html').css('overflow', 'hidden');
        cfg = $.extend({}, defaults, cfg);
        $('body').append($overlay);

        $overlay.bind('hide', function() {
            if (cfg.handler4close) {
                cfg.handler4close();
            }
        });

        if (cfg.click2close) {
            $overlay.bind('click', function() {
                hide();
            });
        }
    };

    var hide = function() {
        $overlay.trigger('hide');
        $overlay.unbind();
        $overlay.remove();
    };

    return {
        show: show,
        hide: hide
    };
};


cqc.app = {};
// 首页
cqc.app.index = function() {

    (function() {
        $(".d-fw-l").on("mouseenter", function() {
            $(".d-fw-tc1").fadeIn();
        });
        $(".d-fw-r").on("mouseenter", function() {
            $(".d-fw-tc2").fadeIn();
        });
        $(".d-fw-tc").on("mouseleave", function() {
            $(this).fadeOut();
        });
    })();

    (function() {
        var $tabsnav1 = $('#tabs-nav1 > .item');
        var $tabspanel1 = $('#tabs-panel1 > .tab-panel');
        var $tabsnav2 = $('#tabs-nav2 > h2');
        var $tabspanel2 = $('#tabs-panel2 > .item');

        cqc.ui.tabs($tabsnav1, $tabspanel1, 'mouseover');
        cqc.ui.tabs($tabsnav2, $tabspanel2, 'mouseover');
    })();

    (function() {
        var $scroll1 = $('#scroll1');
        cqc.ui.scroll($scroll1);
    })();
};
// 个人主页
cqc.app.grzy = function() {
    var $tabsnav3 = $('#tabs-nav3 > h2'),
        $tabspanel3 = $('#tabs-panel3 > ul');

    cqc.ui.tabs($tabsnav3, $tabspanel3, 'mouseover');

    var $alListBox = $('#alListBox'),
        $alList = $('.alList'),
        oldH = $alListBox.height(),
        h = $alList.height(),
        bClick = false;

    $('#btn-alToggle').click(function() {
        if(bClick){
            $alListBox.animate({'height': oldH});
            $(this).text('展开');
        }else{
            $alListBox.animate({'height': h});
            $(this).text('收起');
        }
        bClick = !bClick;
    });

    $(document).on('click', '.j-grxx .close', function() {
        $(this).parent().remove();
    });

    // 个人信息表单
    (function() {
        $('#form-grzy1 input, #form-grzy1 textarea').focus(function() {
            layer.closeAll();
        });

        $('.checkboxList input').change(function(){
            checkSelect();
        });

        function checkSelect(){

            var count = 0;
            $('.checkboxList input').each(function() {
                this.disabled = false;
                if(this.checked){
                    count++;
                }
            });

            if(count >= 3){
                $('.checkboxList input').each(function() {
                    if (this.checked) {
                        this.disabled = false;
                    }else{
                        this.disabled = true;
                    }
                });
            }
        }

        $('#btn-form-grzy1').click(function(ev) {
            ev.preventDefault();

            if(check()){
                $('#form-grzy1').submit();
            }
        });

        function check(){
            var valid = true;
            var $ipt1 = $('.ipt-1');    //真实姓名
            var $ipt2 = $('.ipt-2');    //个人简历

            if(!cqc.validate.required.test($ipt1)){
                layer.tips(cqc.validate.required.msg, $ipt1, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }

            if(!cqc.validate.required.test($ipt2)){
                layer.tips(cqc.validate.required.msg, $ipt2, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }
            return true;
        }
    })();

    // 创业经历表单
    (function() {


        $('#btn-form-cyjl').click(function(ev) {
            ev.preventDefault();

            if(check()){
                $('#form-cyjl').submit();
            }
        });

        function check(){
            var valid = true;
            var $ipt1 = $('.ipt-gsjc');
            var $ipt2 = $('.ipt-zw');
            var $ipt3 = $('.ipt-nian1');
            var $ipt4 = $('.ipt-yue1');
            var $ipt5 = $('.ipt-nian2');
            var $ipt6 = $('.ipt-yue2');

            if(!cqc.validate.required.test($ipt1)){
                layer.tips(cqc.validate.required.msg, $ipt1, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }

            if(!cqc.validate.required.test($ipt2)){
                layer.tips(cqc.validate.required.msg, $ipt2, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }

            if(!cqc.validate.required.test($ipt3)){
                layer.tips(cqc.validate.required.msg, $ipt3, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }
            if(!cqc.validate.required.test($ipt4)){
                layer.tips(cqc.validate.required.msg, $ipt4, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }
            if(!cqc.validate.required.test($ipt5)){
                layer.tips(cqc.validate.required.msg, $ipt5, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }
            if(!cqc.validate.required.test($ipt6)){
                layer.tips(cqc.validate.required.msg, $ipt6, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }
            return true;
        }
    })();

    // 工作经历表单
    (function() {

        $('#btn-form-gzjl').click(function(ev) {
            ev.preventDefault();

            if(check()){
                $('#form-gzjl').submit();
            }
        });

        function check(){
            var valid = true;
            var $ipt1 = $('.ipt-g1');
            var $ipt2 = $('.ipt-g2');
            var $ipt3 = $('.ipt-g3');
            var $ipt4 = $('.ipt-g4');
            var $ipt5 = $('.ipt-g5');
            var $ipt6 = $('.ipt-g6');

            if(!cqc.validate.required.test($ipt1)){
                layer.tips(cqc.validate.required.msg, $ipt1, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }

            if(!cqc.validate.required.test($ipt2)){
                layer.tips(cqc.validate.required.msg, $ipt2, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }

            if(!cqc.validate.required.test($ipt3)){
                layer.tips(cqc.validate.required.msg, $ipt3, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }
            if(!cqc.validate.required.test($ipt4)){
                layer.tips(cqc.validate.required.msg, $ipt4, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }
            if(!cqc.validate.required.test($ipt5)){
                layer.tips(cqc.validate.required.msg, $ipt5, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }
            if(!cqc.validate.required.test($ipt6)){
                layer.tips(cqc.validate.required.msg, $ipt6, {
                    tips: [1, 'Red'],
                    time: 3000
                });
                valid = false;
                return false;
            }
            return true;
        }
    })();

};
// 创业者
cqc.app.cyz = function() {


    $('.j-cyz').mouseover(function() {
        var $this = $(this);
        var $act = $this.find('.active');
        $act.stop().animate({'opacity': 1});
    });

    $('.j-cyz').mouseout(function() {
        var $this = $(this);
        var $act = $this.find('.active');
        $act.stop().animate({'opacity': 0});
    });


};



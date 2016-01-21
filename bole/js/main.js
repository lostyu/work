$(function () {

});

var main = {};

main.ui = {};
main.ui.pageScroll = function () {
    var $hd = $('.m-hd');
    var $window = $(window);
    var $navSdLi = $('.m-navSd li');
    var $body = $('body, html');

    $window.scroll(function () {
        var _top = $(this).scrollTop();
        console.log(_top);

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

main.app = {};
main.app.index = function() {
    main.ui.pageScroll();
    main.ui.tabs($('.j-tab-nav1 li'), $('.j-tab-panel1 .panel'));
};

$(function () {
    main.app.index();
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

main.app = {};
main.app.index = function() {
    main.ui.pageScroll();
    main.ui.tabs($('.j-tab-nav1 li'), $('.j-tab-panel1 .panel'));



};

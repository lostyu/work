$(function(){
    main.ui.toggleFt();


    var aStarBox = $('.j-m-star');
    for(var i=0;i<aStarBox.length;i++){
        main.ui.star(aStarBox.eq(i), 5);
    }
});


var main = {};

main.tool = {};


main.ui = {};
main.ui.toggleFt = function() {
    var $toggle = $('.j-mapInfo .toggle'),
        $inner = $('.j-mapInfo .inner');

    $toggle.click(function() {
        $(this).toggleClass('active');
        $inner.toggleClass('active');
    });
};

/**
 * 星级评分
 * @param objStar   父容器
 * @param defNum    默认星级
 */
main.ui.star = function(objStar, defNum) {
    var aStar = objStar.find('a');

    aStar.each(function(index, elem) {
        elem.index = index;
        if(index < defNum){
            $(elem).addClass('active');
        }
    });

    aStar.on('click', function() {
        var _index = $(this).get(0).index;

        aStar.each(function(index, elem) {
            $(elem).removeClass('active');
        });
        aStar.each(function(index, elem) {
            if(index <= _index){
                $(elem).addClass('active');
            }
        });
    });
};
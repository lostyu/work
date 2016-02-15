$(function(){
    main.ui.toggleFt();
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
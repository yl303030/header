$(".header_menu").click(function() {
    if($(window).width() < 992) {
        $(".nav-common").fadeToggle(300);
    }
})

$(".header_more_trigger").click(function() {
    $(".header_more_list").fadeToggle(300);
})

$(document).click(function (event) {
    var headerMore = $(".header_more");
    if (!headerMore.is(event.target) && headerMore.has(event.target).length === 0) {
        $(".header_more_list").fadeOut(300);
    }
});
// menu
$(".header .header_menu").click(function(){
    $(this).toggleClass("active");
    $(".header_link").toggleClass("active");
})

$(".back_header .header_menu").click(function(){
    $(this).toggleClass("active");
    $(".back_header_nav").toggleClass("active");
})


// popup
$(".popup_close, .popup_bg").click(function(){
    $(this).parents(".popup").fadeOut(300);
})

$(".btn-popup").click(function(){
    let popup = $(this).data("popup");
    $(popup).fadeIn(300);
})

// popup選擇
let selectTotal = 0;
$(".popup_select_secondLayer_item").click(function(){
    if($(this).parents(".popup").hasClass("popup-resumeJob")) {
        let selectedText = $(this).find("span").text();
        $(this).parents(".popup_select_secondLayer-wrap").find(".checkbox").removeClass("active");
        $(this).find(".checkbox").addClass("active");
        $(".detail-resume_jobClass").text(selectedText);
        $(this).parents(".popup-resumeJob").fadeOut(300);
    }else {
        let firstLayer = $(this).parents(".popup_select_secondLayer_list").attr("data-firstLayer");
        if(!$(this).hasClass("invalid")) {
            if($(this).find(".checkbox").hasClass("active")) {
                $(this).find(".checkbox").removeClass("active");
                if($(this).hasClass("all")) {
                    // 總數
                    $(this).siblings(".popup_select_secondLayer_item").removeClass("invalid");
                    $(firstLayer).find(".popup_select_firstLayer_selectNum").hide();
                    $(firstLayer).find(".popup_select_firstLayer_selectNum span").text("0");
                    selectTotal = selectTotal - 1;
                    $(this).parents(".popup_select").find(".popup_select_num .selected").text(selectTotal);
                }else {
                    let selectNum =  parseInt($(firstLayer).find(".popup_select_firstLayer_selectNum span").text());
                    selectNum--;
                    if(selectNum<1) {
                        $(firstLayer).find(".popup_select_firstLayer_selectNum").hide();
                    }
                    $(firstLayer).find(".popup_select_firstLayer_selectNum span").text(selectNum);
                    selectTotal = selectTotal - 1;
                    $(this).parents(".popup_select").find(".popup_select_num .selected").text(selectTotal);
                }
            }else {
                let firstLayer = $(this).parents(".popup_select_secondLayer_list").attr("data-firstLayer");
                let selectNum =  parseInt($(firstLayer).find(".popup_select_firstLayer_selectNum span").text());
                if($(this).hasClass("all")) {
                    // 總數
                    selectTotal = selectTotal - selectNum + 1;
    
                    if(selectTotal <= 10) {
                        $(this).find(".checkbox").addClass("active");
                        $(this).siblings(".popup_select_secondLayer_item").addClass("invalid");
                        $(this).siblings(".popup_select_secondLayer_item").find(".checkbox").removeClass("active");
                        $(firstLayer).find(".popup_select_firstLayer_selectNum").show().css("display","flex");
                        $(firstLayer).find(".popup_select_firstLayer_selectNum span").text("1");
                        $(this).parents(".popup_select").find(".popup_select_num .selected").text(selectTotal);
                    }else {
                        selectTotal = selectTotal + selectNum - 1;
                    }
                }else {
                    // 單一類別總數
                    selectNum++;
    
                    // 總數
                    selectTotal = selectTotal + 1;
    
                    if(selectTotal <= 10) {
                        $(this).find(".checkbox").addClass("active");
                        $(firstLayer).find(".popup_select_firstLayer_selectNum").show().css("display","flex");
                        $(firstLayer).find(".popup_select_firstLayer_selectNum span").text(selectNum);
                        $(this).parents(".popup_select").find(".popup_select_num .selected").text(selectTotal);
                    }else {
                        selectTotal = selectTotal - 1;
                    }
                }
            }
        }
    }
})

$(".popup_select_firstLayer_list").click(function(){
    $(this).addClass("active").siblings(".popup_select_firstLayer_list").removeClass("active");
    let secondLayer = $(this).attr("data-secondLayer");
    $(secondLayer).addClass("active").siblings(".popup_select_secondLayer_list").removeClass("active");
    if($(window).width() < 576) {
        $(".popup_select_secondLayer-wrap").show();
    }
})

$(".popup_select_secondLayer_head").click(function(){
    $(this).parents(".popup_select_secondLayer_list").removeClass("active");
    $(this).parents(".popup_select_secondLayer-wrap").hide();
})

$(".popup_select_clear").click(function(){
    $(this).parents(".popup_select").find(".popup_select_firstLayer_selectNum").each(function(){
        $(this).find("span").text("0");
        $(this).hide();
    })
    $(this).parents(".popup_select").find(".popup_select_secondLayer_item").each(function(){
        $(this).find(".checkbox").removeClass("active");
        $(this).removeClass("invalid");
    })
    selectTotal = 0;
    $(".popup_select_num").find(".selected").text("0");
})

$(window).on("resize scroll",function(){
    if($(window).width() > 575) {
        $(".popup_select_secondLayer-wrap").show();
        let secondLayer = $(".popup_select_firstLayer_list.active").attr("data-secondLayer");
        $(secondLayer).addClass("active");
    }
})
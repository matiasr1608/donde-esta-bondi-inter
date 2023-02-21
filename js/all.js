var height = null;

window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
           // document.getElementById("header").style.fontSize = "30px";
           $("#logo_img").attr("height","25rem")
          // $("#logo").fadeOut("slow")
           $("header").css({"height": "2rem"});
        //    $("#text_title").css({"font-size": "calc(1.375rem + 1.5vw-1)"});
           $("#text_title").addClass("small");
        


        } else {
           //$("#logo").fadeIn("slow")
           console.log("hola")

           $("#logo_img").attr("height","50rem")
           //$("#logo").removeAttr("hidden")
           $("header").css({"height": "4rem"});
        //    $("#text_title").css({"font-size": "1rem"});
           $("#text_title").removeClass("small");



            //document.getElementById("header").style.fontSize = "90px";
        }
    }

$(document).ready(() => {
    height = $("#first_text").offset().top - $("header").height()
    console.log(height)
})

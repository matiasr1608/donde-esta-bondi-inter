var height = null;

import $ from "jquery";

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom_index_.css'

import * as bootstrap from 'bootstrap';


window.onscroll = function () { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
           // document.getElementById("header").style.fontSize = "30px";
           $("#logo_img").attr("height","25rem")
          // $("#logo").fadeOut("slow")
           $("header").css({"height": "2rem"});
        //    $("#text_title").css({"font-size": "calc(1.375rem + 1.5vw-1)"});
           $("#text_title").addClass("small");
           $("#text_title").removeClass("smallish");

        } else {
           //$("#logo").fadeIn("slow")
        //    console.log("hola")

           $("#logo_img").attr("height","40rem")
           //$("#logo").removeAttr("hidden")
           $("header").css({"height": "4rem"});
        //    $("#text_title").css({"font-size": "1rem"});
           $("#text_title").removeClass("small");
           if ($(window).width() < 350){
            $("#text_title").addClass("smallish");
           }



            //document.getElementById("header").style.fontSize = "90px";
        }
    }

$(document).ready(() => {
    height = $("#first_text").offset().top - $("header").height()
    console.log(height)
    if(typeof caches !== "undefined"){
      caches.delete("donde_esta_mi_bus_V0.0.5.8").then(function(){
         console.log("old cache deleted")
      }).catch(function(e){
         console.log(e);
      
      })
      
   }
   
})
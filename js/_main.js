(function($) {
  "use strict";
  // Author code here


/* PARALLAX */

/* detect touch */
if ("ontouchstart" in window) {
    document.documentElement.className = document.documentElement.className + " touch";
}
if (!$("html").hasClass("touch")) {
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix() {
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i) {
        if ($(this).innerHeight() <= h) {
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize() {
    var windowH = $(window).height();
    $(".background").each(function(i) {
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if (contW > imgW) {
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e) {
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i) {
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if (bottomWindow > top && topWindow < bottom) {
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = -imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if (!$("html").hasClass("touch")) {
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}


$(document).ready(function() {

    var aChildren = $(".navbar-nav > li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray

    for (var i = 0; i < aChildren.length; i++) {

        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);

    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function() {

        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("active");
            } else {
                $("a[href='" + theID + "']").removeClass("active");
            }
        }

        if (windowPos + windowHeight == docHeight) {
            if (!$(".navbar-nav > li:last-child a").hasClass("active")) {
                var navActiveCurrent = $(".active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("active");
                $(".navbar-nav > li:last-child a").addClass("active");
            }
        }
    });
});


/* MENU */

$(document).on("scroll", function() {

    if ($(document).scrollTop() > 540) {

        $(".navbar-wrapp").removeClass("small").addClass("large");

    } else {

        $(".navbar-wrapp").removeClass("large").addClass("small");

    }

});


/* OWL SLIDER */

$(document).ready(function() {

    $("#event-slider").owlCarousel({

        autoPlay: 3000, //Sets AutoPlay to 3 seconds

        items: 4,
        itemsDesktop: [1199, 3],
        itemsDesktopSmall: [979, 3],
        navigation: true

    });
});



/* Disable animations on mobile */       

        var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
    };

    if( isMobile.any() ) {

    } else{
             new WOW().init();
       
    }

/* SMOOTH SCROLL SETTINGS ON MOBILE AND DESKTOP */

var isMobile = {

    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
    };

    if( isMobile.any() ) {

        smoothScroll.init({
        updateURL: true,
        offset: -323,
        callback: function ( toggle, anchor ) {}
        });

    } else{

        smoothScroll.init({
        updateURL: true,
        offset: 10,
        callback: function ( toggle, anchor ) {}
        });
       
}

/* ABOUT ADD TO CALENDAR */

$('.addtocalendar .btn-primary').on('click touchstart touchend', function(e){
                                    
    $('.atcb-list').toggleClass('active');
     $(this).toggleClass('active');
                                    
});


/* Google Maps */


function initialize() {
    var myLating = new google.maps.LatLng(-7.9521422, 112.5432265);
        var mapOptions = {
            zoom: 20,
            center: myLating,
            //zoomControl: false,
            //scaleControl: false,
            scrollwheel: false,
            //disableDoubleClickZoom: true
        }
        var map = new google.maps.Map(document.getElementById('map'), mapOptions);

        var marker = new google.maps.Marker({
            position: myLating,
            map: map,
        });
}

google.maps.event.addDomListener(window, 'load', initialize);

/* Countdown */  

     $('.countdown').countdown('2016/03/12 08:00:00', function(event) { // <<----- Change the date of the event here here
       var $this = $(this).html(event.strftime(''
        + '<div class="timer"><ul class="date"><li>%m<li class="resp">B</li><li>Bulan</li></ul>'
        + '<ul class="date"><li>%d<li class="resp">H</li><li>Hari</li></ul>'
        + '<ul class="date"><li>%H<li class="resp">J</li><li>Jam</li></ul>'
        + '<ul class="date"><li>%M<li class="resp">M</li><li>Menit</li></ul>'
        + '<ul class="date"><li>%S<li class="resp">D</li><li>Detik</li></ul></div>'));
     });

/* Swipe carousels */

        $(document).ready(function() {
        $("#text-car , #carousel-center , #thumbcarousel1, #top-carousel").swiperight(function() {
            $("#text-car , #carousel-center , #thumbcarousel1 , #top-carousel ").carousel('prev');
        });
        $("#text-car , #carousel-center , #thumbcarousel1 , #top-carousel").swipeleft(function() {
            $("#text-car , #carousel-center , #thumbcarousel1 , #top-carousel").carousel('next');
        });
});
        
/* Video stop on tabs */

//$(".play-video").on("click", function(e) {
//    e.preventDefault();
//    var videourl = $(this).data("video-url");
//    $(this).append('<i class="video-loader fa fa-circle-o-notch fa-spin"></i>')
//    $('.media-video iframe').attr('src', videourl);
//    setTimeout(function() {
//        $('.video-loader').remove();
//    }, 1000);
//});

/* Fancy Select */

$('.options').fancySelect();

var mySelect = $('.options');


})(jQuery);
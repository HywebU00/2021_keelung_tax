// 自行加入的JS請寫在這裡
$(function() {
  //sticky sidebar
  if ($('.stickySidebar').length > 0) {
    var stickySidebar = new StickySidebar('.stickySidebar', {
      containerSelector: '.main',
      topSpacing: 93,
      bottomSpacing: 0,
      minWidth: 768,
      resizeSensor: true,
    });
  }
  $('.marqueeBlock ul').slick({
    dots: false,
    infinite: true,
    arrow: true,
    vertical: true,
    verticalSwiping: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    pauseOnHover: true,
    autoplaySpeed: 1500,
    speed: 1200,
    focusOnSelect: true,
  });
  // leftSlider
  $('.leftSlider ul').on('init reInit afterChange', function(event, slick, currentSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    if (slick.slideCount < 10) {
      if (i < 10) {
        $('.leftSlider_controls').html('<span>0' + i + '</span> / 0' + slick.slideCount);
      } else {
        $('.leftSlider_controls').html('<span>' + i + '</span> / 0' + slick.slideCount);
      }
    } else {
      if (i < 10) {
        $('.leftSlider_controls').html('<span>0' + i + '</span> / ' + slick.slideCount);
      } else {
        $('.leftSlider_controls').html('<span>' + i + '</span> / ' + slick.slideCount);
      }
    }
  });
  var $carousel = $(".leftSlider ul").slick({
    mobileFirst: true,
    dots: false,
    arrow: true,
    infinite: true,
    speed: 0,
    autoplaySpeed: 5000,
    autoplay: true,
    fade: true,
    lazyLoaded: true,
    lazyLoad: "ondemand",
    ease: "ease",
    pauseOnHover: false
  });
  /* The first slide will not get the animation,
      therefore I add and remove a class that will trigger the css animation */
  $carousel.find(".slick-current").addClass("start");
  /* I use a set-timeoutfunction to hinder optimization
      of adding and removing classes */
  setTimeout(function() {
    $carousel.find(".start").removeClass("start");
  }, 0);
  $('.rightSlider ul').slick({
    mobileFirst: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrow: true,
    lazyLoaded: true,
    lazyLoad: 'ondemand',
    ease: 'ease',
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 919,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 486,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 320,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  });
  // 首頁輪播
  $('.mpSlider').slick({
    mobileFirst: true,
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    fade: true,
    lazyLoaded: true,
    lazyLoad: 'ondemand',
    ease: 'ease',
    customPaging: function(slider, i) {
      var title = $(slider.$slides[i]).find('img').attr('alt').trim();
      return $('<button type="button" aria-label="' + title + '"/>').text(title);
    },
  });
  $('.eventSlider').slick({
    mobileFirst: true,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    fade: true,
    lazyLoaded: true,
    lazyLoad: 'ondemand',
    ease: 'ease',
    customPaging: function(slider, i) {
      var title = $(slider.$slides[i]).find('img').attr('alt').trim();
      return $('<button type="button" aria-label="' + title + '"/>').text(title);
    },
  });
  $('.taxSlider ul').slick({
    mobileFirst: true,
    dots: true,
    speed: 300,
    arrow: true,
    infinite: true,
    slidesToShow: 1,
    autoplay: false,
    lazyLoaded: true,
    lazyLoad: 'ondemand',
    ease: 'ease',
    responsive: [{
      breakpoint: 920,
      settings: {
        centerMode: true,
        centerPadding: '165px'
      },
    }, ],
  });
  $('.dummiesBlock ul').on('init reInit afterChange', function(event, slick, currentSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    if (slick.slideCount < 10) {
      if (i < 10) {
        $('.dummiesBlock_controls').html('<span>0' + i + '</span> / 0' + slick.slideCount);
      } else {
        $('.dummiesBlock_controls').html('<span>' + i + '</span> / 0' + slick.slideCount);
      }
    } else {
      if (i < 10) {
        $('.dummiesBlock_controls').html('<span>0' + i + '</span> / ' + slick.slideCount);
      } else {
        $('.dummiesBlock_controls').html('<span>' + i + '</span> / ' + slick.slideCount);
      }
    }
  });
  var $carousel = $(".dummiesBlock ul").slick({
    mobileFirst: true,
    dots: false,
    arrow: true,
    infinite: true,

    autoplaySpeed: 5000,
    autoplay: true,
    lazyLoaded: true,
    lazyLoad: "ondemand",
    ease: "ease",
    pauseOnHover: false,
    responsive: [{
      breakpoint: 920,
      settings: {
        centerMode: true,
        centerPadding: '165px',
        slidesToShow: 3
      },
    }, ],
  });
  // 廣告輪播
  $('.adSlider').slick({
    mobileFirst: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrow: true,
    lazyLoaded: true,
    lazyLoad: 'ondemand',
    ease: 'ease',
    responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  });
  //燈箱slick+lightBox組合
  $('.cp_slider').slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    pauseOnFocus: true,
    focusOnSelect: true,
    accessibility: true,
    lazyLoad: 'ondemand',
    ease: 'ease',
    responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 545,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
  $('.cp_slider').slickLightbox({
    caption: 'caption',
    lazyLoad: 'ondemand',
    useHistoryApi: 'true',
    ease: 'ease',
    lazy: true,
  });
  //
  $('.cppic_slider').slick({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 1500,
    // pauseOnHover: true,
    // pauseOnFocus: true,
    // focusOnSelect: true,
    // accessibility: true,
    // lazyLoad: 'ondemand',
    // ease: 'ease',
    responsive: [{
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 545,
        settings: {
          arrows: true,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });
  // cp_photo
  $('.Slider-for').on('init reInit afterChange', function(event, slick, currentSlide) {
    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.controls').html(i + '/' + slick.slideCount);
  });
  $('.Slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    swipe: false,
    swipeToSlide: false,
    lazyLoad: 'ondemand',
    asNavFor: '.Slider-nav',
    infinite: true,
  });
  $('.Slider-nav').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    asNavFor: '.Slider-for',
    dots: true,
    arrows: true,
    lazyLoad: 'ondemand',
    focusOnSelect: true,
    infinite: true,
  });
});
jQuery('img.svg').each(function() {
  var $img = jQuery(this);
  var imgID = $img.attr('id');
  var imgClass = $img.attr('class');
  var imgURL = $img.attr('src');

  jQuery.get(imgURL, function(data) {
    // Get the SVG tag, ignore the rest
    var $svg = jQuery(data).find('svg');

    // Add replaced image's ID to the new SVG
    if (typeof imgID !== 'undefined') {
      $svg = $svg.attr('id', imgID);
    }
    // Add replaced image's classes to the new SVG
    if (typeof imgClass !== 'undefined') {
      $svg = $svg.attr('class', imgClass + ' replaced-svg');
    }

    // Remove any invalid XML tags as per http://validator.w3.org
    $svg = $svg.removeAttr('xmlns:a');

    // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
    if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
      $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
    }

    // Replace image with new SVG
    $img.replaceWith($svg);

  }, 'xml');

});
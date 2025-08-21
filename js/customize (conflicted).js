 //sticky sidebar
$(function() {
  if ($('.stickySidebar').length > 0) {
    var stickySidebar = new StickySidebar('.stickySidebar', {
      containerSelector: '.main',
      topSpacing: 93,
      bottomSpacing: 0,
      minWidth: 768,
      resizeSensor: true,
    });
  }
});

//marqueeBlock跑馬燈輪播
$(function () {
  var $marquee = $('.marqueeBlock ul')
  .attr({
    id: "marqueeList",
    role: "region",
    "aria-roledescription": "carousel",
    "aria-live": "off"
  })
  .slick({
    dots: false,
    infinite: true,
    arrows: true, // 你原本打 arrow 應該是 arrows
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 1500,
    speed: 1200,
    focusOnSelect: true
  });

  // 暫停/播放邏輯
  var $toggle = $(".marqueeToggle");
  var $status = $("#marqueeStatus");

  function setPausedUI(paused) {
    $toggle
      .attr("aria-pressed", paused)
      .text(paused ? "播放" : "暫停")
      .attr("aria-label", paused ? "播放跑馬燈" : "暫停跑馬燈");
    $marquee.attr("aria-live", paused ? "polite" : "off");
    $status.text(paused ? "跑馬燈已暫停" : "跑馬燈已播放");
  }

  setPausedUI(false);

  $toggle.on("click", function () {
    var paused = $toggle.attr("aria-pressed") === "true";
    if (paused) {
      $marquee.slick("slickPlay");
      setPausedUI(false);
    } else {
      $marquee.slick("slickPause");
      setPausedUI(true);
    }
  });
});

//左右圖輪播
$(function () {
  // -----------------------------
  // 可選：<picture> lazy 輔助（若左側用了 data-src / data-srcset）
  // -----------------------------
  function applyPictureLazy($context) {
    $context.find("img[data-src]").each(function () {
      this.src = this.getAttribute("data-src");
      this.removeAttribute("data-src");
    });
    $context.find("source[data-srcset]").each(function () {
      this.srcset = this.getAttribute("data-srcset");
      this.removeAttribute("data-srcset");
    });
  }

  // -----------------------------
  // 左側：輪播本體 + 無障礙屬性
  // -----------------------------
  var $leftList = $(".leftSlider ul");

  // 預設自動播放（若想尊重使用者減少動態，開下面兩行）
  // var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // var shouldAutoplay = !prefersReduced;
  var shouldAutoplay = true;

  // 計數器 + 初始化前先把首張 picture 的 data-* 寫回
  $leftList
    .on("init", function (event, slick) {
      // 保險：首張圖片如果是 <picture> 的 data-*，先轉為真 src/srcset
      var $first = $(slick.$slides.get(0));
      applyPictureLazy($first);
    })
    .on("init reInit afterChange", function (event, slick, currentSlide) {
      var i = (typeof currentSlide === "number" ? currentSlide : 0) + 1;
      var total = slick.slideCount;
      var currentStr = i < 10 ? "0" + i : "" + i;
      var totalStr = total < 10 ? "0" + total : "" + total;
      $(".leftSlider_controls .current").text(currentStr);
      $(".leftSlider_controls .total").text(totalStr);
    })
    // 切換到下一張前，把下一張的 data-* 寫回（支援 <picture> lazy）
    .on("beforeChange", function (event, slick, currentSlide, nextSlide) {
      var idx = typeof nextSlide === "number" ? nextSlide : 0;
      var $next = $(slick.$slides.get(idx));
      applyPictureLazy($next);
    });

  // 建立 Slick
  var $left = $leftList.slick({
    mobileFirst: true,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,          // 若想瞬換可改 0
    autoplaySpeed: 5000,
    autoplay: shouldAutoplay,
    fade: true,
    lazyLoad: "ondemand", // 僅作用於 <img data-lazy>；<picture> 交給 helper
    pauseOnHover: true,   // 滑入暫停（WCAG 友善）
    pauseOnFocus: true    // 聚焦暫停（鍵盤友善）
  });

  // -----------------------------
  // 左側：暫停/播放按鈕（可存取）
  // -----------------------------
  var $toggle = $(".leftSlider_sliderToggle");
  var $status = $("#leftSliderStatus");

  function setPausedUI(paused) {
    $toggle
      .attr("aria-pressed", paused)
      .text(paused ? "播放" : "暫停")
      .attr("aria-label", paused ? "播放輪播" : "暫停輪播");
    $leftList.attr("aria-live", paused ? "polite" : "off");
    $status.text(paused ? "輪播已暫停" : "輪播已播放");
  }

  // 預設自動播 → UI 顯示未暫停
  setPausedUI(false);

  $toggle.on("click", function () {
    var paused = $toggle.attr("aria-pressed") === "true";
    if (paused) {
      $left.slick("slickPlay");
      setPausedUI(false);
    } else {
      $left.slick("slickPause");
      setPausedUI(true);
    }
  });

  // 可選：使用者移開且非手動暫停 → 自動恢復
  $leftList.on("focusout mouseleave", function () {
    var manuallyPaused = $toggle.attr("aria-pressed") === "true";
    if (!manuallyPaused) $left.slick("slickPlay");
  });

  // -----------------------------
  // 右側：多組小輪播（與左側同步）
  // -----------------------------
  var $rightGroups = $(".rightSlider ul");

  // 初始：全部隱藏，第一組顯示
  $rightGroups.hide().removeClass("active");
  $rightGroups.eq(0).show().addClass("active");

  function rightSlider($obj) {
    if ($obj.hasClass("slick-initialized")) return; // 防重複
    $obj.slick({
      mobileFirst: true,
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1, // base
      slidesToScroll: 1,
      lazyLoad: "ondemand",
      arrows: true,
      responsive: [
        { breakpoint: 320,  settings: { slidesToShow: 2 } },
        { breakpoint: 768,  settings: { slidesToShow: 2 } },
        { breakpoint: 919,  settings: { slidesToShow: 3 } },
        { breakpoint: 1200, settings: { slidesToShow: 3 } }
      ]
    });
  }

  // 預設啟動第一組
  rightSlider($rightGroups.eq(0));

  // 左側切換 → 控制右側顯示/隱藏 + 動態 init/unslick
  $left.on("afterChange", function (event, slick, currentSlide) {
    $rightGroups.each(function (i, el) {
      var $ul = $(el);
      var isActive = i === currentSlide;

      if (isActive) {
        $ul.show().addClass("active");
        rightSlider($ul); // 僅在未初始化時才會真的初始化
      } else {
        $ul.removeClass("active").hide();
        if ($ul.hasClass("slick-initialized")) {
          $ul.slick("unslick");
        }
      }
    });
  });
});

// mpSlider首頁輪播
$(function () {
  $('.mpSlider,.collectSlider').slick({
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
});

//collectVideo
$(function () {
  $('.collectVideo').slick({
    mobileFirst: true,
    dots: false,
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
});

//eventSlider
$(function() {
  $('.eventSlider').slick({
    mobileFirst: true,
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    fade: true,
    lazyLoaded: true,
    lazyLoad: 'ondemand',
    ease: 'ease',
    customPaging: function(slider, i) {
      var title = $(slider.$slides[i]).find('img').attr('alt').trim();
      return $('<button type="button" aria-label="' + title + '"/>').text(title);
    },
  });
})

//taxSlider
$(function(){
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
});

//dummiesBlock
$(function(){
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
})
// adSlider廣告輪播
$(function(){
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
});

//跟cp有關的輪播
$(function(){
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
})


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

//adSearch
$(function(){
  $(".adSearch_btn").click(function(e) {
    $(".adSearch_form").slideToggle();
    e.preventDefault();
  });
  $(".adSearch_form .btn_grp button:last-child").focusout(function(e) {
    $(".adSearch_form").slideUp();
  });
})



$(".list_qa li").each(function() {
  var _qq = $(this).children('.list_q');
  var _question = $(this).children('.list_q').children('a');
  var _switch = _question.children('.switch');
  var _answer = $(this).children('.list_a');
  _answer.hide();

  function accordion(e) {
    if (_answer.is(':visible')) {
      _answer.slideUp();
      _switch.text('展開').removeClass('close');
      _qq.removeClass('active');
    } else {
      _answer.slideDown();
      _switch.text('收合').addClass('close');
      _qq.addClass('active');
    }
    e.preventDefault();
  }
  _question.click(accordion);
});


$(function() {
  $('.left_block ul>li>a').each(function() {
    $(".left_block ul ul").hide();
    $(".left_block ul ul li a.active").parent('li').parent('ul').show();

    function leftnav(e) {
      $(this).parent('li').siblings().children('a').removeClass('active');
      $(this).toggleClass('active');
      $(this).parent('li').siblings().children('ul').slideUp();
      $(this).next('ul').slideToggle();
      if ($(this).parent().find('ul').length > 0)
        e.preventDefault();
    }
    $(this).click(leftnav);
    $(this).keyup(leftnav);
  });
});
$(function() {
  var ww = $(window).outerWidth();
  if (ww <= 768) {
    $(".left_block .left_title").click(function(e) {
      $(this).next("ul").slideToggle();
    });
  } else {}
});

$(function() {
  const passwordInput = document.querySelector(".password");
  const eye = document.querySelector(".eyeclose");
  eye.addEventListener("click", function() {
    this.classList.toggle("eye")
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)
  });
});


(function($, window, document) {
  ('use strict');

  const Carousel = {
    init: function() {
      $('[data-carousel]').slick({
        arrows: true,
        dots: false,
        fade: false,
        autoplay: false,
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    }
  };

  window.Carousel = Carousel;

})(jQuery, window, document);

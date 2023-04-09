$(function () {
  "use strict";

  const videoGallery = '#video-gallery';

  if($(videoGallery).length > 0){

    $(window).on('apiDataFetched', function(e, data, options, fromStr) {
      new Vue({
        el: videoGallery,
        data: {
          videos: []
        },
        delimiters: ['${' , '}'],
        mounted: function() {
          const self = this;
          const categoriesTree = ApiData.toCategoriesTree(data);
          
          //Show articles in the same order they appear in the admin
          $(categoriesTree).each(function(){
            $(this.sections).each(function(){
              $(this.articles).each(function(){
                if(this.label_names.includes('video')){
                  if($(this.body).find('.embed')){
                    this.video_url = $(this.body).find('.embed .img').attr('data-src');
                  };
                  if($(this.body).find('.embed')){
                    this.video_watch_url = $(this.body).find('.embed').attr('href');
                  };
                  self.videos.push(this);
                }
              })
            });
          });
        },
        updated: function(){
          $('.image-with-video-icon').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
          });
          $('[data-carousel-video]').slick({
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
      });

    });

  }

});
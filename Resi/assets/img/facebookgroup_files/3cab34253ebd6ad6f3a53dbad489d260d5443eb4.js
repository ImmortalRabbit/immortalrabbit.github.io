(function($, window, document) {
  ('use strict');

  const SuggestedArticles = {
    init: function() {
      this.cacheElements();
      this.prepareLayout();
      this.bindEvents();
    },
    cacheElements: function () {
      this.suggestionBlock = '[data-suggestions]';
      this.dropdown = 'input[data-tagger]';
    },
    bindEvents: function() {
      $(document).on('change', this.dropdown, this.buildList.bind(this));
      $(document).on('click', '[data-suggestions-close]', this.moveListMobile.bind(this));
      $(document).on('keyup', 'body', this.moveListMobile.bind(this));
    },
    prepareLayout: function() {
      const topPadding = $('.new-request-title').outerHeight() + $('[data-ticket-form-message]').outerHeight() + 30;
      $(this.suggestionBlock).css('marginTop',topPadding + 'px');
    },
    moveListMobile: function(e){
      if (e.type === "keyup" && e.key !== "Escape") return;
      $('.new-request-form').find(this.suggestionBlock).remove();
      $('.column--right .suggestion-articles').addClass('suggestion-articles--active');
      $('body').removeClass('body-overlay');
    },
    buildList: function(e){  
      const locale = LotusUtils.getLocale();
      const self = this;
      $(self.dropdown).parents('.form-field').find(self.suggestionBlock).remove();
      $('.column--right .suggestion-articles').removeClass('suggestion-articles--active');
      if($(e.target).val() !== ''){
        $.get('/api/v2/help_center/' + locale + '/articles.json?label_names=' + $(e.target).val() + '', function(data) {
          if($(data.articles).length > 0){
            let $suggestionsList = '';
            $(data.articles).each((index,article) => {
              $suggestionsList += '\
                <li class="suggestions-list__item">\
                  <span class="suggestions-list__title">' + article.title + '</span>\
                  <a href="' + article.html_url + '?utm_source=help-center&utm_medium=ticket-form&utm_campaign=ticket-form-suggestions" class="suggestions-list__more" target="_blank">Read the article</a>\
                </li>';          
            });
            $('[data-suggestions-list]').html('').append($suggestionsList);
            $(self.suggestionBlock).removeClass(LotusConfig.css.hiddenClass);
            $(e.target).parents('.form-field').find(self.suggestionBlock).remove();
            $(e.target).parents('.form-field').append($(self.suggestionBlock).clone());
            $('body').addClass('body-overlay');
          } else {
            $(self.suggestionBlock).addClass(LotusConfig.css.hiddenClass);
          }
        });
      } else {
        $(self.suggestionBlock).addClass(LotusConfig.css.hiddenClass);
      }
    }
  };

  $(function() {
    if ($('[data-suggestions]').length > 0) {
      SuggestedArticles.init();
    }
  });

})(jQuery, window, document);

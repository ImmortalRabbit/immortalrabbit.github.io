/* eslint no-unused-vars: ["error", { "args": "none" }] */
(function ($, window, document) {

  const CustomerCategory = {
    init() {
      this.showCategoryTree();
    },
    showCategoryTree() {
      const categoryId = LotusUtils.getCategoryId();

      if(categoryId == LotusConfig.customerCategory){
        if(LotusUtils.isCategoryPage()){
          this.addImages();
        }
        if(LotusUtils.isSectionPage()){
          this.addImagesJobs();
        }
      } else {
        $('[data-default-category-tree]').removeClass(LotusConfig.css.hiddenClass);
      }
    },
    addImages() {
      $(window).on('apiDataFetched', function(e, data, options, fromStr) {
        $('[data-article-thumb]').each((i,el) => {
          let articleId = $(el).attr('data-article-thumb');
          let filteredArticle = ApiData.filterByArticleId(data, articleId);
          let firstImage = $($(filteredArticle.articles[0].body).find('img')[0]).attr('src');

          (firstImage != undefined) ? $(el).attr('src', firstImage) : $(el).remove();
        });
        $('[data-customer-category-tree]').removeClass(LotusConfig.css.hiddenClass);
      });
    },
    addImagesJobs() {
      $(window).on('apiDataFetched', function(e, data, options, fromStr) {
        $('[data-customer-blog-item]').each((i,el) => {
          let articleId = $(el).attr('data-customer-blog-item');
          let filteredArticle = ApiData.filterByArticleId(data, articleId);
          let firstImage = $($(filteredArticle.articles[0].body).find('img')[0]).attr('src');

          (firstImage != undefined) ? $(el).find('[data-article-thumb]').attr('src', firstImage) : $(el).remove();
          if(filteredArticle.articles[0].label_names.length > 0){
            filteredArticle.articles[0].label_names.forEach((label) => {
              if(label.indexOf('job') != undefined) {
                let formattedLabel = label.slice(4).replaceAll('_', ' ');
                $(el).find('[data-article-job]').text(formattedLabel);
              }
            });
          } else {
            $(el).find('[data-article-job]').text('Author');
          }
        });
        $('[data-customer-category-tree]').removeClass(LotusConfig.css.hiddenClass);
      });
    }
  };

  $(() => {
    CustomerCategory.init();
  });
}(jQuery, window, document));

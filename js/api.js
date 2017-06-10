((w, $) => {

   let nyt = {
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json"
       };

   nyt.getArticles = (url) => {
       url += '?' + $.param({
               'api-key': "83b36def31a74647b9d105f7fae8e685"
           });

       return $.ajax({
           url: url,
           method: 'GET',
       })
   };

    w.nyt = w.nyt || nyt;

})(window, jQuery);

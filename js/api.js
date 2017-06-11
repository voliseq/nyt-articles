((w, $) => {

   let nyt = {
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json"
       };

   nyt.getArticles = (url, begin_date, end_date, page) => {
       url += '?' + $.param({
               'api-key': "83b36def31a74647b9d105f7fae8e685",
               'begin_date': begin_date,
               'end_date': end_date,
               'sort': "oldest",
               'page': page
           });

       return $.ajax({
           url: url,
           method: 'GET',
       })
   };

    w.nyt = w.nyt || nyt;

})(window, jQuery);

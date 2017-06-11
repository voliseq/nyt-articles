((w, $) => {


    class Article {
        constructor() {
            this.item = $(`<div class="item">
                            <h2 class="bg-lblue"></h2>
                            <h3><a href="#"></a></h3>
                            <div class="meta">
                                <i class="fa fa-calendar"></i> <a class="date" href="#"></a> &nbsp; <i class="fa fa-user"></i> <a class="user" href="#"></a>
                            </div>
                            <p></p>
                        </div>`)
        }

        fill(article_raw) {

            let date = new Date(article_raw.pub_date);
            let year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate();

            month = month < 10 ? "0" + month : month;

            $(this.item).children('h2').text(article_raw.type_of_material);
            $(this.item).children('h3').text(article_raw.lead_paragraph);
            $(this.item).find('.date').text(year + "/" + month + "/" + day);
            $(this.item).find('.user').text(article_raw.source);
        }

        get() {
            return this.item;
        }
    }

    let NytSingleton = (articles_raw) => {
        let instance;
        console.log(articles_raw);
        init = () => {
            let columns = $(".articles-column"),
                _articles = [];


            createArticles = () => {
                articles_raw.forEach((article_raw) => {
                    let new_article = new Article();
                    new_article.fill(article_raw);
                    _articles.push(new_article);
                });
                console.log(_articles);
            };

            attachArticles = () => {
                _articles.forEach((article, i) => {
                    $(columns[i % 3]).append(article.item);
                })
            };


            return {
                createArticles: createArticles,
                attachArticles: attachArticles
            }

        };

        return {
            getInstance: () => {
                if (!instance) {
                    instance = init();
                }
                return instance;
            }
        }
    };

    nyt.getArticles(nyt.url).done(function (result) {
        let articles = result.response.docs,
            nytS = NytSingleton(articles).getInstance();
        nytS.createArticles();
        nytS.attachArticles();

    }).fail(function (err) {

        throw err;

    });

})(window, jQuery)



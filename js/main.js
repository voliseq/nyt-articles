((w, $) => {


    let myDateFormat = (date, type) => {
        let month = date.getMonth(),
            day = date.getDate(),
            hour = date.getHours(),
            minutes = date.getMinutes();

        minutes = minutes < 10 ? "0" + (minutes + 1) : minutes;
        hour = hour < 10 ? "0" + (hour + 1) : hour;
        month = month < 10 ? "0" + (month + 1) : month;
        day = day < 10 ? "0" + (day) : String(day);

        if (type) {
            return String(date.getFullYear()) + "/" + month + "/" + day + " " + hour + ":" + minutes;
        }

        return String(date.getFullYear()) + month + day;
    };

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
            let published_date = myDateFormat(date, 1)

            $(this.item).children('h2').text(article_raw.document_type);
            $(this.item).children('h3').text(article_raw.headline.main);
            $(this.item).find('.date').text(published_date);
            $(this.item).find('.user').text(article_raw.source);
            $(this.item).find('p').text(article_raw.snippet);
        }
    }

    let NytSingleton = () => {
        let instance,
            data_options = {
                format: "yyyy/mm/dd"
            };
        init = () => {
            let columns = $(".articles-column"),
                _articles = [],
                start_picker = $('.date-row .start-date').datepicker(data_options),
                end_picker = $('.date-row .end-date').datepicker(data_options),
                next_btn = $('#next'),
                prev_btn = $("#prev"),
                begin_date,
                end_date,
                page = 0;


            _initDates = () => {

                let today = new Date(),
                    today_parsed;

                today_parsed = myDateFormat(today);


                begin_date = today_parsed;
                end_date = today_parsed;

                start_picker.datepicker('setDate', today);
                end_picker.datepicker('setDate', today);
            };

            _initEvents = () => {

                start_picker.datepicker()
                    .on('changeDate', (e) => {
                        page = 0;
                        begin_date = myDateFormat(e.date);
                        _filterArticles();

                    });

                end_picker.datepicker()
                    .on('changeDate', (e) => {
                        page = 0;
                        end_date = myDateFormat(e.date);
                        _filterArticles();
                    });

                next_btn.on('click', () => {
                    page++;
                    _filterArticles();
                });

                prev_btn.on('click', () => {
                    if (page >= 0)
                        page--;
                    _filterArticles();
                })

            };

            _removeArticles = () => {
                $(".item").remove();
                _articles = [];
            };

            _sortArticles = (date1, date2) => {
              return new Date(date2) - new Date(date1);
            };

            _createArticles = (articles_raw) => {
                _removeArticles();
                articles_raw.forEach((article_raw) => {
                    let new_article = new Article();
                    new_article.fill(article_raw);
                    _articles.push(new_article);
                });
            };

            _attachArticles = () => {
                _articles.sort(_sortArticles).forEach((article, i) => {
                    if (i < 15)
                        $(columns[i % 3]).append(article.item);
                })
            };

            _filterArticles = () => {
                console.log(begin_date, end_date)
                nyt.getArticles(nyt.url, begin_date, end_date, page).done((result) => {


                    console.log(result.response.docs);

                    _createArticles(result.response.docs);
                    _attachArticles();

                }).fail((err) => {

                    throw err;

                });
            };

            startApp = () => {

                _initDates();
                _initEvents();

                nyt.getArticles(nyt.url, begin_date, end_date, page).done((result) => {

                    _createArticles(result.response.docs);
                    _attachArticles();

                }).fail((err) => {

                    throw err;

                });


            };

            return {
                startApp: startApp
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

    NytSingleton().getInstance().startApp();

})(window, jQuery)



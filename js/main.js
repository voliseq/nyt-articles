((w, $) => {



    class Item {
        constructor(){
            this.item = $(`<div class="item">
                            <h2 class="bg-red"></h2>
                            <h3><a href="#"></a></h3>
                            <div class="meta">
                                <i class="fa fa-calendar"></i> <a href="#"></a> &nbsp; <i class="fa fa-user"></i> <a href="#"></a>
                            </div>
                            <p></p>
                        </div>`)
        }

        fill(article){
            $(this.item).children('h2').text("GFhgf");
        }

        get(){
            return this.item;
        }
    }

    let a  = new Item();
    a.fill();
    console.log(a.get());

    let NytSingleton = (data) => {
        let instance,
            articles = [];

        init = () => {


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


    let item = `<div class="item">
                        
                        <h2 class="bg-red"></h2>
                        <!-- Heading -->
                        <h3><a href="#"></a></h3>
                        <!-- Meta -->
                        <div class="meta">
                            <i class="fa fa-calendar"></i> <a href="#"></a> &nbsp; <i class="fa fa-user"></i> <a href="#"></a>
                        </div>
                        <!-- Para -->
                        <p></p>
                    
                 </div>`

})(window, jQuery)

$('.datepicker').datepicker();
let data = nyt.getArticles(nyt.url).done(function (result) {
    console.log(result);
}).fail(function (err) {
    throw err;
});

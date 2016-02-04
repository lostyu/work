(function(win) {

    function Loaderes(config) {
        this.options = {
            resourceType: 'image',
            baseUrl: './',
            resources: [],

            onStart: null,
            onProgress: null,
            onComplete: null
        };

        if(config){
            for( var key in config){
                this.options[key] = config[key];
            }
        }else{
            alert('参数错误');
            return;
        }

        this.status = 0;
        this.total = this.options.resources.length || 0;
        this.currentIndex = 0;
    }

    Loaderes.prototype.start = function() {
        this.status = 1;
        var _this = this;
        var _baseUrl = this.options.baseUrl;

        for(var i=0;i<this.options.resources.length;i++){
            var r = this.options.resources[i],
                url = '';
            if(r.indexOf('http://') == 0 || r.indexOf('https://') == 0){
                url = r;
            }else{
                url = _baseUrl + r;
            }

            var image = new Image();
            image.onload = function() {
                _this.loaded();
            };
            image.onerror = function() {
                _this.loaded();
            };
            image.src = url;
        }

        if(typeof this.options.onStart == 'function'){
            this.options.onStart(this.total);
        }

    };
    Loaderes.prototype.loaded = function() {
        if(typeof this.options.onProgress == 'function'){
            this.options.onProgress(++this.currentIndex, this.total);
        }
        if(this.currentIndex == this.total){
            if(typeof this.options.onComplete == 'function'){
                this.options.onComplete(this.total);
            }
        }
    };

    win['Loaderes'] = Loaderes;

})(window);
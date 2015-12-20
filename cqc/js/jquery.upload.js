(function ($) {
    //默认的contentType
    var contentType = {
        "jpg": "image/jpg", "jpeg": "image/jpeg", "png": "image/png", "gif": "image/gif"
    };

    var file_index = 0;
    $.upload = function (element, options) {
        // 插件的默认选项
        var defaults = {
            url: "", //提交上传文件的地址
            suffix: [], //支持的文件上传列表
            size: 1024, //文件最大大小 单位KB
            prepareUploadItem: function(){ //单个文件准备上传的回调

            },
            uploadCompleteItem: function () { //上传单个文件完成后的回调

            },
            uploadComplete: function (length, ok_length) { //上传全部完成后的回调

            },
            uploadErrorItem: function () {

            },
            /**
             * 选择的文件验证成功后的回调！
             *  this 验证成功的文件
             */
            selectComplete: function () { //选择成功的回调
            },
            /**
             *  选择的文件验证失败后的回调！
             *  this 验证失败的文件
             * @param type 验证失败的类型
             */
            selectError: function (type) {
                console.error("error：", this);
                switch (type) {
                    case "type":
                        alert('您这个"' + this.name + '"文件类型不支持！');
                        break;
                    case "size":
                        alert('您这个"' + this.name + '"文件大小不支持！');
                        break;
                }
            }
        };
        var plugin = this;
        plugin.settings = {};

        var $element = $(element), // jQuery版本的DOM元素的引用
            element = element;    // 实际的DOM元素的引用
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            plugin.settings._open = true;
            plugin.settings._queue = {}; //上传队列
            plugin.settings._reUploadQueue = {}; //重新上传队列
            plugin.settings.contentType = [];
            for (var i = 0, o; (o = plugin.settings.suffix[i]); i++) {
                var ct;
                o instanceof  Object ?
                    ct = contentType[o.suffix] : ct = contentType[o];
                ct && plugin.settings.contentType.push(ct);
            }

//            var $upload_box = $(".upload_box");
//            if (!$upload_box.length) {
                var $upload_box = $('<div class="upload_box" style="display:none;"><input type="file" multiple/></div>');
                $("body").append($upload_box);

//            }

            var $file = $upload_box.find("input");
            $element.click(function () {
                if (!plugin.settings._open) return;
                $file.click();
            });


            $file.change(function (e) {
                if (!plugin.settings._open) return;
                var files = e.target.files || e.dataTransfer.files;

                //chenfei添加，只允许单个文件
                if(files.length>1){
                    $.iBox.error('只能上传单个文件');
                    return false;
                }


                for (var i = 0, file; (file = files[i]); i++) {
                    //验证文件
                    file.id = file_index + "-" + createUUID(); //添加唯一ID
                    file_index++;

                    var hz = file.name.split(".");
                    hz = hz[hz.length - 1];
                    file.suffix = hz; //添加后缀
                    if (verify(file)) {
                        plugin.settings._queue[file.id] = file;
                        plugin.settings.selectComplete.call(file, "size");
                    }
                }
            });
        };


        var verify = function (file) {
            //验证文件类型
            if (!verify_suffix(file)) {
                plugin.settings.selectError.call(file, "type");
                return false;
            }

            //验证文件大小
            if (!verify_size(file)) {
                plugin.settings.selectError.call(file, "size");
                return false;
            }

            return true;
        };

        //验证文件大小
        var verify_size = function (file) {
            var i = include(plugin.settings.suffix, file.suffix);
            var o = plugin.settings.suffix[i], size;
            o instanceof  Object ?
                size = o.size : size = plugin.settings.size;
            return file.size <= size * 1024;
        };


        //验证文件类型
        var verify_suffix = function (file) {
            if (include(plugin.settings.contentType, file.type) == -1) {
                if (include(plugin.settings.suffix, file.suffix) == -1) {
                    return false;
                }
            }
            return true;
        };

        var include = function (arr, value) {
            for (var i = 0, l = arr.length; i < l; i++) {
                var o = arr[i];
                if (o instanceof  Object) {
                    if (o.suffix == value)  return i;
                } else {
                    if (o == value)  return i;
                }
            }
            return -1;
        };


        var createUUID = function () {  //UUID生成器
            var U = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };
            return (U() + U() + "-" + U() + "-" + U() + "-" + U() + "-" + U() + U() + U() + "-" + new Date().getTime().toString(32));
        };

        var ObjectToArr = function (obj) {
            var arr = [];
            for (var k in obj) {
                arr.push(obj[k]);
            }
            return arr;
        };


        //上传队列
        plugin.upload = function () {
            plugin.settings._open = false; //关闭选择文件
            plugin.settings._ok_length = 0;
            var arr = ObjectToArr(plugin.settings._queue);
            var index = 0;
            var up = function () {
                var f = arr[index];
                if (f) {
                    plugin.settings.prepareUploadItem.call(f);
                    var reader = new FileReader();
                    reader.onload = function (e) {

                        var base64Temp = e.target.result;
                        base64Temp = base64Temp.substring(base64Temp.indexOf("base64") + 7);
                        (function () {
                            var file = f;
                            $.ajax({
                                type: "POST",
                                url: plugin.settings.url,
                                data: {
                                    base64: base64Temp,
                                    filename: file.name,
									suffix: file.suffix,
                                    size: file.size
                                },
                                dataType: "json",
                                success: function (data) {
                                    plugin.settings.uploadCompleteItem.call(file, data);
                                    plugin.settings._ok_length++;
                                    index++;
                                    up();
                                },
                                error: function () {
                                    plugin.settings.uploadErrorItem.call(file);
                                    plugin.settings._reUploadQueue[file.id] = file;
                                    index++;
                                    up();
                                }
                            });
                        })();
                    };
                    reader.readAsDataURL(f);

                } else {
                    //上传完成
                    plugin.settings.uploadComplete(arr.length, plugin.settings._ok_length);
                    plugin.settings._queue = plugin.settings._reUploadQueue;
                    plugin.settings._reUploadQueue = {};
                    plugin.settings._ok_length = 0;
                    plugin.settings._open = true; //关闭选择文件

                }
            };

            up();
        };

        //删除队列
        plugin.del = function (id) {
            if (!plugin.settings._open) return false;
            return (delete plugin.settings._queue[id])
        };

        // 启动插件!
        plugin.init();

    };

    // 将插件添加到 jQuery.fn 对象
    $.fn.upload = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('upload')) {
                var plugin = new $.upload(this, options);
                $(this).data('upload', plugin);
            }
        });

    }

})(jQuery);
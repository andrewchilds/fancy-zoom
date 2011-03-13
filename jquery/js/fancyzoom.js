;(function($){

    $.fn.fancyZoom = function(options) {

        var config = {
            closeOnClick: true,
            directory: 'images',    // path to image directory
            speed: 400,             // in milliseconds
            scaleImg: false,
            overlay: true,
            height: null,
            width: null
        };
        if (options) {
            $.extend(config, options);
        }

        init();

        var $me = $(this);
        var $zoom = $('#zoom');
        var $zoom_close = $('#zoom-close');
        var $zoom_content = $('#zoom-content');
        var $zoom_overlay = $('#zoom-overlay');
        var $content_prev;

        var zooming = false;

        this.each(function() {
            $($(this).attr('href')).hide();
            $(this).click(show);
        });

        return this;

        function init() {
            if ($('#zoom').length) {
                return;
            }

            var ext = $.browser.msie ? 'gif' : 'png';

            var html = '<div id="zoom-container" style="position: absolute; left: 0; top: 0; width: 100%; z-index: 999;">' +
                '<div id="zoom" style="display: none; position: relative; margin: 0 auto; padding: 15px; z-index: 999; background: #fff; -moz-border-radius: 10px; -moz-box-shadow: 0 5px 18px rgba(0, 0, 0, 0.5);">' +
                    '<div id="zoom-content"></div>' +
                    '<a href="#" title="click to close" id="zoom-close" style="display: block; position: absolute; top: -13px; right: -13px;">' +
                        '<img src="' + config.directory + '/closebox.' + ext + '" alt="Close" style="border:none; margin:0; padding:0;" />' +
                    '</a>' +
                '</div>' +
            '</div>' +
            '<div id="zoom-overlay" style="background: #000; position: fixed; top: 0; left: 0; z-index: 1; display: none; width: 100%; height: 100%;"></div>';

            $('body').append(html);

            if (config.closeOnClick) {
                $('html').click(function(e) {
                    if (!$(e.target).parents('#zoom:visible').length) {
                        hide();
                    }
                });
            }

            $(document).keyup(function(event) {
                if (event.keyCode == 27 && $('#zoom:visible').length) {
                    hide();
                }
            });

            if (config.overlay) {
                $('#zoom-overlay').css({ opacity: 0.5, width: $(document).width(), height: $(document).height() });
            }

            $('#zoom-close').click(hide);
        }

        function show(event) {
            if (zooming) {
                return false;
            }

            zooming = true;
            var $content = $($(this).attr('href'));
            $content_prev = $content.prev();

            var width = config.width || $content.width();
            var height = config.height || $content.height();

            var close_offset = event.pageY;
            var window_offset = window.pageYOffset || window.document.documentElement.scrollTop || window.document.body.scrollTop;
            var open_offset = Math.max(($(window).height() / 2) - (height / 2) + window_offset, 0);

            $zoom.hide().css({ top: close_offset, height: '1px', width: '1px' }).attr('fancyZoomOffset', close_offset);
            $zoom_close.hide();

            if (config.closeOnClick) {
                $zoom.click(hide);
            }

            if (config.scaleImg) {
                $zoom_content.html($content.clone().attr('id', '').show());
                $('#zoom-content img').css('width', '100%');
            }
            else {
                $zoom_content.html('');
            }

            if (config.overlay) {
                $zoom_overlay.fadeIn(config.speed / 2);
            }

            $zoom.animate({
                    top: open_offset,
                    opacity: "show",
                    height: height,
                    width: width
                },
                config.speed, null, function() {
                if (!config.scaleImg) {
                    $zoom_content.html($content.clone().attr('id', '').show());
                }
                $zoom_close.show();
                zooming = false;
            });

            return false;
        }

        function hide() {
            if (zooming) {
                return false;
            }

            if (config.overlay) {
                $zoom_overlay.fadeOut(config.speed / 2);
            }

            zooming = true;
            var $content = $($('#zoom-content > *:first'));

            $('#zoom').unbind('click');

            $zoom_close.hide();
            $zoom.animate({
                    top: $zoom.attr('fancyZoomOffset'),
                    opacity: "hide",
                    height: '1px',
                    width: '1px'
                }, config.speed, null, function() {
                    zooming = false;
                });

            return false;
        }

    }

})(jQuery);

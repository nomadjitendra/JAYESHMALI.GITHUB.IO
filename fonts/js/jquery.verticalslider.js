(function($) {

    $.fn.verticalSlider = function(options) {

        var settings = $.extend({
            easing: 'easeOutExpo',
            duration: 1000,
            autoPlay: false,
            autoPlayTime: 4000,
            dotClass: '.dot-nav .dot',
        }, options);

        var $$ = jQuery(this),
            dotWrap = $$.find(settings.dotClass),
            timerId = null;

        var currentSlide = 0,
            totalSlides = $$.find('.full_slides > div').length;

        init = function() {
            $$.registerEvents();
            $$.checkAutoPlay();
        }

        $$.displaySlide = function(index) {
            if (timerId) {
                clearTimeout(timerId);
            }
            currentSlide = index;
            var css = {};
            css.top = -(index * $(window).height());
            $$.find('.full_slides').animate(css, settings.duration, settings.easing, $$.displaySlideCallback);
            $$.checkNavDots();
        }

        $$.displaySlideCallback = function() {
            $$.checkAutoPlay();
        }

        $$.checkNavDots = function() {
            dotWrap.removeClass('active');
            dotWrap.eq(currentSlide).addClass('active');
        }

        $$.checkAutoPlay = function() {
            if (settings.autoPlay) {
                timerId = setTimeout(function() {
                    var nextSlide = (currentSlide + 1);
                    if (nextSlide >= totalSlides) {
                        nextSlide = 0;
                    }
                    $$.displaySlide(nextSlide);
                }, settings.autoPlayTime);
            }
        }

        $$.dotClicked = function() {
            var dot = $(this);
            dotWrap.removeClass('active');
            dot.addClass('active');
            var index = dot.index();
            $$.displaySlide(index);
        }

        $$.registerEvents = function() {
            dotWrap.on('click', $$.dotClicked);
        }

        init();

    };

}(jQuery));
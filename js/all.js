(function($) {
    "use strict";
    jQuery(document).ready(function($) {

        /*
         * Preloader
         */
        if ($('#pre-loader').length) {
            $('#pre-loader').fadeOut(function() {
                $('#pre-loader').remove();
            })
        }

        /*
         * Sticky header menu
         */
        $(window).scroll(function() {
            if ($(document).scrollTop() >= 50) {
                $(".h-navbar").addClass("sticky");
                /*trigger resize event for parallax fix*/
                $(window).trigger('resize');
            } else {
                $(".h-navbar").removeClass("sticky");
            }
        });

        /*
         * Parallax
         */
        if ($('.parallax-window').length) {
            $('.parallax-window').each(function() {
                var parallaxWin = $(this);
                var imageSrc = parallaxWin.data('image-src');
                parallaxWin.parallax({
                    imageSrc: imageSrc
                });
            });
        }

        /*
         * Carousel slider
         */
        if ($('.owl-carousel.tslider').length) {
            $('.owl-carousel.tslider').owlCarousel({
                loop: true,
                items: 1,
                margin: 0,
                autoplay: true,
                nav: false,
                dots: true,
                smartSpeed: 450
            });
        }

        /*
         * Blog slider
         */
        if ($('.owl-carousel.blogslider').length) {
            $('.owl-carousel.blogslider').owlCarousel({
                loop: true,
                items: 1,
                margin: 0,
                autoplay: true,
                nav: true,
                dots: false,
                smartSpeed: 450
            });
        }

        /*
         * Sortable filter
         */
        $('.grid').imagesLoaded(function() {
            var grid = $('.grid').masonry({
                // options
                itemSelector: '.grid-item',
                columnWidth: '.grid-item',
                horizontalOrder: true,
                percentPosition: true
            });
        });

        /*
         * Scroll to top
         */
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.gotop-btn').fadeIn();
            } else {
                $('.gotop-btn').fadeOut();
            }
        });

        $('.gotop-btn').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        });

        /*
         * 
         * Scroll to element
         */
        var $root = $('html, body');

        $('a[href^="#"]').click(function() {
            $root.animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 500);

            return false;
        });

        /*
         * Super lightbox
         */
        if ($('.superLightBox').length) {
            $('.superLightBox').superLightBox();
        }

        /*
         * Vertical slider
         */
        if ($('.home-slider').length) {
            $('.home-slider').verticalSlider({
                autoPlay: true
            });
        }

        /*
         * Gallery page sortable
         */
        if ($('.gallery-filter').length) {
            $('.gallery-filter').imagesLoaded(function() {
                $('.gallery-filter .grid').isotope({
                    itemSelector: '.grid-item',
                });

                $('.gallery-tab-menu a').on('click', function(event) {
                    event.preventDefault();
                    var a = $(this);
                    $('.gallery-tab-menu > li').removeClass('active');
                    a.parent().addClass('active');
                    var filter = a.data('filter');
                    $('.gallery-filter .grid').isotope({
                        filter: filter,
                    });
                });
            });
        }

        /*
         * Contact form submission
         */
        if ($('.contact-form').length) {
            $('.contact-form').on('submit', function(event) {

                event.preventDefault();

                var form = $(this);

                var formdata = form.serialize();

                form.find(':input').prop('disabled', true);

                $.post('contactsubmit.php', formdata, function(response) {
                    form[0].reset();
                    form.find(':input').prop('disabled', false);
                });
            });
        }

        /*
         * Auto apply active class to menu item
         */
        $('#navbarNavDropdown a').on('click', function(event) {
            var index = $(this).closest('li').index();
            Cookies.set('activeMenu', index);
        })

        if (Cookies.get('activeMenu')) {
            var index = Cookies.get('activeMenu');
            $('#navbarNavDropdown > ul > li').removeClass('active');
            $('#navbarNavDropdown > ul > li').eq(index).addClass('active');
        }
    });
    /*
     * wow animation
     */
    var wow = new WOW({
        animateClass: 'animated',
        offset: 0,
    });
    wow.init();
})(jQuery);
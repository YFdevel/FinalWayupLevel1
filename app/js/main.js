(function ($) {
    "use strict"

    $('.item-size-value:eq(0)').addClass('active');

    let address = $(location).attr('href')
    $('.menu__item a').removeClass('active');

    switch (address.slice(address.lastIndexOf("/"))) {
        case "/index.html":
            $('.menu__item_header a:eq(0)').addClass('active');
            $('.footer-goods-link:eq(0)').addClass('active');
            break;
        case "/shop.html":
            $('.menu__item_header a:eq(1)').addClass('active');
            $('.footer-goods-link:first-child:eq(1)').addClass('active');
            break;
        case "/brand.html":
            $('.menu__item_header a:eq(2)').addClass('active');
            $('.footer-goods-link:first-child:eq(2)').addClass('active');
            break;
        case "/contact.html":
            $('.menu__item_header a:eq(3)').addClass('active');
            $('.footer-goods-link:first-child:eq(3)').addClass('active');
            break;
        default:
            break;
    }


    $(window).on('scroll', function () {
        let scroll = $(window).scrollTop();
        if (scroll < 200) {
            $('#back-top').fadeOut(500);
            $(".header").removeClass("sticky-bar");
        } else {
            $('#back-top').fadeIn(500);
            $(".header").addClass("sticky-bar");
        }
    });


    $('#back-top a').on("click", function () {
        $('body,html').animate({
            scrollTop: 0
        }, 400);
        return false;
    });

    $(document).ready(() => {
        $('.slider').slick({
            arrows: false,
            dots: true,
            adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            easing: 'linear',
            infinite: true,
            initialSlide: 0,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            pauseOnFocus: true,
            pauseOnDotsHover: true,
            draggable: true,
            swipe: true,
            touchThreshold: 10,
            touchMove: true,
            waitForAnimate: false,
            centerMode: false,
            variableWidth: false,
            rows: 1,
            slidesPerRow: 1,
            asNavFor: '.slider-big',
            mobileFirst: false

        });
        $('.slider-big').slick({
            arrows: false,
            asNavFor: '.slider'
        });

        $('.slider-team').slick({
            arrows: true,
            dots: true,
            adaptiveHeight: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1000,
            easing: 'linear',
            infinite: true,
            initialSlide: 0,
            autoplay: true,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            pauseOnFocus: true,
            pauseOnDotsHover: true,
            draggable: true,
            swipe: true,
            touchThreshold: 10,
            touchMove: true,
            waitForAnimate: false,
            centerMode: false,
            variableWidth: false,
            rows: 1,
            slidesPerRow: 1,
            mobileFirst: false
        });


        $('.offer-btns__arrow').on('click', function () {
            let href = $(this).attr('href');

            $('html, body').animate({
                scrollTop: $(href).offset().top
            }, {
                duration: 700,
                easing: "linear"
            });
            return false;
        })


        $('.header-right__tel-img').on('click', function (e) {
            e.preventDefault();
            $('#wrapper-modal').addClass('active');
        })
        $('#overlay').on('click', function () {
            $('#wrapper-modal').removeClass('active');
        })

        $('.popup-close').on('click', function (e) {
            $('#wrapper-modal').removeClass('active');
        })


        $('.tab-item').on('click', function () {
            const currTab = $(this).index();
            $('.tab-item').removeClass('active');
            $(this).addClass('active');
            return false;
        })
        $('.hamburger').on('click', function () {
            $('.menu_header').parent().toggleClass("d-none");
            $('.menu_header').toggleClass("active");
        })

        $('.item-size-value').on('click', function () {
            const currTab = $(this).index();
            $('.item-size-value').removeClass('active');
            $(this).addClass('active');
            console.log($(this).val())
            return false;
        })

        $.each($('.item-color-value'),function (index,value){
            value.style.background=value.getAttribute("value");
        });
        $('.item-color-value').on('click', function () {
            const currTab = $(this).index();
            $('.item-color-value').removeClass('active');
            $(this).addClass('active');
            console.log($(this).val())
            return false;
        })

        $('.menu__item a').on('click', function () {
            const currTab = $(this).index();
            $('.menu__item a').removeClass('active');
            $(this).addClass('active');
        })


        $('[data-submit]').on('click', function (e) {
            e.preventDefault();
            $(this).parent('form').submit();

        })
        $.validator.addMethod('regex', function (value, element, regexp) {
            let regEx = new RegExp(regexp);
            return this.optional(element) || regEx.test(value)
        }, 'Проверьте корректность вводимых данных');

        function validateForm(element) {
            element.validate({
                rules: {
                    name: {
                        required: true,
                        regex: /^[a-zA-Zа-яА-ЯёЁ]+$/i
                    },
                    email: {
                        required: true,
                        regex: /^[\w._-]+@\w+\.[a-z]{2,4}$/i
                    },
                    phone: {
                        required: true,
                        minlength: 10,
                        maxlength: 11,
                        regex: /^\+\d+$/
                    }
                },
                messages: {
                    phone: {
                        required: 'Поле обязательно для заполнения',
                        regex: 'Телефон должен быть в формате: +xxxxxxxx'
                    },
                    name: {
                        required: 'Поле обязательно для заполнения',
                    },
                    email: {
                        required: 'Поле обязательно для заполнения',
                        email: 'Неверный формат E-mail'
                    }
                },
                //7. Send forms
                submitHandler: function (form) {
                    let isSuccess = false;
                    let dataForm = $(form);
                    $('#loader').fadeIn();
                    $.ajax({
                        url: dataForm.attr('action'),
                        method: 'post',
                        dataType: 'text',
                        data: dataForm.serialize(),
                        success: function (data) {
                            console.log(data);
                        }
                    })
                        .done(function () {
                            console.log('Success');
                            isSuccess = true;
                        })
                        .fail(function () {
                            console.log('Fail');
                        })
                        .always(function () {
                            setTimeout(function () {
                                if (isSuccess) {
                                    $('.message-for-user').fadeIn();
                                }
                                $(dataForm).trigger('reset');
                            }, 1000);
                            $('.message-for-user').on('click', function (e) {
                                $(this).fadeOut();
                            });

                        });

                    return false;
                }
            })

        }

        $('#contact-form,#popup-form').each(function () {
            validateForm($(this))
        })

    })
})(jQuery);
;(function (win, $) {
	'use strict';

	var scrollTop = $('.btn-top');

	/* Interactive */
	function interactive(){
		$('.is-depth2').on('click',function(){
			$(this).toggleClass('is-expand').find('.lnb__depth2').slideToggle();
		})
		$('.language__btn').on('click',function(){
			$(this).siblings('.language__list').toggle();
			$('.language').toggleClass('is-show');
		})
		$('.language__item').on('click',function(){
			$(this).addClass('is-choose').siblings().removeClass('is-choose');
			$('.language__name').text($(this).text());
			$('.language').removeClass('is-show');
			$('.language__list').hide();
		});
	}

	/* slick slide */
	function slide (){
		$('.spot__list').slick({
			autoplay: false,
			/* autoplaySpeed: 5000, */
			dots: false,

		});
		$('.banner-card__list').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			infinite: false,

		});
		$('.mid-slide__list').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			infinite: false
		});

	}

	/* button to top */
	function buttonTop (){
		$(win).scroll(function(){
			var topPos = $(this).scrollTop();
			if (topPos > 100) {
				$(scrollTop).css("opacity", "1");

			} else {
				$(scrollTop).css("opacity", "0");
			}
		})
		$(scrollTop).click(function() {
			$('html, body').animate({
				scrollTop: 0
			}, 800);
		});
	}

	/* scroll bar */
	function scrollBar (){
		$('.scrollbar-macosx').scrollbar();
	}

	var percentTime;
	var tick;
	var time = .1;
	var progressBarIndex = 0;
	var lengthSlide = $('.spot__item').length;

	/* $('').each(function(index) {
		var progress = "<div class='inProgress inProgress" + index + "'></div>";
		$(this).html(progress);
	}); */
	function addDotsbar(index){
		$('.dots-bar').html('');
		for(var index = 0; index < lengthSlide; index++){
			var dotsBarItem = '<div class="dots-bar__item"><span data-slick-index="' + index + '" class="dots-bar__progress"><span class="dots-bar__ratio dots-bar__ratio--num' + index +'"></div></span></div>';
			$('.dots-bar').append(dotsBarItem);
		}
		$('.dots-bar').append('<button type="button" class="spot__control"><span class="blind">pause</span></button>');
	}
	addDotsbar();

	function startProgressbar() {
		resetProgressbar();
		percentTime = 0;
		tick = setInterval(interval, 10);
	}

	function interval() {
		if (($('.spot .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
			progressBarIndex = $('.spot .slick-track div[aria-hidden="false"]').data("slickIndex");
			startProgressbar();
		} else {
			percentTime += 1 / (time + 5);
			$('.dots-bar__ratio--num' + progressBarIndex).css({
				width: percentTime + "%"
			});
			if (percentTime >= 100) {
				$('.spot__list').slick('slickNext');
				progressBarIndex++;
				if (progressBarIndex > lengthSlide) {
					progressBarIndex = 0;
				}
				startProgressbar();
			}
		}
	}

	function resetProgressbar() {
		$('.dots-bar__ratio').css({
			width: 0 + '%'
		});
		clearInterval(tick);
	}

	// End ticking machine

	$('.dots-bar__item').on({
		click:
			function(){
				clearInterval(tick);
				var goToThisIndex = $(this).find("span").data("slickIndex");
				$('.spot__list').slick('slickGoTo', goToThisIndex, false);
				startProgressbar();
			}
	})
	$(win).on('load', function () {
		interactive();
		scrollBar();
		slide();
		buttonTop();
		startProgressbar();
	});

})(window, window.jQuery);

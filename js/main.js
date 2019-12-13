$(function(){
	if($('#sub-nav').length > 0){
		$('body').scrollspy({
			target: '#scrollspy',
			offset: 51
		});
		$('#sub-nav').affix({
			offset: {
				top: 132
			}
		}).on('affix.bs.affix', function(){
			$('header + section').css('padding-top', $('#sub-nav').outerHeight()+'px');
		}).on('affix-top.bs.affix', function(){
			$('header + section').css('padding-top', '0px');
		});
	}

	if($('[data-fitvids-target]').length > 0){
		$('[data-fitvids-target]').fitVids();
	}

	$('.carousel')
		.on('slide.bs.carousel', function(e){
			var $activeSlide = $(this).find('.item.active'),
					$nextSlide = $(e.relatedTarget),
					newHeight = $nextSlide.outerHeight(),
					$player = $activeSlide.find('iframe'),
					data = {
						method: 'pause'
					};
			if($player.length > 0){
				var url = window.location.protocol + $player.attr('src').split('?')[0];
				$player[0].contentWindow.postMessage(JSON.stringify(data), url);
			}
			// $activeSlide.parent().animate({
			// 	'height': newHeight
			// }, 500);
		})
		.carousel({
			interval: 10000
		});

	$('.member-wrapper').each(function(){
		var a = Math.random() * 10-5;
		$(this).css('transform', 'rotate('+a+'deg)');
	});

	$('#technology').on('show.bs.collapse', function(e){
		var $collapse = $(e.target),
				$trigger = $collapse.parent().find('a[href="#'+$collapse.attr('id')+'"]');
		$trigger.addClass('open');
	}).on('hide.bs.collapse', function(e){
		var $collapse = $(e.target),
				$trigger = $collapse.parent().find('a[href="#'+$collapse.attr('id')+'"]');
		$trigger.removeClass('open');
	});

	$('#mc-embedded-subscribe-form').popover({
		trigger: 'manual',
		title: 'You\'ve been subscribed!',
		content: 'You can now rest easy knowing the best East Coast ski content and deals are coming your way.',
		placement: 'auto top'
	});
	//MAILCHIMP
	$('form#mc-embedded-subscribe-form').on('submit', function(e){
		e.preventDefault();
		var $form = $(this),
				$input = $('#email-capture-field'),
				$honeypot = $('#gotcha');
		if($input.val() != '' && $honeypot.val() == ''){
			$.ajax({
				type: 'post-json',
				url: $form.attr('action')+'&c=?',
				data: $form.serialize(),
				cache: false,
				dataType: 'jsonp',
				contentType: "application/json; charset=utf-8",
				success: function(data){
					$('#mc-embedded-subscribe-form').popover('show');
					setTimeout(function(){
						$('#mc-embedded-subscribe-form').popover('hide');
					}, 3000);
				}
			});
		}
	});
	$('#goods .sold-out').on('click', function(e){
		e.preventDefault();
	});
	//EMAIL
	// $('form#mc-embedded-subscribe-form').on('submit', function(e){
	// 	e.preventDefault();
	// 	var $form = $(this),
	// 			$input = $('#email-capture-field'),
	// 			$honeypot = $('#gotcha');
	// 	if($input.val() != '' && $honeypot.val() == ''){
	// 		$.ajax({
	// 			type: 'post',
	// 			url: 'http://formmail.dreamhost.com/cgi-bin/formmail.cgi',
	// 			data: {
	// 				recipient: 'info@hgskis.com',
	// 				subject: 'Subscription Request: '+$input.val(),
	// 				email: $input.val(),
	// 				success: function(){
	// 					$('#mc-embedded-subscribe-form').popover('show');
	// 					setTimeout(function(){
	// 						$('#mc-embedded-subscribe-form').popover('hide');
	// 					}, 3000);
	// 				}
	// 			}
	// 		});
	// 	}
	// });

});
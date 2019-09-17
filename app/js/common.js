$(document).ready(function() {

// animations
	AOS.init();
	AOS.init({
		// Global settings:
		disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
		startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
		initClassName: 'aos-init', // class applied after initialization
		animatedClassName: 'aos-animate', // class applied on animation
		useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
		disableMutationObserver: false, // disables automatic mutations' detections (advanced)
		debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
		throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
		
		// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
		offset: 500, // offset (in px) from the original trigger point
		delay: 0, // values from 0 to 3000, with step 50ms
		duration: 800, // values from 0 to 3000, with step 50ms
		easing: 'ease', // default easing for AOS animations
		once: false, // whether animation should happen only once - while scrolling down
		mirror: false, // whether elements should animate out while scrolling past them
		anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
	});


// mobile menu
	let mobileMenu = document.querySelector("#mobile-menu");
	if( mobileMenu != null ) {
		var TouchMenu = TouchMenuLA({
			target: mobileMenu,
			width: 300,
			onOpen: function(){
				console.log(this.isVisible);
			}
		});

		$('.first__burger').on('click', function(){
			TouchMenu.toggle();
		});

		$('.menu_list li a, .menu_list li button').on('click', function(){
			TouchMenu.toggle();	
		});
	}

// mask
	$(".phone-mask").mask("099-999-99-99");

//scroll add .scroll to buttons for slowly move to anchor
	$('.scroll').bind('click.smoothscroll',function (e) {
		e.preventDefault();
		
		var target = this.hash,
		$target = $(target);
		
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function () {
			window.location.hash = target;
		});
	});

// sliders
	var owl = $('#owl_slider');
	var owlMaxSliders = owl.data('maxnum');
	owl.owlCarousel({
		loop: false,
		nav: true,
		autoplay: false,
		autoplayHoverPause: true,
		autoplayTimeout: 3000,
		margin: 5,
		dots: false,
		navText:['', ''],
		responsiveClass: true,
		items: 1,
		onChanged: setNumOfCurrentPage
	});
	// catch current num of slide
	function setNumOfCurrentPage(event) {
		var items = event.item.count;
		var item  = event.item.index;
		$('.owl__num .current').text(item+1);
		$('.owl__num .all').text(items);
		// console.log('items: ', items, 'item: ', item);
	}


// Rules toggle
	$("#rules .rules__more").on('click', function(){

		if( $(this).hasClass('opened') ) {
			// btn
			$(this).removeClass('opened');
			$(this).text('Развернуть');
			// list
			$("#rules .rules__list").height('160px')
			$("#rules .rules__list").removeClass('opened');
		} else {
			// btn
			$(this).addClass('opened');
			$(this).text('Свернуть');
			// list
			// $("#rules .rules__list").height('92%')
			$("#rules .rules__list").addClass('opened');
		}

	});


// send form
	$( "form" ).on( "submit", function( event ) {
		event.preventDefault();
		var form = this; 
		var data = $(form).serialize();
		$.ajax({
			type: 'POST',
			url: "send.php",
			dataType: "html",
			data: data,
			success: function(data) {
				var json = JSON.parse(data);
				// console.log(data);
				$(form)[0].reset();

				if(json.status === "OK") {
					$("#modal__order").modal("hide");

					setTimeout(function(){
						$("#modal__ok").modal("show");
					}, 1000);

					setTimeout(function(){
						$("#modal__ok").modal("hide");
					}, 10000);
				}
			},
			error: function (data) {
				console.log(data);
				alert("Error while send data! =(");
			}
		});
	});

// $("#modal__ok").modal("show");

//end ready
});


// FUNCTION DECLARATIONS:
	// cookie
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
		}
		return ;
	}

	function checkCookie() {
		var user = getCookie("username");
		if (user != "") {
		alert("Welcome again " + user);
		} else {
		user = prompt("Please enter your name:", "");
		if (user != "" && user != null) {
			setCookie("username", user, 365);
		}
		}
	}


	/* How use class countDownTimer
		new CountdownTimer({
			".countdown",
			Date.now() + 30000,
			"time is end"
		});
	 */
	function CountdownTimer(elem, time, message){
		this.initialize.apply(this, arguments);
	}

	CountdownTimer.prototype = {

		initialize: function(elem, time, message) {
			this.elems = document.querySelectorAll(elem);
			this.endTime 	= time;
			message = message || "00:00:00";
			this.message 	= '<span class="number-wrapper end">\
				<div class="line"></div>\
				<span class="number end">'+ message +'</span>\
			</span>';
		},

		countDown: function(){
			var today = new Date();
			var resultDate = this.endTime - today;
			var day   = Math.floor( resultDate / (24*60*60*1000));
			var hour  = Math.floor(( resultDate % (24*60*60*1000)) / (60*60*1000));
			var min   = Math.floor(( resultDate % (24*60*60*1000)) / (60*1000)) % 60;
			var sec   = Math.floor(( resultDate % (24*60*60*1000)) / 1000) % 60 % 60;
			var timer = '';
			var self  = this;

			if( resultDate > 0 ){
				// if you need 'day' just copy and paste html below in variable timer
				timer = '<div class="number-wrapper">\
								<div class="line">	</div>\
								<span class="number">'+this.addZero(hour)+'</span>\
								<div class="caption">час</div>\
							</div>';
				timer += '<div class="number-wrapper">\
								<div class="line">	</div>\
								<span class="number">'+this.addZero(min)+'</span>\
								<div class="caption">мин</div>\
							</div>';
				timer += '<div class="number-wrapper last">\
								<div class="line">	</div>\
								<span class="number">'+this.addZero(sec)+'</span>\
								<div class="caption">сек</div>\
							</div>';

				for (var i = 0; i < this.elems.length; i++) {
					this.elems[i].innerHTML = timer;
				}

				var id = setTimeout( function(){
					self.countDown();
				}, 10);
				
			} else {

				for (var i = 0; i < this.elems.length; i++) {
					this.elems[i].innerHTML = this.message;
				}

			}
			
		},
		addZero: function(num){
			return ('0'+num).slice(-2);
		}
	}


document.addEventListener("DOMContentLoaded", function(){
	// video 
	findVideos();
});

// videos 
	function findVideos() {
		let videos = document.querySelectorAll('.video');

		for (let i = 0; i < videos.length; i++) {
			setupVideo(videos[i]);
		}
	}

	function setupVideo(video) {
		let link = video.querySelector('.video__link');
		let media = video.querySelector('.video__media');
		let button = video.querySelector('.video__button');
		let id = parseMediaURL(link);

		video.addEventListener('click', () => {
			let iframe = createIframe(id);

			link.remove();
			button.remove();
			video.appendChild(iframe);
			
			link.removeAttribute('href');
			video.classList.add('video--enabled');
		});

	}

	function parseMediaURL(media) {
		let regexp = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/i ;
		let url = media.href;
		let match = url.match(regexp);

		return match[1];
	}

	function createIframe(id) {
		let iframe = document.createElement('iframe');

		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		// iframe.setAttribute('height', '150px');
		iframe.setAttribute('height', '286px');
		iframe.setAttribute('src', generateURL(id));
		iframe.classList.add('video__media');

		return iframe;
	}

	function generateURL(id) {
		let query = '?rel=0&showinfo=0&autoplay=1';

		return 'https://www.youtube.com/embed/' + id + query;
	}


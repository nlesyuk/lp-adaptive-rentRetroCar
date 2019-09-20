$(document).ready(function() {

// animations
	if( window.innerWidth >= 992) {
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
			offset: 300, // offset (in px) from the original trigger point
			delay: 0, // values from 0 to 3000, with step 50ms
			duration: 800, // values from 0 to 3000, with step 50ms
			easing: 'ease', // default easing for AOS animations
			once: false, // whether animation should happen only once - while scrolling down
			mirror: false, // whether elements should animate out while scrolling past them
			anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
		}); 
		// document.head.innerHTML += '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" integrity="sha256-GqiEX9BuR1rv5zPU5Vs2qS/NSHl1BJyBcjQYJ6ycwD4=" crossorigin="anonymous" />';
	} else {
		$("link[href*='aos.css']").remove();
		$("script[src*='aos.js']").remove();
		$('body').find('*[attr*=data-aos]').data('aos', '');
		AOS.init({
			disable: true
		});
	}

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
	owl.owlCarousel({
		loop: false,
		nav: true,
		autoplay: true,
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
	}


// Rules toggle
	$("#rules .rules__more").on('click', function(){

		if( $(this).hasClass('opened') ) {
			// btn
			$(this).removeClass('opened');
			$(this).text( $(this).data('close') );
			// list
			$("#rules .rules__list").removeClass('opened');
			// scroll to anchor
			$('html, body').animate({
				scrollTop: $("#rules").offset().top
			}, 300);
			console.log("CLOSED");
		} else {
			// btn
			$(this).addClass('opened');
			$(this).text($(this).data('opened'));
			// list
			$("#rules .rules__list").addClass('opened');
			console.log("OPENED");
		}

	});

// tooltip
	$(document).on('click', function(e){
		var isHasClass = e.target.classList.contains('price__tooltip');
		var parent = e.target.closest('.price__tooltip');

		if( isHasClass || parent){
			$(".price__tooltip").toggleClass('active');
		} else {
			$(".price__tooltip").removeClass('active');
		}
	});

// detect old browsers
	var br = detectedBrowser();
	var isUseAJAX = true;
	if(
		br.name === 'Chrome' && br.majorVersion <= 65
		||
		br.name === 'Opera' && br.majorVersion <= 65
		||
		br.name === 'Safari' && br.majorVersion <= 7
		||
		br.name === 'Firefox' && br.majorVersion <= 55
	) {
		var form = document.querySelectorAll('form');
		for(var i = 0; i < form.length; i++ ) {
			form[i].setAttribute('action', 'send-deprecated.php')
		}
		isUseAJAX = false;
	}
	// document.querySelectorAll('form')[0].setAttribute('action', 'send.php')

// send form
$( "form" ).on( "submit", function( event ) {
	if( isUseAJAX ){
		event.preventDefault();
		var form = this; 

		var url = window.location.href;
		var phpHandler = "send.php";
		if( url.indexOf('ua') != -1) phpHandler = "/send.php";
		// pathname

		var data = $(form).serialize();
		$.ajax({
			type: 'POST',
			// url: phpHandler,
			url: "/send.php",
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
	}
});
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

	function detectedBrowser() {
		var nVer = navigator.appVersion;
		var nAgt = navigator.userAgent;
		var browserName  = navigator.appName;
		var fullVersion  = ''+parseFloat(navigator.appVersion); 
		var majorVersion = parseInt(navigator.appVersion,10);
		var nameOffset,verOffset,ix;

		// In Opera, the true version is after "Opera" or after "Version"
		if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		browserName = "Opera";
		fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
		fullVersion = nAgt.substring(verOffset+8);
		}
		// In MSIE, the true version is after "MSIE" in userAgent
		else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset+5);
		}
		// In Chrome, the true version is after "Chrome" 
		else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		browserName = "Chrome";
		fullVersion = nAgt.substring(verOffset+7);
		}
		// In Safari, the true version is after "Safari" or after "Version" 
		else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		browserName = "Safari";
		fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
		fullVersion = nAgt.substring(verOffset+8);
		}
		// In Firefox, the true version is after "Firefox" 
		else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		browserName = "Firefox";
		fullVersion = nAgt.substring(verOffset+8);
		}
		// In most other browsers, "name/version" is at the end of userAgent 
		else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
				(verOffset=nAgt.lastIndexOf('/')) ) 
		{
		browserName = nAgt.substring(nameOffset,verOffset);
		fullVersion = nAgt.substring(verOffset+1);
		if (browserName.toLowerCase()==browserName.toUpperCase()) {
		browserName = navigator.appName;
		}
		}
		// trim the fullVersion string at semicolon/space if present
		if ((ix=fullVersion.indexOf(";"))!=-1)
		fullVersion=fullVersion.substring(0,ix);
		if ((ix=fullVersion.indexOf(" "))!=-1)
		fullVersion=fullVersion.substring(0,ix);

		majorVersion = parseInt(''+fullVersion,10);
		if (isNaN(majorVersion)) {
		fullVersion  = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
		}
		var OSName="Unknown OS";
		if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
		if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
		if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
		if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

		return {
			name: browserName,
			fullVersion: fullVersion,
			majorVersion: majorVersion,
			appName: navigator.appName,
			userAgent: navigator.userAgent,
			OS: OSName
		}
	}
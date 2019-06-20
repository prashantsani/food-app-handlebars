/*

	
	HTML,CSS,JS Code By Prashant Sani
	https://prashantsani.com

*/
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
	get: function(){
		return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
	}
});
function whichAnimationEvent(){
	var t,
		el = document.createElement("fakeelement");

	var animations = {
		"animation"      : "animationend",
		"OAnimation"     : "oAnimationEnd",
		"MozAnimation"   : "animationend",
		"WebkitAnimation": "webkitAnimationEnd"
	}

	for (t in animations){
		if (el.style[t] !== undefined){
		return animations[t];
		}
	}
}
var animationEvent = whichAnimationEvent();


/* ------------
	Feature Detection
------------ */
// Fallback for SVG
if (!Modernizr.svg) {
  $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
  });
}
// Fallback for WEBP
Modernizr.on('webp', function(result) {
  if (result) {
    console.log('Webp Supported');
  } else {
    console.log('Webp NOT Supported');
  }
});

/* ------------
	Plugins
------------ */


(function(w,d){
	var $html = $('html');

	$(d).on('load',function () {

	});

	$(w).on('resize',function () {

	});

	/* ------------
		Form Submit
	------------ */
	// document.getElementById("contactForm").onsubmit = function() {
	// 		//Ajax
	// 		var dataString = {
	// 			"name" :$("#name").val(),
	// 			"email": $("#email").val(),
	// 			"subject": $("#subject").val(),
	// 			"message":$("#message").val()
	// 		}

	// 		$.ajax({
	// 			url: "https://formspree.io/",
	// 			method: "POST",
	// 			data: dataString,
	// 			dataType: "json",
	// 			success: function(data) {
	// 				alert('successfully submitted form!');
	// 				$("#name").val('');
	// 				$("#email").val('');
	// 				$("#subject").val('');
	// 				$("#message").val('');
	// 			},
	// 			error: function(){
	// 				alert('Error!');
	// 			}
	// 		});
	// }
})(window,document);

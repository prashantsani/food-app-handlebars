/*

	
	HTML,CSS,JS Code By Prashant Sani
	https://prashantsani.com

*/
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

w = window;
d = document;
//(function(w,d){
	var request = new XMLHttpRequest(),
			data = undefined,
			url = 'http://temp.dash.zeta.in/food.php',
			template_product = Handlebars.compile(d.getElementById('template-product').innerHTML),
			_$ = function (selector){
				return d.querySelectorAll(selector);
			};

	// We will have to use the click handler on document level
	// Reason for doing so is the favorites button will be dynamically created
	document.addEventListener('click',function(e){
		if( e.target && e.target.classList.contains('favorite') ) {
				alert('Favorited!!');
			}
	});

	function initCategories(data){

	}

	function initProducts(){
		var product_wrap = document.getElementById('products-wrap');
		for(let index=0; index < data.recipes.length; index++){
			product_wrap.innerHTML = product_wrap.innerHTML + template_product(data.recipes[index])
		}
	}

	// Ajaxing data
	request.open('GET', url, true);
	request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
					// Success!!
					data = JSON.parse(request.responseText);
					initProducts()
					
			} else {
					data = 'We reached our target server, but it returned an error'
			}
	};
	request.onerror = function() {
			data =  'Ajax Error'
	};
	request.send();

//})(window,document);

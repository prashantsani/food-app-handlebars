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
	var _html = d.documentElement,
			request = new XMLHttpRequest(),
			data = undefined,
			url = 'http://temp.dash.zeta.in/food.php',
			template_product = Handlebars.compile(d.getElementById('template-product').innerHTML),
			template_category = Handlebars.compile(d.getElementById('template-categories').innerHTML),
			_$ = function (selector){
				return d.querySelectorAll(selector);
			};
		
	// ES6 Includes() function, be careful: might not be supported
	// in browsers which do not support ES6
	if(w.location.toString().includes('prashantsani.github.io')){
		url = 'helpers/dummy-json.json'
	}

	// We will have to use the click handler on document level
	// Reason for doing so is the favorites button will be dynamically created
	d.addEventListener('click',function(e){
		var elem = e.target
		if( elem && elem.classList.contains('filter-products') ) {
				//document.querySelectorAll('.filter-products.active')[0].classList.add('active');
				
				console.log(elem)
				elem.classList.add('active');
				// Filter Products
				let elements = document.querySelectorAll('.products');
				Array.prototype.forEach.call(elements, function(el, i){
					(console.log(this))
				});
		}
		if( elem && elem.classList.contains('favorite') ) {
				// Add to Favorites
		}
	});

	function initCategories(){
		d.getElementById('categories-filters').innerHTML = template_category(data);
	}

	function initProducts(){
		var product_wrap = d.getElementById('products-wrap');
		for(let index=0; index < data.recipes.length; index++){
			product_wrap.innerHTML = product_wrap.innerHTML + template_product(data.recipes[index])
		}
	}

	function initProductPage(){
		var product_wrap = d.getElementById('products-wrap');

		// NOT DYNAMIC NOW
		product_wrap.innerHTML = product_wrap.innerHTML + template_product(data.recipes[0])
	}

	// Ajaxing data
	request.open('GET', url, true);
	request.onload = function() {
			if (request.status >= 200 && request.status < 400) {
					// Success!!
					data = JSON.parse(request.responseText);
					data.categories = data.categories.map(function(el) {
						var o = Object.assign({}, el);
						o.url = el.name.toLowerCase().replace(' ','-');
						return o;
					});
					data.recipes = data.recipes.map(function(el) {
						var o = Object.assign({}, el);
						o.category = el.category.toLowerCase().replace(' ','-');
						return o;
					});
					if(_html.classList.contains('index')){
						initProducts();
						initCategories()
					}else if(_html.classList.contains('product-pg')){
						initProductPage();
					}
					
			} else {
					data = 'We reached our target server, but it returned an error'
			}
	};
	request.onerror = function() {
			data =  'Ajax Error'
	};
	request.send();

//})(window,document);

var sketch = function(p){
	p.preload = function(){

	};

	p.setup = function(){

	};

	p.draw = function(){

	};

	p.windowResized = function(){

	};
};

$(document).ready(function() {
	// Go for more complex navigation when JS is present
	hashChange();

	// Navigation
	$("#page-header nav .section-links").click(function(e){
		e.preventDefault();
		window.location.hash = $(this).attr("href");
	});
	$(window).on("hashchange", function(){
		hashChange();
	});




	// daniloTitleSketch();

	// Utilities
	function hashChange(){
		$("#page-content>section").css("display", "none");

		switch(window.location.hash){
			case "":
			case "#":
				$("#page-content > #about-section").css("display", "block");
				break;
			case "#direction":
				$("#page-content > #direction-section").css("display", "block");
				break;
			case "#access":
				$("#page-content > #access-section").css("display", "block");
				break;
			case "#conduct":
				$("#page-content > #conduct-section").css("display", "block");
				break;
			case "#tickets":
				$("#page-content > #tickets-section").css("display", "block");
				break;
			case "#sponsors":
				$("#page-content > #sponsors-section").css("display", "block");
				break;
			default:
				$("#page-content > #about-section").css("display", "block");
		}
	}
});

function daniloTitleSketch(){
	let myfont, ctx, totalwidth;

	opentype.load("/assets/fonts/theserif_5_regular.ttf", function (err, font) {
		if (err) {
			alert("Font could not be loaded: " + err);
		} else {
			myfont = font;
			init();
		}
	});

	function init() {
		const canvas = document.getElementById("header");
		totalwidth = window.innerWidth-20;
		canvas.width = totalwidth;
		ctx = canvas.getContext("2d");
		animateHeader();
	}

	function animateHeader(t) {

		ctx.clearRect(0, 0, totalwidth, 300);
		const string = "Processing Community Day";
		const glyphs = myfont.stringToGlyphs(string);
		ctx.globalCompositeOperation = "screen";
		drawGlyphs(t, glyphs, true);
		drawGlyphs(t, glyphs, false);

		window.requestAnimationFrame(animateHeader);

	}

	function drawGlyphs(t, glyphs, isStatic) {
		let w = (totalwidth - 800) *.5;
		const kerning = 1.1;
		glyphs.forEach((d, i) => {
			if (d.name === "space") {
				w += 20;
			} else {
				const svalue = window.scrollY * 0.1;
				const n = noise(w, (t) * 0.0001 ) * 10;
				const path = d.getPath(w, 40, 55);
				ctx.save();
				ctx.translate(isStatic ? 0 :  Math.cos(n) * svalue ,0);
				path.fill = "#7621bf";
				path.draw(ctx);
				const b = path.getBoundingBox();
				w += (b.x2 - b.x1)*kerning;
				ctx.restore();
			}

		});
	}
}
var sketch = function(p){
	var font;
	var bounds = [];
	var points = [];
	var canvas;
	var titleStr = "Processing Community Day";

	p.preload = function(){
		font = p.loadFont("./assets/fonts/RobotoSlab-Regular.ttf");
	};

	p.setup = function(){
		canvas = p.createCanvas(700, 100);
		canvas.parent("#canvas-container");
		p.resizeCanvas(canvas.parent().clientWidth, 100);
		p.background(255);

		var splitStr = titleStr.split();
		for(var i=0; i<splitStr.length; i++){
			points.push(font.textToPoints(splitStr[i], 0, 0, 14, {
				sampleFactor: 2,
				simplifyThreshold: 0
			}));

			bounds.push(font.textBounds(splitStr[i], 0, 0, 14));
		}
	};

	p.draw = function(){
		p.background(255);

		p.stroke("#000000");
		p.translate(10, 15);
		for(let j=0; j<points.length; j++){
			p.translate(-bounds[j].x * (p.width - 15) / bounds[j].w, -bounds[j].y * (p.height - 15) / bounds[j].h);
			for(let i=0; i<points[j].length; i++){
				p.point(points[j][i].x * (p.width - 15) / bounds[j].w, points[j][i].y * (p.height - 15) / bounds[j].h);


			}
		}
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

	new p5(sketch);


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
let myfont;
let glyphs = [];
let advance = 0;
let totalAdvance;
let ratio;
let font;
const FONTSIZE = 200;

function preload() {
	font = loadFont("./assets/fonts/RobotoSlab-Regular.ttf");
}

function init() {
	// Go for more complex navigation when JS is present
	hashChange();
	// Navigation
	$("#page-header nav .section-links").click(function(e) {
		e.preventDefault();
		window.location.hash = $(this).attr("href");
	});
	$(window).on("hashchange", function() {
		hashChange();
	});
	// Utilities
	function hashChange() {
		$("#page-content>section").css("display", "none");
		let sectionName;
		switch (window.location.hash) {
			case "":
			case "#":
				sectionName = "about";
				break;
			case "#direction":
				sectionName = "direction";
				break;
			case "#access":
				sectionName = "access";
				break;
			case "#conduct":
				sectionName = "conduct";
				break;
			case "#tickets":
				sectionName = "tickets";
				break;
			case "#sponsors":
				sectionName = "sponsors";
				break;
			default:
				sectionName = "about";
		}
		$(`#page-content > #${sectionName}-section`).css("display", "block");
		console.log(sectionName);
		changeGlyphs(sectionName);
	}
}

function setup() {
	const cnv = createCanvas(screen.width, screen.height);
	cnv.parent("sketch-holder");
	init();
	totalAdvance = glyphs.reduce((a, b) => a + b.bounds.w, 0);
	ratio = (width * 0.8) / totalAdvance;
	noStroke();
	fill("rgba(0,0,0,0.15)");
}

function draw() {
	background(255);
	if (!glyphs.length) return;
	translate((width - totalAdvance * ratio) * 0.5, height * 0.5);
	advance = 0;
	glyphs.forEach(g => {
		drawGlyph(g);
		advance += g.bounds.w;
	});
}

function changeGlyphs(string) {
	glyphs = [];
	string.split("").forEach(addGlyph);
}

function addGlyph(glyph) {
	const b = font.textBounds(glyph, 0, 0, FONTSIZE);
	glyphs.push({
		points: font.textToPoints(glyph, 0, 0, FONTSIZE, {
			sampleFactor: 0.2,
			simplifyThreshold: 0
		}).map(d => {
			return {
				x: d.x,
				y: d.y
			};
		}),
		bounds: b
	});
}

function drawGlyph(g) {
	const points = g.points;
	beginShape();
	const m = millis() * 0.001;
	const n = mouseX / width;
	points.forEach(p => {
		let x = p.x + advance;
		const i = x / totalAdvance;
		const f = Math.sin(i * n * 20 + m);
		const y = p.y * f;
		vertex(x * ratio, y * ratio);
	});
	endShape(CLOSE);
}
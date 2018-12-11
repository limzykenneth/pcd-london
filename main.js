$(document).ready(function() {
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

  // $("#page-header #title-container #canvas-container .site-title").css("display", "none");
  // new p5(sketch);
  // daniloTitleSketch();

  // Utilities
  function hashChange() {
    $("#page-content>section").css("display", "none");

    switch (window.location.hash) {
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

function setup() {
  const cnv = createCanvas(screen.width, screen.height);
  cnv.parent("sketch-holder");
  "about".split("").forEach(addGlyph);

  totalAdvance = glyphs.reduce((a, b) => a + b.bounds.w, 0);
  ratio = (width * 0.8) / totalAdvance;
  // ratio = 600;
  noStroke();
  fill("rgba(0,0,0,0.15)");
}

function draw() {
  background(255);
  translate(0, height * 0.35);
  advance = 0;
  glyphs.forEach(g => {
    drawGlyph(g);
    advance += g.bounds.w;
  });
}

function addGlyph(glyph) {
  const b = font.textBounds(glyph, 0, 0, FONTSIZE);
  glyphs.push({
    points: font
      .textToPoints(glyph, 0, 0, FONTSIZE, {
        sampleFactor: 0.2,
        simplifyThreshold: 0
      })
      .map(d => {
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
  const n = mouseX/width
  // const n = Math.min(1000, window.scrollY) / 1000;
  points.forEach(p => {
    let x = p.x + advance;
    const i = x / totalAdvance;
    const f = Math.sin(i * n * 20 + m);
    const y = p.y * f;
    vertex(x * ratio, y * ratio);
  });
  endShape(CLOSE);
}

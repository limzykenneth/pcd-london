let glyphs = [];
let totalAdvance;
let font;
let glyphsPaths = [];
let minX;
let maxX;

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
    changeGlyphs(sectionName);
  }
}

function setup() {
  const cnv = createCanvas(screen.width, screen.height);
  cnv.parent("sketch-holder");
  init();
  noStroke();
}

function changeGlyphs(string) {
  glyphs = font.textToPoints(string, 0, 0, 400, {
    sampleFactor: 2,
    simplifyThreshold: 0
  });

  minX = Infinity;
  maxX = 0;
  glyphsPaths = [];
  glyphs.forEach(d => {
    if (!glyphsPaths[d.glyphIndex]) glyphsPaths[d.glyphIndex] = [];
    if (!glyphsPaths[d.glyphIndex][d.pathIndex]) glyphsPaths[d.glyphIndex][d.pathIndex] = [];
    if (d.x < minX) minX = d.x;
    if (d.x > maxX) maxX = d.x;
    glyphsPaths[d.glyphIndex][d.pathIndex].push(d);
  });

  totalAdvance = maxX - minX;

  drawGlyphs();
}

function draw() {
  background(255);
  if (!glyphs.length) return;
  translate((width - totalAdvance) / 2 - minX, height / 2 - 0);
  drawGlyphs();
}

function drawGlyphs() {
  fill(0, 0, 0, 10);

  glyphsPaths.forEach(paths => {
    beginShape();
    paths.forEach(points => {
      const m = millis() * 0.001;
      const n = mouseX / width;
      points.forEach(p => {
        let x = p.x;
        const i = x / totalAdvance;
        const f = sin(i * n * 40 + m);
        const y = p.y * f;
        vertex(x, y);
      });
    });
    endShape();
  });
}

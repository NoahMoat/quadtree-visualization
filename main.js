
let qt;
let lod = 5;
function setup() {
  createCanvas(700,700);
  let bound = new Square(0,0,width);
  qt = new QuadTree(bound,0);

  for (i=0;i<8000;i++) {
    p = new Point(random(width),random(height),random(width));
    qt.insert(p);
  }

  background(0);
  qt.show();
}

let mp = false;
function draw() {
  background(0);

  if (mouseIsPressed && !mp) {
    let m = new Point(mouseX,mouseY);
    qt.insert(m);
    mp=true;
  }
  if (!mouseIsPressed) {
    mp = false;
  }
  qt.show(0);
}

function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    lod++;
  }
  else if (keyCode === LEFT_ARROW) {
    lod--;
  }

}

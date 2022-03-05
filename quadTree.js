class Point {
  constructor(x,y) {
    this.x=x;
    this.y=y;
  }
}

class Square {
  constructor(x,y,s) {
    this.x=x;
    this.y=y;
    this.s=s;
  }
}

class QuadTree {
  constructor(bound,h) {
   this.bound=bound;
   this.capacity=1; 
   this.points = [];
   this.divided = false;
   this.height = h;
   //this.rglimit = map(this.height,0,5,0,50);
   //this.r = map(this.bound.x,0,width,0,255-(this.rglimit/2));
   //this.g = map(this.bound.y,0,height,0,255-(this.rglimit));
   //this.b = map(this.height,0,15,0,255);
   this.r = random(255);
   this.g = random(255);
   this.b = random(255);
  }

  contains(point) {
    if (point.x < this.bound.x+this.bound.s && point.x >= this.bound.x
      && point.y < this.bound.y+this.bound.s && point.y >= this.bound.y){
        return true;
      }
  }

  insert(point) {
    if (this.points.length < this.capacity) {
      this.points.push(point);
    } else {
      if (!this.divided) {
        this.subDivide();
        this.divided = true;
      }

      if (this.tr.contains(point)) {
        this.tr.insert(point);
      }
      else if (this.tl.contains(point)) {
        this.tl.insert(point);
      }
      else if (this.bl.contains(point)) {
        this.bl.insert(point);
      }
      else if (this.br.contains(point)) {
        this.br.insert(point);
      }
    }
  }

  subDivide() {
    let _h = this.height+1;
    let x = this.bound.x;
    let y = this.bound.y;
    let s = this.bound.s;

    let _tr = new Square(x+s/2,y,s/2);
    this.tr = new QuadTree(_tr,_h);
    let _tl = new Square(x,y,s/2);
    this.tl = new QuadTree(_tl,_h);
    let _bl = new Square(x,y+s/2,s/2);
    this.bl = new QuadTree(_bl,_h);
    let _br = new Square(x+s/2,y+s/2,s/2);
    this.br = new QuadTree(_br,_h);

    this.divided = true;
  }

  show(i) {
    i = i+1;
    if (i < lod) {
    if (this.divided) {
      this.tr.show(i);
      this.tl.show(i);
      this.bl.show(i);
      this.br.show(i);
    } else {
      if (this.points.length > 0) {
        fill(this.r,this.g,this.b);
        noStroke();
        rect(this.bound.x,this.bound.y,this.bound.s,this.bound.s);
    }
  } 
  } 
  else if(this.points.length > 0) {
  fill(this.r,this.g,this.b);
  noStroke();
  rect(this.bound.x,this.bound.y,this.bound.s,this.bound.s);
  }


  }
}
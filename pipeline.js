let fetchColor;
let decodeColor;
let executeColor;
let memoryColor;
let wbColor;
let stallColor;

let pipelineTable = [];



const width = 30;
const height = 30;
let radioBox,valueBox;
let current;
let isOver = false;
let x = 0,y = 0;

let blocks = [];
let pipeline = [];
function setup() {
  // radioBox = createRadio();
  // radioBox.option("Pipeline")
  // radioBox.option("Fetch");
  
  canvas = createCanvas(1920, 1080);
  canvas.parent('pipelineScreen');
  
  fetchColor = color(255,255,0);
  decodeColor = color(107, 242, 238);
  executeColor = color(230, 42, 21);
  memoryColor = color(21, 212, 24);
  wbColor = color(227, 14, 170);
  stallColor = color(255,255,255);
  
  for(let i = 0; i < 10000; i++)
    pipelineTable[i] = 0;
  print(pipelineTable);
}


function draw() {
  background(220);
  // text(pipeline.length,200,100)
  // text("mouseX " + mouseX,50,20)
  // text("mouseY " + mouseY,50,40)
  // text("isOver" + isOver,50,50);
  
  // radioValue = radioBox.value()
  
  for(let p of pipeline) p.display()
  
  for(let b of blocks) b.display()
  
}

function magnetX() {
  
}

function mouseDragged() {
  if(isOver) {
    current.setXY(mouseX,mouseY)
  }
}

class Block {
  
  
  constructor(x,y) { 
    this.setXY(x,y);
    
    switch(key) {
      case "f":
        this.c = fetchColor;
      break;
      case "d":
        this.c = decodeColor;
      break;
      case "e":
        this.c = executeColor;
      break;
      case "m":
        this.c = memoryColor;
      break;
      case "w":
        this.c = wbColor;
      break;
      case "s":
        this.c = stallColor;
      break;
    }
  }
  
  getX() { return this.x; }
  getY() { return this.y; }
  setX(x) {
    this.x = x;
  }
  
  setY(y) {
    this.y = y;
  }
  
  setXY(x,y) {
    this.x = x; this.y = y; return this;
  }
  
  display() {
    fill(this.c);
    rect(this.x,this.y,40,40);
  }

  clicked() {
    if(dist(this.x,this.y,mouseX,mouseY) < 40) {
      return this;
    }
  }
}

class Pipeline {
  constructor(x,y) {
   this.setXY(x,y);
  }
  
  setXY(x,y) {
    this.x = x;
    this.y = y;
    return this;
  }
  display() {
    
    fill(fetchColor);
    rect(this.x,this.y,40,40)
    
    fill(decodeColor)
    rect(this.x + 40,this.y,40,40)
    
    fill(executeColor)
    rect(this.x + 80,this.y,40,40)
    
    fill(memoryColor);
    rect(this.x + 120,this.y,40,40)
    
    fill(wbColor);
    rect(this.x + 160,this.y,40,40)
    
  }

  clicked() {
    if(dist(this.x,this.y,mouseX,mouseY) < 40) {
      return this;
    }
      
  }
  
}

function mousePressed() {
  switch(mouseButton) {
    case LEFT:

       case "Pipeline":
         let index = int(mouseY / 40);
         if(pipelineTable[index] == 0) {
           pipelineTable[index] = 1;
           
           intX = int(mouseX / 40);
           p = new Pipeline()
           pipeline.push(p.setXY(intX * 40,index * 40));
           redraw()
         }
        break;
  }
}

function keyPressed() {
  switch(keyCode) {
    case BACKSPACE:
      // line = pipeline[pipeline.length - 1];
      // pipelineTable[line.y / 40] = 0;
      // print(pipelineTable);
      // pipeline.splice(pipeline.length - 1,1)

      for(let p of pipeline) {
        pipRemoved = p.clicked();
        if(pipRemoved != null) {
          indexOf = pipeline.indexOf(pipRemoved);
          pipeline.splice(indexOf,1);
        }
      }

      for(let b of blocks) {
        blockRemoved = b.clicked();
        if(blockRemoved != null) {
          indexOf = blocks.indexOf(blockRemoved);
          blocks.splice(indexOf,1);
        }
      }
      
    break;
    
    case 80: // print blocks array
      for(let b of blocks)
        print("b.x: " + b.x + ", b.y:" + b.y);
    break
    
    case 70: //f
    case 69: //e
    case 87: //w
    case 68: //d
    case 77: //m
    case 83: //s
      let index = int(mouseY / 40);
      if(pipelineTable[index] == 0) {
        intX = int(mouseX / 40);
        b = new Block(0,0)
        blocks.push(b.setXY(intX * 40, index * 40));
        // pipeline.push(p.setXY(intX * 40,index * 40));
        redraw()
      }
    break;
  }
  
}
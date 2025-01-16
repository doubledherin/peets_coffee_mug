let grid
let w
let h
let m = 50 // modulus
let shape

function setup() {
  w = windowWidth - (windowWidth % m)
  h = windowHeight - (windowHeight % m)
  createCanvas(min(w, h), min(w, h))
  noStroke() // comment this out and it looks cool too
  grid = new Grid(width, height, m)
  background(255, 240, 219)
  grid.showShapes()
  noLoop()
  grid.showDots()
}

function draw() {}

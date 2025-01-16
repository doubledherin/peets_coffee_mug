let grid
let cellSize = 50

function setup() {
  createCanvas(windowWidth, windowHeight)
  background(255, 240, 219) // beige
  noLoop()
}

function draw() {
  grid = new Grid(width, height, cellSize)
  // grid.showDots()
  grid.showShapes()
}

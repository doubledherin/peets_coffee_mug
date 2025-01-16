class Grid {
  constructor(w, h, cellSize) {
    this.cellSize = cellSize
    this.numRows = h / cellSize
    this.numCols = w / cellSize
    this.dots = []
    this.shapes = []

    this.generateDotsAndNexuses()
    this.generateShapes()
  }

  // Populates this.dots with objects representing dots, soome of which can be "nexuses"
  generateDotsAndNexuses() {
    for (let rowNumber = 1; rowNumber < this.numRows; rowNumber++) {
      for (let columnNumber = 1; columnNumber < this.numCols; columnNumber++) {
        const x = columnNumber * this.cellSize
        const y = rowNumber * this.cellSize

        const isNexus = this.canBeNexus(x, y) && random() < 0.6
        this.dots.push({ x, y, isNexus })
      }
    }
  }

  canBeNexus(x, y) {
    const surroundingDots = [
      ...this.getDotsAbove(x, y),
      ...this.getDotsLeft(x, y),
      ...this.getDotsTopRight(x, y),
      ...this.getDotsTopLeft(x, y),
      ...this.getDotsLsTopLeft(x, y),
      ...this.getDotsLsTopRight(x, y),
    ]

    return surroundingDots.filter((d) => d.isNexus).length === 0
  }

  getDotsAbove(x, y) {
    return this.dots.filter(
      (d) =>
        d.x === x &&
        (d.y === y - this.cellSize || d.y === y - this.cellSize * 2)
    )
  }

  getDotsLeft(x, y) {
    return this.dots.filter(
      (d) =>
        (d.x === x - this.cellSize ||
          d.x === x - this.cellSize * 2 ||
          d.x === x - this.cellSize * 3) &&
        d.y === y
    )
  }

  getDotsTopRight(x, y) {
    return this.dots.filter(
      (d) =>
        (d.x === x + this.cellSize && d.y === y - this.cellSize) ||
        (d.x === x + this.cellSize * 2 && d.y === y - this.cellSize * 2)
    )
  }

  getDotsTopLeft(x, y) {
    return this.dots.filter(
      (d) =>
        (d.x === x - this.cellSize && d.y === y - this.cellSize) ||
        (d.x === x - this.cellSize * 2 && d.y === y - this.cellSize * 2)
    )
  }

  getDotsLsTopLeft(x, y) {
    return this.dots.filter(
      (d) =>
        (d.x === x - this.cellSize && d.y === y - this.cellSize * 2) ||
        (d.x === x - this.cellSize * 2 && d.y === y - this.cellSize)
    )
  }

  getDotsLsTopRight(x, y) {
    return this.dots.filter(
      (d) =>
        (d.x === x + this.cellSize && d.y === y - this.cellSize * 2) ||
        (d.x === x + this.cellSize * 2 && d.y === y - this.cellSize)
    )
  }

  generateShapes() {
    for (const dot of this.dots) {
      if (dot.isNexus) {
        this.shapes.push(new Shape(dot.x, dot.y, this.cellSize))
      }
    }
  }

  showShapes() {
    for (const shape of this.shapes) {
      shape.draw()
    }
  }

  // Used for developmewnt purposes only
  showDots() {
    for (const dot of this.dots) {
      if (dot.isNexus) {
        // Make nexuses red and bigger
        fill(255, 0, 0)
        noStroke()
        circle(dot.x, dot.y, 5)
      } else {
        // Make non-nexuses black and smaller
        fill(0)
        circle(dot.x, dot.y, 3)
      }
    }
  }
}

class Grid {
  constructor(w, h, m) {
    this.m = m
    this.numRows = w / m
    this.numCols = h / m
    this.dots = []
    this.shapes = []
    this.generateDots()
    this.generateShapes()
  }

  generateDots() {
    for (let rowNumber = 1; rowNumber < this.numCols; rowNumber++) {
      for (let columnNumber = 1; columnNumber < this.numRows; columnNumber++) {
        const x = columnNumber * this.m
        const y = rowNumber * this.m

        const canBe = this.canBeNexus(x, y)
        if (canBe) {
          const isNexus = random() < 0.55
          this.dots.push({ x, y, isNexus: isNexus })
        } else {
          this.dots.push({ x, y, isNexus: false })
        }
      }
    }
  }

  canBeNexus(x, y) {
    // check above
    const dotsAbove = this.dots.filter(
      (d) => d.x === x && (d.y === y - this.m || d.y === y - this.m * 2)
    )
    // check left
    const dotsLeft = this.dots.filter(
      (d) =>
        (d.x === x - this.m ||
          d.x === x - this.m * 2 ||
          d.x == x - this.m * 3) &&
        d.y === y
    )
    // check above and to the right
    const dotsTopRight = this.dots.filter(
      (d) =>
        (d.x === x + this.m && d.y === y - this.m) ||
        (d.x === x + this.m * 2 && d.y === y - this.m * 2)
    )

    // check above and to the left
    const dotsTopLeft = this.dots.filter(
      (d) =>
        (d.x === x - this.m && d.y === y - this.m) ||
        (d.x === x - this.m * 2 && d.y === y - this.m * 2)
    )

    // check Ls
    const dotsLsTopLeft = this.dots.filter(
      (d) =>
        (d.x === x - this.m && d.y === y - this.m * 2) ||
        (d.x === x - this.m * 2 && d.y === y - this.m)
    )

    const dotsLsTopRight = this.dots.filter(
      (d) =>
        (d.x === x + this.m && d.y === y - this.m * 2) ||
        (d.x === x + this.m * 2 && d.y === y - this.m)
    )

    // Top row check
    if (dotsAbove.length === 0) {
      return dotsLeft?.filter((d) => d.isNexus)?.length === 0
    }

    // Left edge check
    if (dotsLeft.length === 0) {
      return !this.dotsContainNexus(dotsAbove)
    }
    if (dotsTopLeft.length === 0) {
      return (
        !this.dotsContainNexus(dotsAbove) && !this.dotsContainNexus(dotsLeft)
      )
    }

    // right edge check
    if (dotsTopRight.length === 0) {
      return (
        !this.dotsContainNexus(dotsAbove) && !this.dotsContainNexus(dotsLeft)
      )
    }

    if (
      this.dotsContainNexus(dotsAbove) ||
      this.dotsContainNexus(dotsLeft) ||
      this.dotsContainNexus(dotsTopRight) ||
      this.dotsContainNexus(dotsTopLeft) ||
      this.dotsContainNexus(dotsLsTopLeft) ||
      this.dotsContainNexus(dotsLsTopRight)
    ) {
      return false
    }
    return true
  }

  dotsContainNexus(dots) {
    return dots.some((d) => d.isNexus)
  }

  generateShapes() {
    for (const dot of this.dots) {
      if (dot.isNexus) {
        this.shapes.push(new Shape(dot.x, dot.y, this.m))
      }
    }
  }

  isLeftEdge(x, y) {
    return x === m
  }

  isRightEdge(x, y) {
    return x === m * this.numRows
  }

  isTopEdge(x, y) {
    return y === m
  }

  isBottomEdge(x, y) {
    return y === m * this.numCols
  }

  showDots() {
    for (const dot of this.dots) {
      if (dot.isNexus) {
        fill(255, 0, 0)
        circle(dot.x, dot.y, 5)
      } else {
        fill(0)
        circle(dot.x, dot.y, 3)
      }
    }
  }

  showShapes() {
    for (const shape of this.shapes) {
      shape.draw()
    }
  }
}

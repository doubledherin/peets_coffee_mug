// Returns a shape consisting of 1-4 of the following shape combinations:

// Triangle (dotted, 3-dotted, or solid)
// Diamond (dotted)
// Hourglass (solid)

class Shape {
  constructor(x, y, cellSize) {
    const babyBlue = "#a6c9b8"
    const brickRed = "#c04657"
    const mustard = "#ffbf00"
    this.colors = [babyBlue, brickRed, mustard]
    this.x = x
    this.y = y
    this.cellSize = cellSize
    this.numRows = 8
    this.dotSize = 4
    this.padding = this.dotSize / 2
    this.numElements = random([1, 2, 3, 4])
  }

  draw() {
    stroke(255, 240, 219)
    strokeWeight(2)
    switch (this.numElements) {
      case 1:
        this.drawOneElement()
        break
      case 2:
        this.drawTwoElements()
        break
      case 3:
        this.drawThreeElements()
        break
      case 4:
        this.drawFourElements()
        break
    }
  }

  drawOneElement() {
    const element = random(["triangle", "hourglass", "diamond"])
    const color = random(this.colors)
    switch (element) {
      case "triangle":
        const direction = random(["up", "right", "down", "left"])
        if (random() < 0.5) {
          this.filledTriangle(direction, color)
        } else {
          this.triangleOfDots(this.x, this.y, direction, color)
        }
        break
      case "hourglass":
        this.hourglass(color)
        break
      case "diamond":
        this.diamond(this.x, this.y, color)
        break
    }
  }

  drawTwoElements() {
    const element = random([
      "diamondWithTriangle",
      "hourglassWithTriangleToTheLeft",
      "hourglassWithDiamondOnRight",
    ])
    switch (element) {
      case "diamondWithTriangle":
        this.diamondWithTriangle()
        break
      case "hourglassWithTriangleToTheLeft":
        this.hourglassWithTriangleToTheLeft()
        break
      case "hourglassWithDiamondOnRight":
        this.hourglassWithDiamondOnRight()
        break
    }
  }

  drawThreeElements() {
    const element = random([
      "hourglassWithTwoTrianglesOnLeft",
      "hourglassWithTwoTriangleOnRight",
      "hourglassWithTriangleOnLeftAndDiamondOnRight",
    ])
    const hourglassColor = random(this.colors)
    switch (element) {
      case "hourglassWithTwoTrianglesOnLeft":
        this.hourglassWithTwoTrianglesOnLeft(hourglassColor)
        break
      case "hourglassWithTwoTriangleOnRight":
        this.hourglassWithTwoTriangleOnRight(hourglassColor)
        break
      case "hourglassWithTriangleOnLeftAndDiamondOnRight":
        this.hourglassWithTriangleOnLeftAndDiamondOnRight(hourglassColor)
        break
    }
  }

  drawFourElements() {
    const element = random([
      "hourglassWithTwoTrianglesOnLeftAndDiamondOnRight",
      "hourglassWithTwoTriangleOnRightAndDiamondOnLeft",
    ])
    const hourglassColor = random(this.colors)
    switch (element) {
      case "hourglassWithTwoTrianglesOnLeftAndDiamondOnRight":
        this.hourglassWithTwoTrianglesOnLeftAndDiamondOnRight(hourglassColor)
        break
      case "hourglassWithTwoTriangleOnRightAndDiamondOnLeft":
        this.hourglassWithTwoTriangleOnRightAndDiamondOnLeft(hourglassColor)
        break
    }
  }

  filledTriangle(direction, color) {
    fill(color)
    switch (direction) {
      case "left":
        triangle(
          this.x,
          this.y,
          this.x + this.cellSize,
          this.y - this.cellSize,
          this.x + this.cellSize,
          this.y + this.cellSize
        )
        break
      case "right":
        triangle(
          this.x,
          this.y,
          this.x - this.cellSize,
          this.y - this.cellSize,
          this.x - this.cellSize,
          this.y + this.cellSize
        )
        break
      case "down":
        triangle(
          this.x,
          this.y,
          this.x - this.cellSize,
          this.y - this.cellSize,
          this.x + this.cellSize,
          this.y - this.cellSize
        )
        break
      case "up":
        triangle(
          this.x,
          this.y,
          this.x - this.cellSize,
          this.y + this.cellSize,
          this.x + this.cellSize,
          this.y + this.cellSize
        )
        break
    }
  }

  triangleOfDots(x, y, direction, dotColor) {
    const angleMap = {
      up: 0,
      right: HALF_PI,
      down: PI,
      left: -HALF_PI,
    }
    const angle = angleMap[direction]

    push()
    noStroke()
    translate(x, y)
    rotate(angle)
    translate(-x, -y)

    fill(dotColor)
    for (let i = 0; i < this.numRows; i++) {
      let numDotsInRow = i * 2 + 1
      const widthOfAllDotsInRow =
        numDotsInRow * (this.dotSize + this.padding) - this.padding
      const xCoordinateOfFirstDotInRow =
        x - widthOfAllDotsInRow / 2 + this.padding
      for (let j = 0; j < numDotsInRow; j++) {
        const dotX =
          xCoordinateOfFirstDotInRow + j * (this.dotSize + this.padding)
        const dotY = y + i * (this.dotSize + this.padding) + this.padding * 2
        ellipse(dotX, dotY, this.dotSize)
      }
    }
    pop()
  }

  diamond(x, y, diamondColor) {
    push()
    noStroke()
    this.triangleOfDots(x, y - this.cellSize, "up", diamondColor)
    this.triangleOfDots(x, y + this.cellSize, "down", diamondColor)
    pop()
  }

  hourglass(c) {
    fill(c)
    triangle(
      this.x,
      this.y,
      this.x - this.cellSize,
      this.y + this.cellSize,
      this.x + this.cellSize,
      this.y + this.cellSize
    )
    triangle(
      this.x,
      this.y,
      this.x - this.cellSize,
      this.y - this.cellSize,
      this.x + this.cellSize,
      this.y - this.cellSize
    )
  }

  hourglassWithDiamondOnRight(hourglassColor) {
    const diamondColor = random(this.colors.filter((c) => c !== hourglassColor))
    this.diamond(this.x + this.cellSize, this.y, diamondColor)
  }

  hourglassWithDiamondToTheLeft(hourglassColor) {
    const diamondColor = random(this.colors.filter((c) => c !== hourglassColor))
    this.diamond(this.x - this.cellSize, this.y, diamondColor)
  }

  triangleOfThreeDots(x, y, direction, dotColor) {
    const numRows = 6
    const angleMap = {
      up: 0,
      right: HALF_PI,
      down: PI,
      left: -HALF_PI,
    }
    const angle = angleMap[direction]

    push()
    noStroke()
    translate(x, y)
    rotate(angle)
    translate(-x, -y)
    fill(dotColor)

    const verticalPadding = this.dotSize
    const horizontalPadding = this.dotSize
    for (let i = 0; i < numRows; i++) {
      const num3DotsInRow = i + 1
      const width3DotsInRow = 3 * this.dotSize
      const widthOfAllDotsInRow =
        num3DotsInRow * width3DotsInRow +
        horizontalPadding * (num3DotsInRow - 1)
      const xCoordinateOfFirstDotInRow =
        x - widthOfAllDotsInRow / 2 + horizontalPadding / 2
      for (let j = 0; j < num3DotsInRow; j++) {
        const dotX =
          xCoordinateOfFirstDotInRow + j * (width3DotsInRow + horizontalPadding)
        const dotY =
          y + i * (this.dotSize + verticalPadding) + verticalPadding * 2
        this.threeDots(dotX, dotY, this.dotSize)
      }
    }

    pop()
  }

  threeDots(dotX, dotY, dotSize) {
    ellipse(dotX, dotY, dotSize)
    ellipse(dotX + dotSize, dotY, dotSize)
    ellipse(dotX + dotSize * 2, dotY, dotSize)
  }

  hourglassWithTwoTrianglesOnLeft(hourglassColor) {
    this.hourglass(hourglassColor)
    const c1 = random(this.colors.filter((c) => c !== hourglassColor))
    this.triangleOfThreeDots(this.x, this.y, "right", c1)
    const c2 = random(
      this.colors.filter((c) => c !== hourglassColor && c !== c1)
    )
    fill(c2)
    triangle(
      this.x - this.cellSize * 2,
      this.y,
      this.x - this.cellSize,
      this.y - this.cellSize,
      this.x - this.cellSize,
      this.y + this.cellSize
    )
  }

  hourglassWithTwoTriangleOnRight(hourglassColor) {
    this.hourglass(hourglassColor)
    const c1 = random(this.colors.filter((c) => c !== hourglassColor))
    this.triangleOfThreeDots(this.x, this.y, "left", c1)
    const c2 = random(
      this.colors.filter((c) => c !== hourglassColor && c !== c1)
    )
    fill(c2)
    triangle(
      this.x + this.cellSize * 2,
      this.y,
      this.x + this.cellSize,
      this.y - this.cellSize,
      this.x + this.cellSize,
      this.y + this.cellSize
    )
  }

  hourglassWithTriangleOnLeftAndDiamondOnRight(hourglassColor) {
    const c1 = random(this.colors.filter((c) => c !== hourglassColor))
    this.triangleOfThreeDots(this.x, this.y, "right", c1)
    this.hourglass(hourglassColor)
    const c2 = random(
      this.colors.filter((c) => c !== c1 && c !== hourglassColor)
    )
    this.diamond(this.x + this.cellSize, this.y, c2)
  }

  hourglassWithTwoTrianglesOnLeftAndDiamondOnRight(hourglassColor) {
    this.hourglassWithTwoTrianglesOnLeft(hourglassColor)
    this.hourglassWithDiamondOnRight(hourglassColor)
  }

  hourglassWithTwoTriangleOnRightAndDiamondOnLeft(hourglassColor) {
    this.hourglassWithTwoTriangleOnRight(hourglassColor)
    this.hourglassWithDiamondToTheLeft(hourglassColor)
  }

  diamondWithTriangle() {
    const diamondColor = random(this.colors)
    this.diamond(this.x, this.y, diamondColor)

    // triangle should always be solid when next to a diamond, and a different color from diamond
    fill(random(this.colors.filter((c) => c !== diamondColor)))
    triangle(
      this.x + this.cellSize,
      this.y,
      this.x,
      this.y - this.cellSize,
      this.x + this.cellSize * 2,
      this.y - this.cellSize
    )
  }

  hourglassWithTriangleToTheLeft() {
    const hourglassColor = random(this.colors)
    this.hourglass(hourglassColor)
    // since hourglass is always solid, triangle should be dotted
    const c = random(this.colors.filter((c) => c !== hourglassColor))
    this.triangleOfThreeDots(this.x, this.y, "right", c)
  }
}

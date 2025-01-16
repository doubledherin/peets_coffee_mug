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
    this.padding = 2
    this.numElements = random([1, 2, 3, 4])
    this.type = random(["left", "right", "up", "down", "hourglass", "diamond"])
    this.fillType = random(["solid", "dotted, three-dotted"])
  }

  triangleOf3Dots(x, y, direction, dotColor) {
    const numRows = 6
    const angleMap = {
      up: 0,
      right: HALF_PI,
      down: PI,
      left: -HALF_PI,
    }
    const angle = angleMap[direction]

    push()
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

  triangleOfDots(x, y, direction, dotColor) {
    const angleMap = {
      up: 0,
      right: HALF_PI,
      down: PI,
      left: -HALF_PI,
    }
    const angle = angleMap[direction]

    push()
    translate(x, y)
    rotate(angle)
    translate(-x, -y)
    // noStroke()
    stroke(255, 240, 219)
    strokeWeight(3)
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
        noStroke()
        ellipse(dotX, dotY, this.dotSize)
      }
    }
    pop()
  }

  diamond(x, y, diamondColor) {
    stroke(255, 240, 219)
    strokeWeight(3)
    this.triangleOfDots(x, y - this.cellSize, "up", diamondColor)
    this.triangleOfDots(x, y + this.cellSize, "down", diamondColor)
    noStroke()
  }

  hourglass(c) {
    fill(c)
    stroke(255, 240, 219)
    strokeWeight(3)
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
    noStroke()
  }

  hourglassWithDiamondToTheRight(hourglassColor) {
    const diamondColor = random(this.colors.filter((c) => c !== hourglassColor))
    this.diamond(this.x + this.cellSize, this.y, diamondColor)
  }

  hourglassWithDiamondToTheLeft(hourglassColor) {
    const diamondColor = random(this.colors.filter((c) => c !== hourglassColor))
    this.diamond(this.x - this.cellSize, this.y, diamondColor)
  }

  hourglassWithTwoTrianglesToTheLeft(hourglassColor) {
    this.hourglass(hourglassColor)
    const c1 = random(this.colors.filter((c) => c !== hourglassColor))
    this.triangleOf3Dots(this.x, this.y, "right", c1)
    const c2 = random(
      this.colors.filter((c) => c !== hourglassColor && c !== c1)
    )
    fill(c2)
    stroke(255, 240, 219)
    strokeWeight(3)
    triangle(
      this.x - this.cellSize * 2,
      this.y,
      this.x - this.cellSize,
      this.y - this.cellSize,
      this.x - this.cellSize,
      this.y + this.cellSize
    )
  }

  hourglassWithTwoTrianglesToTheRight(hourglassColor) {
    this.hourglass(hourglassColor)
    const c1 = random(this.colors.filter((c) => c !== hourglassColor))
    this.triangleOf3Dots(this.x, this.y, "left", c1)
    const c2 = random(
      this.colors.filter((c) => c !== hourglassColor && c !== c1)
    )
    fill(c2)
    stroke(255, 240, 219)
    strokeWeight(3)
    triangle(
      this.x + this.cellSize * 2,
      this.y,
      this.x + this.cellSize,
      this.y - this.cellSize,
      this.x + this.cellSize,
      this.y + this.cellSize
    )
  }

  hourglassWithTriangleOnTheLeftAndDiamondOnTheRight(hourglassColor) {
    const c1 = random(this.colors.filter((c) => c !== hourglassColor))
    this.triangleOf3Dots(this.x, this.y, "right", c1)
    this.hourglass(hourglassColor)
    const c2 = random(
      this.colors.filter((c) => c !== c1 && c !== hourglassColor)
    )
    this.diamond(this.x + this.cellSize, this.y, c2)
  }

  hourglassWithTwoTrianglesToTheLeftAndDiamondOnTheRight(hourglassColor) {
    this.hourglassWithTwoTrianglesToTheLeft(hourglassColor)
    this.hourglassWithDiamondToTheRight(hourglassColor)
  }

  hourglassWithTwoTrianglesToTheRightAndDiamondOnTheLeft(hourglassColor) {
    this.hourglassWithTwoTrianglesToTheRight(hourglassColor)
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
    this.triangleOf3Dots(this.x, this.y, "right", c)
  }

  draw() {
    const dotted = random() < 0.5
    const r = random()
    const hourglassColor = random(this.colors)
    if (this.numElements === 4) {
      if (r < 0.5) {
        return this.hourglassWithTwoTrianglesToTheLeftAndDiamondOnTheRight(
          hourglassColor
        )
      }
      return this.hourglassWithTwoTrianglesToTheRightAndDiamondOnTheLeft(
        hourglassColor
      )
    }

    if (this.numElements === 3) {
      const hourglassColor = random(this.colors)
      this.hourglass(hourglassColor)
      if (r < 0.33) {
        return this.hourglassWithTwoTrianglesToTheLeft(hourglassColor)
      }
      if (r < 0.66) {
        return this.hourglassWithTwoTrianglesToTheRight(hourglassColor)
      }
      return this.hourglassWithTriangleOnTheLeftAndDiamondOnTheRight(
        hourglassColor
      )
    }
    if (this.numElements === 2) {
      if (r < 0.33) {
        return this.hourglassWithDiamondToTheRight()
      }
      if (r < 0.66) {
        return this.diamondWithTriangle()
      }
      return this.hourglassWithTriangleToTheLeft()
    }
    const c = random(this.colors)
    switch (this.type) {
      case "left":
        if (dotted) {
          this.triangleOfDots(this.x, this.y, "left", c)
        } else {
          fill(random(this.colors))
          triangle(
            this.x,
            this.y,
            this.x + this.cellSize,
            this.y - this.cellSize,
            this.x + this.cellSize,
            this.y + this.cellSize
          )
        }
        break
      case "right":
        if (dotted) {
          this.triangleOfDots(this.x, this.y, "right", c)
        } else {
          fill(random(this.colors))
          triangle(
            this.x,
            this.y,
            this.x - this.cellSize,
            this.y - this.cellSize,
            this.x - this.cellSize,
            this.y + this.cellSize
          )
        }
        break
      case "up":
        if (dotted) {
          this.triangleOfDots(this.x, this.y, "up", c)
        } else {
          fill(random(this.colors))
          triangle(
            this.x,
            this.y,
            this.x - this.cellSize,
            this.y + this.cellSize,
            this.x + this.cellSize,
            this.y + this.cellSize
          )
        }
        break
      case "down":
        if (dotted) {
          this.triangleOfDots(this.x, this.y, "down", c)
        } else {
          fill(random(this.colors))

          triangle(
            this.x,
            this.y,
            this.x - this.cellSize,
            this.y - this.cellSize,
            this.x + this.cellSize,
            this.y - this.cellSize
          )
        }
        break

      // diamonds are always dotted
      case "diamond":
        this.diamond(this.x, this.y, c)
        break

      // hourglass is never dotted
      case "hourglass":
        this.hourglass(random(this.colors))
        break
    }
  }
}

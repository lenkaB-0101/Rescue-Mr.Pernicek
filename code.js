let canvas = document.querySelector("#canvas")
let width = 600
let height = 600
let ctx = canvas.getContext("2d")
let blockSize = 30
let keys = []

canvas.width = width
canvas.height = height

let player = {
  x: 8,
  y: 1
}

let wall = new Image()
wall.src = "images/zed.png"

let hero = new Image()
hero.src = "images/pernicek_dolu.png"

let board = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

function generateBoard() {
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board[y].length; x++) {
      if (board[y][x] === 1) {
        ctx.drawImage(wall, x * blockSize, y * blockSize, blockSize, blockSize)
      }
    }
  }
}

function draw() {
  ctx.clearRect(player.x * blockSize, player.y * blockSize, blockSize, blockSize)

  generateBoard()
  movement()

  ctx.drawImage(hero, player.x * blockSize, player.y * blockSize, blockSize, blockSize)
}

function movement() {
  if (keys[39] && canMove(player.x + 1, player.y)) {
    // šipka doprava
    hero.src = "images/pernicek_doprava.png"
    player.x++
  }

  if (keys[37] && canMove(player.x - 1, player.y)) {
    // šipka doleva
    hero.src = "images/pernicek_doleva.png"
    player.x--
  }

  if (keys[38] && canMove(player.x, player.y - 1)) {
    // šipka nahoru
    hero.src = "images/pernicek_nahoru.png"
    player.y--
  }

  if (keys[40] && canMove(player.x, player.y + 1)) {
    // šipka dolů
    hero.src = "images/pernicek_dolu.png"
    player.y++
  }
}

function canMove(x, y) {
   return (y >= 0 && y < board.length && x >= 0 && x < board[y].length && board[y][x] != 1)
}


window.addEventListener("load", draw)

document.body.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true
  draw()
})

document.body.addEventListener("keyup", function (e) {
  keys[e.keyCode] = false
  draw()
})

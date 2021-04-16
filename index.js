const bodyParser = require('body-parser')
const express = require('express')
const boardData = require('./data/board')
const snakeData = require('./data/snake')
const distanceData = require ('./game/distance')
const boundsData = require('./game/bounds')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))

const POSSIBLEMOVES = ['up', 'down', 'left', 'right']

function handleIndex(request, response) {
  var battlesnakeInfo = {
    apiversion: '1',
    author: 'Felix Indrawan, Nancy Zhang, Michael Buchar, Ishita Shah',
    color: '#77625C',
    head: 'rudolph',
    tail: 'bolt',
    shout: 'OWA OWA'
  }
  response.status(200).json(battlesnakeInfo)
}

function handleStart(request, response) {
  var gameData = request.body

  console.log('START')
  response.status(200).send('ok')
}

function handleMove(request, response) {
  var move = null;
  var gameData = request.body
  var mySnake = gameData.you;
  boardData.setGameData(gameData)
  var snakes = boardData.getSnakes()

  snakes.forEach(function (snake, index) {
    var snake1 = require('./data/snake')
    snake1.setSnake(snake)
    var snakeIds = snake1.getSnakeId()
  })

  if (mySnake.health < 30) {
    console.log("status: lowhp")
    move = handleEat(boardData, mySnake)
  }

  if (!move) {
    console.log("status: kill")
    var snakesDistance = distanceData.getDistanceFromSmallerSnakes(mySnake, boardData.getSnakes())
    if (snakesDistance.length > 1)
      move = handleFight(boardData, mySnake, snakesDistance)
  }

  if (!move) {
    console.log("status: eat")
    move = handleEat(boardData,mySnake)
  }

  if (!move) {
    console.log("status: roam")
    for (var dir in POSSIBLEMOVES){
      if (avoidSelf(dir) && boundsData.inBoundsMove(dir, mySnake)){
        move = dir;
      }
    }
  }

  console.log (distanceData.getDistanceFromSmallerSnakes(
    mySnake, boardData.getSnakes()
  ))

  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move
  })
}

function handleEat(boardData, mySnake) {
  var foodsDistance = distanceData.getDistanceFromFoods(mySnake.head, boardData.getFood())

  for (var food of foodsDistance) {
    var directions = getDirections(mySnake, food)

    for (var dir of directions){
      if (avoidSelf(dir))
        if (boundsData.inBoundsMove(dir, mySnake))
          return dir;
    }
  }

  return null;
}

function handleFight(boardData, mySnake, snakesDistance) {

  for (var snake of snakesDistance) {
    var snakeDir = getSnakeDir(snake);
    var directions = getDirections(mySnake, snakeDir)

    for (var dir of directions){
      if (avoidSelf(dir))
        if (boundsData.inBoundsMove(dir, mySnake))
          return dir;
    }
  }

  return null;
}

function getSnakeDir(snake) {
  var diffX = snake.body[0].x - snake.body[1].x
  var diffY = snake.body[0].y - snake.body[1].y

  return {x: snake.head.x + diffX, y: snake.head.yx + diffY}
}

function getDirections(mySnake, dest) {
  var directions = []
  var diffX = dest.x - mySnake.head.x
  var diffY = dest.y - mySnake.head.y

  console.log(diffX + " d " + diffY)

  if (Math.abs(diffX) > Math.abs(diffY)) {
    directions.push((diffX >= 1) ? POSSIBLEMOVES[3] : POSSIBLEMOVES[2])

    if (diffY != 0)
     directions.push((diffY >= 1) ? POSSIBLEMOVES[0] : POSSIBLEMOVES[1])
  } else {
    directions.push((diffY >= 1) ? POSSIBLEMOVES[0] : POSSIBLEMOVES[1])

    if (diffX != 0)
     directions.push((diffX >= 1) ? POSSIBLEMOVES[3] : POSSIBLEMOVES[2])     
  }

  return directions
}

function avoidSelf (move) {
  var mySnake = require('./data/snake')
  var snakeBody = mySnake.getSnakeBody()
  snakeBody.slice(0,mySnake.getSnakeLength-1)
  console.log(mySnake.getSnakeBody())
  console.log(move)
  console.log(mySnake.getSnakeHead())
  for (var bodyPart of snakeBody) {
    switch (move) {
      case 'up':
        if ((mySnake.getSnakeHead().x == bodyPart.x) && (mySnake.getSnakeHead().y == bodyPart.y-1))
          {console.log("cannot go up") 
          return false}
        break
      case 'down':
        if ((mySnake.getSnakeHead().x == bodyPart.x) && (mySnake.getSnakeHead().y == bodyPart.y+1))
          {console.log("cannot go down") 
          return false}
        break;
      case 'left':
        if ((mySnake.getSnakeHead().x == bodyPart.x+1) && (mySnake.getSnakeHead().y == bodyPart.y))
          {console.log("cannot go left") 
          return false}
        break;
      case 'right':
        if ((mySnake.getSnakeHead().x == bodyPart.x-1) && (mySnake.getSnakeHead().y == bodyPart.y)) 
          {console.log("cannot go right") 
          return false}
        break;
      default:
        return false // not a valid move
    }
  }
  return true
}


function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}

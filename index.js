const bodyParser = require('body-parser')
const express = require('express')
const boardData = require('./data/board')
const snakeData = require('./data/snake')
const distanceData = require ('./game/distance')

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
    author: 'Felix Indrawan, Nancy Zhang, Michael Buchar',
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
    console.log(snakeIds)
  })

  move = handleEat(boardData, mySnake);

  console.log (distanceData.getDistanceFromEdibleSnakes(
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
    console.log (food)
    var directions = getDirections(mySnake, food)

    console.log("dir "+ directions)
    for (var dir of directions){
      console.log("Avoid " + avoidSelf(dir))
      if (avoidSelf(boardData, dir))
        return dir;
    }
  }

  return up;
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

function avoidSelf (gameData, move) {
  snakeData.setSnake(gameData)
  var snakeBody = snakeData.getSnakeBody()
  for (var bodyPart of snakeBody) {
    switch (move) {
      case 'up':
        if ((snakeData.getSnakeHead().x == bodyPart.x) && (snakeData.getSnakeHead().y == bodyPart.y+1)) {return false;}
      break;
    case 'down':
      if ((snakeData.getSnakeHead().x == bodyPart.x) && (snakeData.getSnakeHead().y == bodyPart.y-1)) {return false;}
      break;
    case 'left':
      if ((snakeData.getSnakeHead().x == bodyPart.x-1) && (snakeData.getSnakeHead().y == bodyPart.y)) {return false;}
      break;
    case 'right':
      if ((snakeData.getSnakeHead().x == bodyPart.x+1) && (snakeData.getSnakeHead().y == bodyPart.y)) {return false;}
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

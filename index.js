const bodyParser = require('body-parser')
const express = require('express')
const boardData = require('./data/board')
const snakeData = require('./data/snake')

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/', handleIndex)
app.post('/start', handleStart)
app.post('/move', handleMove)
app.post('/end', handleEnd)

app.listen(PORT, () => console.log(`Battlesnake Server listening at http://127.0.0.1:${PORT}`))


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
  var gameData = request.body
  boardData.setGameData(gameData)
  var snakes = boardData.getSnakes()

  snakes.forEach(function (snake, index) {
    var snake1 = require('./data/snake')
    snake1.setSnake(snake)
    var snakeIds = snake1.getSnakeId()
    console.log(snakeIds)
  })

  var possibleMoves = ['up', 'down', 'left', 'right']
  var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

  console.log('MOVE: ' + move)
  response.status(200).send({
    move: move
  })
}

function handleEnd(request, response) {
  var gameData = request.body

  console.log('END')
  response.status(200).send('ok')
}

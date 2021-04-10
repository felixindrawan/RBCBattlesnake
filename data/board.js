
var gameId
var width
var height
var food
var turn
var snakes

function setGameData(gameData) {
  this.gameId = gameData.game.id
  this.width = gameData.board.width
  this.height = gameData.board.height
  this.food = gameData.board.food
  this.turn = gameData.board.turn
  this.snakes = gameData.board.snakes
}

function setGameId(gameId) {
  this.gameId = gameId
}

function getGameId() {
  return this.gameId
}

function setWidth(width) {
  this.width = width
}

function getWidth() {
  return this.width
}

function setHeight(height) {
  this.height = height
}

function getHeight() {
  return this.height
}

function setFood(food) {
  this.food = food
}

function getFood() {
  return this.food
}

function setTurn(turn) {
  this.turn = turn
}

function getTurn() {
  return this.turn
}

function setSnakes(snakes) {
  this.snakes = snakes
}

function getSnakes() {
  return this.snakes
}

function isOutofBounds(gamedata){
  return isCorner(gameData) || isEdge(gameData)
}
function isCorner(gameData){
  potential_corner=[0,10]
  return (gameData.you.head.x in potential_corner &&gameData.you.head.y in potential_corner)
}
function isEdge(gameData){
  on_edge=[0,10]
  return (gameData.you.head.x in potential_corner ||gameData.you.head.y in potential_corner)
}
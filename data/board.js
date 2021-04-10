
var gameId
var width
var height
var food
var turn
var snakes

module.exports = {
setGameData: function (gameData) {
  this.gameId = gameData.game.id
  this.width = gameData.board.width
  this.height = gameData.board.height
  this.food = gameData.board.food
  this.turn = gameData.board.turn
  this.snakes = gameData.board.snakes
},

setGameId: function (gameId) {
  this.gameId = gameId
},

getGameId: function () {
  return this.gameId
},

setWidth: function (width) {
  this.width = width
},

getWidth: function () {
  return this.width
},

setHeight: function (height) {
  this.height = height
},

getHeight: function () {
  return this.height
},

setFood: function (food) {
  this.food = food
},

getFood: function () {
  return this.food
},

setTurn: function (turn) {
  this.turn = turn
},

getTurn: function () {
  return this.turn
},

setSnakes: function (snakes) {
  this.snakes = snakes
},

getSnakes: function () {
  return this.snakes
},

isOutofBounds: function (gamedata){
  return isCorner(gameData) || isEdge(gameData)
},
isCorner: function (gameData){
  potential_corner=[0,10]
  return (gameData.you.head.x in potential_corner &&gameData.you.head.y in potential_corner)
},
isEdge: function (gameData){
  on_edge=[0,10]
  return (gameData.you.head.x in potential_corner ||gameData.you.head.y in potential_corner)
},
}
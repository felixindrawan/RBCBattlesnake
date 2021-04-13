var snakeId
var health
var body
var head
var length

module.exports = {
  setSnake: function (snake) {
    this.snakeId = snake.id
    this.health = snake.health
    this.body = snake.body
    this.head = snake.head
    this.length = snake.length
  },

  setSnakeId: function (snakeId) {
    this.snakeId = snakeId
  },

  getSnakeId: function () {
    return this.snakeId
  }

  getSnakeLength: function (id) {
    return this.length
  }
  getSnakeHealth: function(){
    return this.health
  }
  getSnakeLength: function(){
    return this.length
  }
  getSnakeBody: function(){
    return this.body
  }
  getSnakeHead: function(){
    return this.head
  }
}
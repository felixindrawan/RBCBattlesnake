module.exports = {
  inBoundsMove: function(move, mySnake) {
    console.log(mySnake.head)
    correspondingloc = module.exports.correspondingMove(move, mySnake)
    var myLength = require('../data/snake')
    myLength.setSnake(mySnake)
    myLength.getSnakeLength()
    result = module.exports.isOut(correspondingloc)
    potential = module.exports.isPotentialCorner(correspondingloc)
    if (result) {
      return false
    }
    if (myLength > 3 && potential) {
      return false
    }
    return true
  },
  // isCorner: function (coordinate){
  //   potential_corner=[-1,11]
  //   return (coordinate in potential_corner && coordinate in potential_corner)
  // },
  isOut: function(coordinate) {
    out = [-1, 11]

    return (out.includes(coordinate.x) || out.includes(coordinate.y))
  },
  isPotentialCorner: function(coordinate) {
    potential_corner = [0, 10]
    return (potential_corner.includes(coordinate.x) && potential_corner.includes(coordinate.y))
  },
  correspondingMove: function(move, mySnake) {
    var newHead = mySnake.head
    console.log("newH ")
    console.log( newHead)
    if (move.localeCompare('up') == 0) {
      newHead.y = newHead.y + 1
      return newHead
    } else if (move.localeCompare('down') == 0) {
      newHead.y = newHead.y - 1
      return newHead
    } else if (move.localeCompare('left') == 0) {
      newHead.x = newHead.x - 1
      return newHead
    } else if (move.localeCompare('right') == 0){
      newHead.x = newHead.x + 1
      return newHead
    }
  },
}
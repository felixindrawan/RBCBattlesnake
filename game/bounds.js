module.exports = {
  inBoundsMove: function(move, mySnake) {
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
    return (coordinate.x in out || coordinate.y in out)
  },
  isPotentialCorner: function(coordinate) {
    potential_corner = [0, 10]
    return (coordinate.x in potential_corner && coordinate.y in potential_corner)
  },
  correspondingMove: function(move, mySnake) {
    var newHead = require('../data/snake')
    newHead.setSnake(mySnake)
    newHead.getSnakeHead()
    if (move.localeCompare('up') == 0) {
      newHead.y = newHead.y + 1
      return newHead
    }
    else if (move.localeCompare('down') == 0) {
      newHead.y = newHead.y - 1
      return newHead
    } else if (move.localeCompare('left') == 0) {
      newHead.x = newHead.x - 1
      return newHead
    } else {
      newHead.x = newHead.x + 1
      return newHead
    }
  },
}
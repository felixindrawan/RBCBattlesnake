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
    return (coordinate in out || coordinate in out)
  },
  isPotentialCorner: function(coordinate) {
    potential_corner = [0, 10]
    return (coordinate in potential_corner && coordinate in potential_corner)
  },
  correspondingMove: function(move, mySnake) {
    var newHead = require('../data/snake')
    newHead.setSnake(mySnake)
    newHead.getSnakeHead()
    if (move.localeCompare('up') == 0) {
      return newHead.y += 1
    }
    else if (move.localeCompare('down') == 0) {
      return newHead.y -= 1
    } else if (move.localeCompare('left') == 0) {
      return newHead.x -= 1
    } else {
      return newHead.x += 1
    }
  },
}
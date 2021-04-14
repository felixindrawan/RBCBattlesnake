module.exports = {
  inBoundsMove: function(move){
    correspondingloc=correspondingMove(move)
    var myLength = require('./data/snake')
    myLength.getSnakeLength()
    if (isOut(correspondingloc)){
      return False
    }
    if myLength > 3 && isPotentialCorner(correspondingloc)){
      return False
    } 
    return True
    }
  },
  // isCorner: function (coordinate){
  //   potential_corner=[-1,11]
  //   return (coordinate in potential_corner && coordinate in potential_corner)
  // },
  isOut: function (coordinate){
    on_edge=[-1,11]
    return (coordinate in potential_corner ||coordinate in potential_corner)
  },
  isPotentialCorner: function (coordinate){
    potential_corner=[0,10]
    return ( coordinate in potential_corner && coordinate in potential_corner)
  },
  correspondingMove: function (move){
    var newHead = require('./data/snake')
    newHead.getSnakeHead()
    if (move.localeCompare('up')== 0){
      return newHead.y += 1
    }
    } else if (move.localeCompare('down')== 0) {
      return newHead.y -= 1
    } else if (move.localeCompare('left')== 0) {
      return newHead.x -= 1
    }else {
      return newHead.x += 1
    }
  },
}
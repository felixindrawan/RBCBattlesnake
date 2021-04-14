module.exports = {
  getDistanceBetweenTwoPoints: function(a, b) {
    return (Math.abs(b.x - a.x) + Math.abs(b.y - a.y))
  },

  getDistanceFromFoods: function(head, unsortedFoods) {
    var sortedFoods = unsortedFoods

    for (var food of sortedFoods) {
      food.distance = module.exports.getDistanceBetweenTwoPoints(head, food)
    }

    sortedFoods.sort(function(a, b) {
      return a.distance - b.distance
    })

    return sortedFoods
  },

  getDistanceFromEdibleSnakes: function(mySnake, unsortedSnakes) {
    var edibleSnakes = []
    for (var snake of unsortedSnakes) {
      if (mySnake.body.length > snake.body.length) {
        if (mySnake.id != snake.id) {
          edibleSnakes.push(snake)
        }
      }
    }

    for (var snake of edibleSnakes) {
      snake.distance = module.exports.getDistanceBetweenTwoPoints(mySnake.head, food)
    }

    edibleSnakes.sort(function(a, b) {
      return a.distance - b.distance
    })

    return edibleSnakes
  },
}
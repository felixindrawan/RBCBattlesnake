module.exports = {
  getDistanceBetweenTwoPoints: function(a, b) {
    return (Math.abs(b.x - a.x) + Math.abs(b.y - a.y))
  },

  getDistanceFromFoods: function(head, unsortedFoods) {
    var sortedFoods = unsortedFoods

    if (sortedFoods) {
      for (var food of sortedFoods) {
        food.distance = module.exports.getDistanceBetweenTwoPoints(head, food)
      }

      sortedFoods.sort(function(a, b) {
        return a.distance - b.distance
      })
    }
    return sortedFoods
  },

  getDistanceFromSmallerSnakes: function(mySnake, unsortedSnakes) {
    var smallerSnakes = []
    for (var snake of unsortedSnakes) {
      if (mySnake.body.length > snake.body.length) {
        if (mySnake.id != snake.id) {
          smallerSnakes.push(snake)
        }
      }
    }

    if (smallerSnakes)
    for (var snake of smallerSnakes) {
      snake.distance = module.exports.getDistanceBetweenTwoPoints(mySnake.head, food)
    }

    smallerSnakes.sort(function(a, b) {
      return a.distance - b.distance
    })

    return smallerSnakes
  },
}
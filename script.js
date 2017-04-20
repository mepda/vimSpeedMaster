document.addEventListener('DOMContentLoaded', function() {

  var player = document.querySelector('#player');
  var scoreboard = document.querySelector('#scoreboard');
  player.style.top = '340px';
  player.style.left = '620px';
  gameScore = score();

  var score = document.querySelector('#score');
  score.textContent = gameScore.getScore();

  function startGame() {
    snow1 = createGameElement('snow');

    document.addEventListener('keydown', function(event) {
      var player = document.querySelector('#player');
      var keyCode = event.which;

      if (keyCode === 74 || keyCode === 40) moveDown1(player); 
      if (keyCode === 75 || keyCode === 38) moveUp1(player); 
      if (keyCode === 72 || keyCode === 37) moveLeft1(player);
      if (keyCode === 76 || keyCode === 39) moveRight1(player);
      
      if (snow1) {      
        if (snow1.getLeftPosition() === player.style.left && snow1.getTopPosition() === player.style.top) {
          gameScore.incrementScore1();
          score.textContent = gameScore.getScore();

          snow = document.querySelector('#snow');
          snow.remove()
          snow1 = null;

          snow1 = createGameElement('snow');
        }
      }
    });
  }

  function score() {
    var score = 0;
    return {
      getScore: function() {
        return score;
      },
      incrementScore1: function() {
        score += 1; 
      },
    }
  }

  function createGameElement(type) {
    var color = color;
    var leftPosition = (Math.floor(Math.random() * 1240 / 20) * 20) + 'px';
    var topPosition = (Math.floor(Math.random() * 660 / 20) * 20) + 'px';

    var newSpan = document.createElement('span');
    // newSpan.style.backgroundColor = color;
    newSpan.setAttribute('id', 'snow');
    newSpan.style.left = leftPosition;
    newSpan.style.top = topPosition;
    document.querySelector('#elementDiv').appendChild(newSpan);

    return {
      getLeftPosition: function() {
        return leftPosition; 
      },
      getTopPosition: function() {
        return topPosition;
      },
      changeColor: function(newColor) {
        color = newColor;
      }
    }
  }

  function moveDown1(player, multipler) {
    var multipler = multipler || 1;
    var num = Number(player.style.top.slice(0, -2))
    if (num < 660) num += 20;
    player.style.top = num + 'px';
  }

  function moveUp1(player, multipler) {
    var multipler = multipler || 1;
    var num = Number(player.style.top.slice(0, -2))
    if (num > 0) num -= 20;
    player.style.top = num + 'px';
  }

  function moveRight1(player, multipler) {
    var multipler = multipler || 1;
    var num = Number(player.style.left.slice(0, -2))
    if (num < 1240) num += 20;
    player.style.left = num + 'px';
  }

  function moveLeft1(player, multipler) {
    var multipler = multipler || 1;
    var num = Number(player.style.left.slice(0, -2))
    if (num > 0) num -= 20;
    player.style.left = num + 'px';
  }

  startGame();
});


// function randomElement(speed) {
//   return {
//     speed: speed,
//     verticalPosition: 0,
//     horizontalPosition: function() {
//       return Math.floor(Math.random()*310)*4 + 'px';
//     },
//     incrementVertical: function() {
//       var self = this;
//       var vertIncrement = setInterval(function() {
//         self.verticalPosition = self.verticalPosition += 20;
//         self.displayOnScreen();
//         if (self.verticalPosition > 660) {
//           clearInterval(vertIncrement);
//         }
//       }, speed);
//     },
//     displayOnScreen: function() {
//       console.log(this.verticalPosition + 'px');
//     },
//   }
// }

// snow1 = randomElement(400);
// snow1.incrementVertical();
// console.log(snow1.speed);


// use a higher order funciton that returns a function?
// function randomAxis(num) {
//   return function() {
//     horizontalPosition: Math.floor(Math.random()*num)*4,
//   }
// }

// var quarterHorizontal = 310;





// // functions create closures over their context when they are created
// // the closure holds that context regardless of where it is run later in the program
// // this is possible because of higher order functions

// function makeCounter() {
//   var count = 0;       // declare a new variable
//   return function() {
//     count += 1;        // references count from the outer scope
//     console.log(count);
//   }
// }

// var count = makeCounter();
// count()
// count()

// var 'count' retains access to the variable count through the cloure of makeCounter();
// when count is reassigned to the incremented number(2) the previous number(1) is no longer referenced and 
//   will be garbage collected
// with the closure in place it becomes imposible to access the value of count, only possible to manipulate
//   it through the methods specified by the return function from when it was created


// // possible uses for functions with closures that hold private data
// // make snow
// // make span

// function makeSnow() {
//   return {
//     randomHorizontal:,
      
//   }
// }

// function makeSpan() {
//   var newSpan = document.createElement('span');
//   newSpan.style.top = '0px';
//   newSpan.style.left = '0px';
//   document.body.appendChild(newSpan);

//   return function(speed) {
//     incrementTop: function() {
//       // 
//     },
//   }
// }



// example : when making a closure over private data you can also provide functions as arguments 
  
//   function later(func, argument) {
//     return function() {
//       func(argument);
//     }
//   }

//   var logWarning = later(console.log, 'The system is shutting down');
//   logWarning();      // 'The system is shutting down');



// return an object from a higher order function to allow access to manipulate private data

// function makeList() {
//   var items = [];

//   return {
//     add: function(item) {
//       items.push(item);
//       console.log('"' + item + '"' + ' has been added') 
//     },
//     remove: function(item) {
//       if (items.indexOf(item) !== -1) {
//         items.splice(items.indexOf(item), 1);
//         console.log('"' + item + '"' + ' has been deleted') 
//       }
//     },
//     logList: function() {
//       items.forEach(function(value, index) {
//         console.log((index + 1) + ': ' + value);
//       }); 
//     },
//   }
// }

// list1 = makeList();

// list1.add('bananas');      // adds to the list
// list1.logList();           // logs the list
// list1.remove('bananas');   // removes from the list
// list1.logList();           


// private data of falling objects(snow) goes on top and is defined during instanciation
//   if the private data needs to change create an interface to change it (vertical position)
// before tyring to use increment try makig the game just so if the vertical and horizontal poision are the same as
//    the player position that sometihng happens

// function makeSnow() {
//   var horizontalPosition = (random position)
//   var verticalPosition = 0;
//   create object (createElement, addAttribute, appendChild)
//   return {
//     getVerticalPosition: function() {
//     },
//     getHorizongalPosition: function() {
//     },
//     changeColor: functoin() {
//       toggleAttribute
//     },
//   }
// }

// var snow1 = makeSnow()
// snow1.incrementVerticalPosition();
// if (snow1.getVerticalPosition > ?) {
//   snow1 = null;
// }

// use this code example to change the apperance of an existing element?
// https://jsfiddle.net/vnkuZ/?utm_source=website&utm_medium=embed&utm_campaign=vnkuZ


// partial funcitons allow you to define some arguments when the closure is created and other atguments later

// function createElement(color) {
//   var color = color
//   return {
//     getPosition: function(position) {
//       return position + 'px';
//     } 
//   }
// }

// var snow1 = createElement('white');

// console.log(snow1.getPosition(20));


// function createElement(color) {
//   var color = color
//   var speed = 400;
//   return {
//     changeSpeed: function(newSpeed) {
//       speed = newSpeed;
//     }, 
//     getSpeed: function() {
//       return speed;
//     },
//   }
// }

// var snow1 = createElement('white');

// console.log(snow1.getSpeed());
// snow1.changeSpeed(600);
// console.log(snow1.getSpeed());
var $playerOneOptions = $("#leftColumn img");
var $playerOne = "";
var charSelect = function () {
  if ($playerOne === $(this).attr("src") || $playerOne === "") {
    $playerOne = $(this).attr("src");
    $(this).css({"background": "radial-gradient(lightblue 45%, lightslategrey 55%)"});
  } else {
    alert("you can't change players during the game");
  }
};
$playerOneOptions.on("click" , charSelect);

var $playerTwoOptions = $("#rightColumn img");
var $playerTwo = "";
var charSelect = function () {
  if ($playerTwo === $(this).attr("src") || $playerTwo === "") {
    $playerTwo = $(this).attr("src");
    $(this).css({"background": "radial-gradient(lightpink 45%, lightslategrey 55%)"});
  } else {
    alert("you can't change players during the game");
  }
};
$playerTwoOptions.on("click" , charSelect);

var $gameTiles = $(".board div div");
var $mark = "";
var counter = 0;
var markTile = function() {
  if (counter%2 === 0){
    if ($(this).html() === "") {
      var $newImg = $("<img>").attr("src", $playerOne).css({"height": "100%","margin": "0 auto"});
      $(this).html($newImg);
      counter++;
      checkWin($newImg);
    } else {
      alert("tile is already taken, please choose another tile");
      markTile();
    }
  } else {
    if ($(this).html() === "") {
      var $newImg = $("<img>").attr("src", $playerTwo).css({"height": "100%","margin": "0 auto"});
      $(this).html($newImg);
      counter++;
      checkWin($newImg);
    } else {
      alert("tile is already taken, please choose another tile");
      markTile();
    }
  }
};

$gameTiles.on("click", markTile);

var cubes = [[".cube1", ".cube2", ".cube3"], [".cube4", ".cube5", ".cube6"], [".cube7", ".cube8", ".cube9"], [".cube1", ".cube5", ".cube9"], [".cube1", ".cube4", ".cube7"], [".cube2", ".cube5", ".cube8"], [".cube3", ".cube6", ".cube9"], [".cube3", ".cube5", ".cube7"]];

var reset = function () {
  $playerTwo = "";
  $playerOne = "";
  for ( i = 0 ; i < cubes.length ; i += 1) {
    for ( x = 0 ; x < cubes[i].length ; x += 1) {
      $(cubes[i][x] + " img").remove();
    }
  }
};

var checkWin = function(player) {
  for (i = 0 ; i < cubes.length ; i+=1 ) {
    markCount = 0;
    for (x=0 ; x < cubes[i].length ; x+=1) {
      var testCube = cubes[i][x];
      if (player.attr("src") === $(testCube + " img").attr("src")) {
        markCount+=1;
      }
    }
    if (markCount === 3) {
      if (counter%2 === 1) {
        console.log("player 1 wins");
        reset();
      } else {
        console.log("player 2 wins");
        reset();
      }
    }
  }
};

  // check the top right cube, then check all the lines coming out of it
  // if ($(".cube1").html() !== "") {
  //   if ($(".cube1").html() === $(".cube2").html() && $(".cube1").html() === $(".cube3").html()) {
  //     console.log($mark + " top row");
  //   } else if ($(".cube1").html() === $(".cube4").html() && $(".cube1").html() === $(".cube7").html()) {
  //     console.log($mark + " left column");
  //   } else if ($(".cube1").html() === $(".cube5").html() && $(".cube1").html() === $(".cube9").html()) {
  //     console.log($mark + " left diagonal");
  //   }
  // }
  // if ($(".cube4").html() !== "") {
  //   if ($(".cube4").html() === $(".cube5").html() && $(".cube4").html() === $(".cube6").html()) {
  //     console.log($mark + " mid row");
  //   }
  // }
  // if ($(".cube2").html() !== "") {
  //   if ($(".cube2").html() === $(".cube5").html() && $(".cube2").html() === $(".cube8").html()) {
  //     console.log($mark + " mid column");
  //   }
  // }
  // if ($(".cube3").html() !== "") {
  //   if ($(".cube3").html() === $(".cube6").html() && $(".cube3").html() === $(".cube9").html()) {
  //     console.log($mark + " right column");
  //   }
  // }
  // if ($(".cube7").html() !== "") {
  //   if ($(".cube7").html() === $(".cube8").html() && $(".cube7").html() === $(".cube9").html()) {
  //     console.log($mark + " bottom row");
  //   } else if ($(".cube7").html() === $(".cube5").html() && $(".cube7").html() === $(".cube3").html()) {
  //     console.log($mark + " right diagonal");
  //   }
  // }
// };

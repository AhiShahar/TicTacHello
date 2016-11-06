

var $gameTiles = $(".board div div");
var $mark = "";
var counter = 0;
var markTile = function() {
  if (counter%2 === 0){
    if ($(this).html() === "") {
      $mark = "X";
      $(this).html($mark);
      // counter++;
      checkWin();
    } else {
      alert("tile is already taken, please choose another tile");
      markTile();
    }
  } else {
    if ($(this).html() === "") {
      $mark = "O";
      $(this).html($mark);
      // counter++;
      checkWin();
    } else {
      alert("tile is already taken, please choose another tile");
      markTile();
    }
  }
};

$gameTiles.on("click", markTile);

var checkWin = function() {
  // check the top right cube, then check all the lines coming out of it
  if ($(".cube1").html() !== "") {
    if ($(".cube1").html() === $(".cube2").html() && $(".cube1").html() === $(".cube3").html()) {
      console.log($mark + " top row");
    } else if ($(".cube1").html() === $(".cube4").html() && $(".cube1").html() === $(".cube7").html()) {
      console.log($mark + " left column");
    } else if ($(".cube1").html() === $(".cube5").html() && $(".cube1").html() === $(".cube9").html()) {
      console.log($mark + " left diagonal");
    }
  }
  if ($(".cube4").html() !== "") {
    if ($(".cube4").html() === $(".cube5").html() && $(".cube4").html() === $(".cube6").html()) {
      console.log($mark + " mid row");
    }
  }
  if ($(".cube2").html() !== "") {
    if ($(".cube2").html() === $(".cube5").html() && $(".cube2").html() === $(".cube8").html()) {
      console.log($mark + " mid column");
    }
  }
  if ($(".cube3").html() !== "") {
    if ($(".cube3").html() === $(".cube6").html() && $(".cube3").html() === $(".cube9").html()) {
      console.log($mark + " right column");
    }
  }
  if ($(".cube7").html() !== "") {
    if ($(".cube7").html() === $(".cube8").html() && $(".cube7").html() === $(".cube9").html()) {
      console.log($mark + " bottom row");
    } else if ($(".cube7").html() === $(".cube5").html() && $(".cube7").html() === $(".cube3").html()) {
      console.log($mark + " right diagonal");
    }
  }

};

console.log("Hello Tic Tac Hoe");

var $gameTiles = $(".board div div");

console.log($gameTiles);

var counter = 0;
var markTile = function() {
  if (counter%2 === 0){
    if ($(this).html() === "") {
      $(this).html("X");
      return counter++;
    } else {
      alert("tile is already taken, please choose another tile");
      markTile();
    }
  } else {
    if ($(this).html() === "") {
      $(this).html("O");
      return counter++;
    } else {
      alert("tile is already taken, please choose another tile");
      markTile();
    }
  }
};

$gameTiles.on("click", markTile);

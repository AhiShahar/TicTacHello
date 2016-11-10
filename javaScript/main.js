// select character for the first player
var $playerOneOptions = $("#leftColumn img");
var $playerOne = "";
var $imgResetOne = "";
var charSelectOne = function() {
    if ($playerOne === $(this).attr("src") || $playerOne === "") { // makes sure the player doesnt try to change during the game
        $playerOne = $(this).attr("src");
        $(this).css({
            "background": "radial-gradient(lightblue 45%, lightslategrey 55%)"
        }); // char marker
        $imgResetOne = $(this); //clone the selected img address for reset and victory purposes
    } else {
        alert("you can't change players during the game");
    }
};
$playerOneOptions.on("click", charSelectOne); // add an event listener to the player images for the blue player
// select character for the second human player if chosen
var $playerTwoOptions = $("#rightColumn img");
var $imgResetTwo = "";
var $playerTwo = "";
var charSelectTwo = function() {
    if ($playerTwo === $(this).attr("src") || $playerTwo === "") { // makes sure the player doesnt try to change during the game
        $playerTwo = $(this).attr("src");
        $(this).css({
            "background": "radial-gradient(lightpink 45%, lightslategrey 55%)"
        }); // char marker
        $imgResetTwo = $(this); //clone the selected img address for reset and victory purposes
    } else {
        alert("you can't change players during the game");
    }
};
$playerTwoOptions.on("click", charSelectTwo); // add an event listener to the player images for the red player
// options for AI player
var opponent = "theGame";
var $buttons = $("button");
var opponentSelect = function() {
    if ($(this).html() == "The Game") {
        opponent = "theGame";
        charSelectJs();
    }
};
//  Select a character for AI
var charSelectJs = function() {
    if ($playerTwo !== "") { // stops from changing the js's char during the game
        alert("we are in the middle of a game man...");
        return;
    }
    var someNum = parseInt((Math.random()) * 6);
    var selection = $playerTwoOptions[someNum];
    $($playerTwoOptions[someNum]).css({
        "background": "radial-gradient(lightpink 45%, lightslategrey 55%)"
    });
    $playerTwo = $(selection).attr("src");
    $imgResetTwo = $(selection);
};
$buttons.on("click", opponentSelect);

// a function to mark selected tiles with (players turn) mark
var $gameTiles = $(".board div div");
var counter = 0;
var markTile = function() {
    if ($playerOne === "") { // first make sure first player selected a character, if not set to default Leonardo
        $imgResetOne = $("img")[0];
        $playerOne = 'assets/Leonardo.png';
        console.log($imgResetOne);
    }
    if ($playerTwo === "") { // confirms the opponent, if none selected defaults to the AI
        charSelectJs();
    }
    if (counter % 2 === 0) { // check who's turn it is
        if ($(this).html() === "") { // prevent from player marking over each other
            var $newImg = $("<img>").attr("src", $playerOne).css({
                "height": "100%",
                "margin": "0 auto"
            }); // clone the selected character image into a new element
            $(this).html($newImg); // assign element from line 35 to the selected slot
            counter++; // counter up to mark the next players turn
            if (counter >= 0) { //start testing for a winner only once the players have at-least 3 marks
                checkWin($newImg);
            }
        } else {
            alert("tile is already taken, please choose another tile");
            // markTile();
        }
    } else {
        if ($(this).html() === "") { // prevent from player marking over each other
            var $newImg = $("<img>").attr("src", $playerTwo).css({
                "height": "100%",
                "margin": "0 auto"
            }); // clone the selected character image into a new element
            $(this).html($newImg); // assign element from line 47 to the selected slot
            counter++;
            if (counter >= 0) { //start testing for a winner only once the players have at-least 3 marks
                checkWin($newImg);
            }
        } else {
            alert("tile is already taken, please choose another tile");
            // markTile();
        }
    }
};
$gameTiles.on("click", markTile); // add event listener to the board

// an Array of Arrays representing the IDs of all the game tiles in winning combinations
var cubes = [
    [".cube1", ".cube2", ".cube3"],
    [".cube4", ".cube5", ".cube6"],
    [".cube7", ".cube8", ".cube9"],
    [".cube1", ".cube5", ".cube9"],
    [".cube1", ".cube4", ".cube7"],
    [".cube2", ".cube5", ".cube8"],
    [".cube3", ".cube6", ".cube9"],
    [".cube3", ".cube5", ".cube7"]
];

// Reset function to run once a winner as been delared
var reset = function() {
    // console.log("reset was ran");
    location.reload();
};

// itterate through the array of arrays to check if any condition matches a win
var checkWin = function(player) {
    if (counter === 9) { // first checks for a draw
        alert("The game is a draw!");
        reset();
    }
    for (var i = 0; i < cubes.length; i += 1) { // the next two loops run through the array and check how many cubes match in the combination array
        var markCount = 0;
        for (var x = 0; x < cubes[i].length; x += 1) {
            var testCube = cubes[i][x];
            if (player.attr("src") === $(testCube + " img").attr("src")) {
                markCount += 1; // for each short array count the matches
            }
        }
        if (markCount === 3) { // if the array ended with 3 matches
            if (counter % 2 === 1) {
                console.log("player 1 wins");
                window.setTimeout(reset, 3000);
                $imgResetOne.css("position", "absolute");
                $imgResetOne.animate({
                    "top": "0",
                    "left": "0",
                    "maxWidth": "100vh",
                    "height": "100vh",
                    "zIndex": "1111222000"
                }, 3000);
            } else {
                console.log("player 2 wins");
                window.setTimeout(reset, 5000);
                $imgResetTwo.css("position", "absolute");
                $imgResetTwo.animate({
                    "top": "0",
                    "left": "0",
                    "maxWidth": "100vh",
                    "height": "100vh",
                    "zIndex": "1111222000"
                }, 3000);
            }
        }
    }
    if (opponent === "theGame" && counter % 2 === 1) { // if no victory achieved yet, and playing against AI, on its turn call his to play
        updateOption();
    }
};

// updates the current marks around the board at the beginning of the AI's turn
var updateOption = function() {
    cube1 = $(".cube1 img").attr("src") || "";
    cube2 = $(".cube2 img").attr("src") || "";
    cube3 = $(".cube3 img").attr("src") || "";
    cube4 = $(".cube4 img").attr("src") || "";
    cube5 = $(".cube5 img").attr("src") || "";
    cube6 = $(".cube6 img").attr("src") || "";
    cube7 = $(".cube7 img").attr("src") || "";
    cube8 = $(".cube8 img").attr("src") || "";
    cube9 = $(".cube9 img").attr("src") || "";
    jSAI(); // call JS to find the next play
};

var markAI = function(cube) {
    // console.log("MARK AI RAN");
    var $newImg = $("<img></img>").attr("src", $playerTwo).css({
        "height": "100%",
        "margin": "0 auto"
    }); // clone the selected character image into a new element
    $(cube).html($newImg); // assign element from line above to the selected slot
    counter++; // end of turn
    console.log("MarkAI is about to call checkWin");
    checkWin($newImg);
};
var jSAI = function() {
    var cube = "";
    if (cube1 === "" && ((cube3 === $playerTwo && cube2 === $playerTwo) || (cube9 === $playerTwo && cube5 === $playerTwo) || (cube7 === $playerTwo && cube4 === $playerTwo))) {
        cube = $('.cube1');
        markAI(cube);
    } else {
        if (cube2 === "" && ((cube1 === $playerTwo && cube3 === $playerTwo) || (cube8 === $playerTwo && cube5 === $playerTwo))) {
            cube = $('.cube2');
            markAI(cube);
        } else {
            if (cube3 === "" && ((cube1 === $playerTwo && cube2 === $playerTwo) || (cube7 === $playerTwo && cube5 === $playerTwo) || (cube9 === $playerTwo && cube6 === $playerTwo))) {
                cube = $('.cube3');
                markAI(cube);
            } else {
                if (cube9 === "" && ((cube7 === $playerTwo && cube8 === $playerTwo) || (cube1 === $playerTwo && cube5 === $playerTwo) || (cube3 === $playerTwo && cube6 === $playerTwo))) {
                    cube = $('.cube9');
                    markAI(cube);
                } else {
                    if (cube7 === "" && ((cube9 === $playerTwo && cube8 === $playerTwo) || (cube3 === $playerTwo && cube5 === $playerTwo) || (cube1 === $playerTwo && cube4 === $playerTwo))) {
                        cube = $('.cube7');
                        markAI(cube);
                    } else {
                        if (cube8 === "" && ((cube9 === $playerTwo && cube7 === $playerTwo) || (cube2 === $playerTwo && cube5 === $playerTwo))) {
                            cube = $('.cube8');
                            markAI(cube);
                        } else {
                            if (cube4 === "" && ((cube6 === $playerTwo && cube5 === $playerTwo) || (cube1 === $playerTwo && cube7 === $playerTwo))) {
                                cube = $('.cube4');
                                markAI(cube);
                            } else {
                                if (cube6 === "" && ((cube3 === $playerTwo && cube9 === $playerTwo) || (cube5 === $playerTwo && cube4 === $playerTwo))) {
                                    cube = $('.cube6');
                                    markAI(cube);
                                } else {
                                    if (cube5 === "" && ((cube3 === $playerTwo && cube7 === $playerTwo) || (cube9 === $playerTwo && cube1 === $playerTwo) || (cube6 === $playerTwo && cube4 === $playerTwo) || (cube8 === $playerTwo && cube2 === $playerTwo))) {
                                        cube = $('.cube5');
                                        markAI(cube);
                                    } else // if no two in a row for AI
                                    if (cube1 === "" && ((cube3 === $playerOne && cube2 === $playerOne) || (cube9 === $playerOne && cube5 === $playerOne) || (cube7 === $playerOne && cube4 === $playerOne))) {
                                        cube = $('.cube1');
                                        markAI(cube);
                                    } else {
                                        if (cube2 === "" && ((cube1 === $playerOne && cube3 === $playerOne) || (cube8 === $playerOne && cube5 === $playerOne))) {
                                            cube = $('.cube2');
                                            markAI(cube);
                                        } else {
                                            if (cube3 === "" && ((cube1 === $playerOne && cube2 === $playerOne) || (cube7 === $playerOne && cube5 === $playerOne) || (cube9 === $playerOne && cube6 === $playerOne))) {
                                                cube = $('.cube3');
                                                markAI(cube);
                                            } else {
                                                if (cube9 === "" && ((cube7 === $playerOne && cube8 === $playerOne) || (cube1 === $playerOne && cube5 === $playerOne) || (cube3 === $playerOne && cube6 === $playerOne))) {
                                                    cube = $('.cube9');
                                                    markAI(cube);
                                                } else {
                                                    if (cube7 === "" && ((cube9 === $playerOne && cube8 === $playerOne) || (cube3 === $playerOne && cube5 === $playerOne) || (cube1 === $playerOne && cube4 === $playerOne))) {
                                                        cube = $('.cube7');
                                                        markAI(cube);
                                                    } else {
                                                        if (cube8 === "" && ((cube9 === $playerOne && cube7 === $playerOne) || (cube2 === $playerOne && cube5 === $playerOne))) {
                                                            cube = $('.cube8');
                                                            markAI(cube);
                                                        } else {
                                                            if (cube4 === "" && ((cube6 === $playerOne && cube5 === $playerOne) || (cube1 === $playerOne && cube7 === $playerOne))) {
                                                                cube = $('.cube4');
                                                                markAI(cube);
                                                            } else {
                                                                if (cube6 === "" && ((cube3 === $playerOne && cube9 === $playerOne) || (cube5 === $playerOne && cube4 === $playerOne))) {
                                                                    cube = $('.cube6');
                                                                    markAI(cube);
                                                                } else {
                                                                    if (cube5 === "" && ((cube3 === $playerOne && cube7 === $playerOne) || (cube9 === $playerOne && cube1 === $playerOne) || (cube6 === $playerOne && cube4 === $playerOne) || (cube8 === $playerOne && cube2 === $playerOne))) {
                                                                        cube = $('.cube5');
                                                                        markAI(cube);
                                                                    } else { // no 2 in a row for opponent
                                                                        if (counter === 3 && (cube1 === "" && (cube2 === $playerOne && cube4 === $playerOne))) {
                                                                            cube = $('.cube1');
                                                                            markAI(cube);
                                                                        } else if (counter === 3 && (cube3 === "" && (cube2 === $playerOne && cube6 === $playerOne))) {
                                                                            cube = $('.cube3');
                                                                            markAI(cube);
                                                                        } else if (counter === 3 && (cube7 === "" && (cube4 === $playerOne && cube8 === $playerOne))) {
                                                                            cube = $('.cube7');
                                                                            markAI(cube);
                                                                        } else if (counter === 3 && (cube9 === "" && (cube6 === $playerOne && cube8 === $playerOne))) {
                                                                            cube = $('.cube9');
                                                                            markAI(cube);
                                                                        } else if (counter === 1 && cube3 === $playerOne) {
                                                                            cube = $('.cube7');
                                                                            markAI(cube);
                                                                        } else if (counter === 1 && cube7 === $playerOne) {
                                                                            cube = $('.cube4');
                                                                            markAI(cube);
                                                                        } else if (counter === 1 && cube1 === $playerOne) {
                                                                            cube = $('.cube9');
                                                                            markAI(cube);
                                                                        } else if (counter === 1 && cube9 === $playerOne) {
                                                                            cube = $('.cube1');
                                                                            markAI(cube);
                                                                        } else {
                                                                            if (cube5 === "") {
                                                                                cube = $('.cube5');
                                                                                markAI(cube);
                                                                            } else {
                                                                                if (cube1 === "") {
                                                                                    cube = $('.cube1');
                                                                                    markAI(cube);
                                                                                } else {
                                                                                    if (cube9 === "") {
                                                                                        cube = $('.cube9');
                                                                                        markAI(cube);
                                                                                    } else {
                                                                                        if (cube3 === "") {
                                                                                            cube = $('.cube3');
                                                                                            markAI(cube);
                                                                                        } else {
                                                                                            if (cube7 === "") {
                                                                                                cube = $('.cube7');
                                                                                                markAI(cube);
                                                                                            } else {
                                                                                                if (cube8 === "") {
                                                                                                    cube = $('.cube8');
                                                                                                    markAI(cube);
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

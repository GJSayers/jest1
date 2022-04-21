let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    turnNumber: 0,
    choices: ["button1", "button2", "button3", "button4"]
};

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;
    for (let circle of document.getElementsByClassName("circle")) {
        if(circle.getAttribute("data-listener") !== "true") {
            circle.addEventListener("click", (e) => {
                // get our click target id and store in move
                let move = e.target.getAttribute("id");
                // pass move into lightsOn call to illuminate correct circle
                lightsOn(move);
                // push move into game player moves
                game.playerMoves.push(move);
                playerTurn();
            });
            circle.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();

}


function showScore() {
    document.getElementById("score").innerText = game.score;
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light");
    setTimeout(() => {
        document.getElementById(circ).classList.remove("light");
    }, 400);
}

function showTurns() {
    game.turnNumber = 0;
    let turns = setInterval(function () {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber++ >= game.currentGame.length) {
            clearInterval(turns);
        }

    }, 800);
}

function playerTurn() {
    // get the index of the last element from the playerMoves and compare with the same index of the current game array.  If the player gets the answer correct, they should match.
    let i = game.playerMoves.length - 1;
    if(game.currentGame[i] === game.playerMoves[i]) {
        // if the currentGame length and playerMoves length match we must be at the end of the game
        if (game.currentGame.length == game.playerMoves.length) {
            // increment the score
            game.score++;
            showScore();
            addTurn();
        }
    }
}
module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn };

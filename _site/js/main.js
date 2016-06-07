$(document).ready(function() {
    $("#play").on("click", function() {
        var playerElement = $('input[name=choice]:checked').attr("id");
        var compElement = $('input[name=choice]:not(:checked)').attr("id");
        console.log(compElement);
        $("#menu").hide();
        $("#board-view").show();
        game = startGame(playerElement, compElement);
    });

});

$("#play").text("test");

function startGame(playerElement, compElement) {
    $("#reset-container").hide();
    var updateTime = 100;
    var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    var playerTurn = true;
    var game;

    function gameLoop() {
      if (isWin(playerElement,board)) {
        console.log("Winner");
        clearInterval(game);
        $("#dispText").text("You Win!");
        $("#dispText").show();
        resetGame();
        return;
      }

      if (!playerTurn) {
          compMove(compElement, board);
          playerTurn = true;
          return;
      }
        $("#board").click(function(event) {
            var id = $(event.target).attr("id");
            if (id !== undefined && playerTurn) {
                place(id, playerElement, board);
                playerTurn = false;
                return;
            }
        });

    }

    game = setInterval(gameLoop, updateTime);

}

function place(id, element, board) {
    if (board[id] == 0) {
        board[id] = element;
        $("#" + id).text(element);
    }
}

function isTie(board) {
    for (var i = 0; i < board.length; i++) {
        if (board[i] == 0) {
            return false;
        }
    }
    return true;
}

function isWin(element, board) {
    var combinations = [
        [0, 1, 2],
        [0, 4, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [3, 4, 5],
        [6, 7, 8]
    ];
    for (var i = 0; i < combinations.length; i++) {
        var combo = combinations[i];
        var a = combo[0];
        var b = combo[1];
        var c = combo[2];
        if (board[a] == element && board[b] == element && board[c] == element) {
            return true
        }
    }
    return false
}

function compMove(element, board) {
  console.log("test");
    var id = Math.floor(Math.random() * 8);
    while (board[id] != 0) {
        id = Math.floor(Math.random() * 8);
    }
    place(id, element, board);
}

function resetGame(){
  $("#replayModal").modal('show');
  $("#Yes").on("click", function(){
    $("#dispText").hide();
    $("#menu").show();
    $("#board-view").hide();
    for (var i=0; i<9; i++){
      $("#" +i).text("");
    }
  });
  $("#reset-container").show();
  $("#reset").on("click", function(){
    $("#replayModal").modal('show');
  });
}

class TicTacToe {
	constructor() {
		this.gameBoard = {
			one: "",
			two: "",
			three: "",
			four: "",
			five: "",
			six: "",
			seven: "",
			eight: "",
			nine: "",
		};

		this.currentPlayer = "X";
		this.numMoves = 0;
		this.gameBoardElements = {
			one: document.querySelector(".one"),
			two: document.querySelector(".two"),
			three: document.querySelector(".three"),
			four: document.querySelector(".four"),
			five: document.querySelector(".five"),
			six: document.querySelector(".six"),
			seven: document.querySelector(".seven"),
			eight: document.querySelector(".eight"),
			nine: document.querySelector(".nine"),
		};
		// Add event listeners to each board element
		Object.values(this.gameBoardElements).forEach((element) => {
			element.addEventListener("click", () => this.handleMove(element));
		});

		// Update display to show current player
		this.updateDisplay();
	}

	handleMove(element) {
		// Check if space is already taken
		if (element.textContent !== "") return;

		// Update game board state
		this.gameBoard[element.classList[0]] = this.currentPlayer;

		// Update display
		element.querySelector(".xo").textContent = this.currentPlayer;

		// Check for win or draw
		if (this.checkWin() | this.checkDraw()) {
			this.endGame();
			return;
		}

		// Switch players
		this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

		// Update display to show current player
		this.updateDisplay();
	}

	updateDisplay() {
		// Update display to show current player
		const displayPlayer = document.querySelector(".display_player");
		displayPlayer.textContent = this.currentPlayer;

		// Update class to indicate whose turn it is
		const gameBoard = document.querySelector(".game_board");
		gameBoard.classList.remove("x_turn", "o_turn");
		gameBoard.classList.add(`${this.currentPlayer.toLowerCase()}_turn`);
		// Call handleMove() to switch to next player's turn
		this.handleMove(null);
	}
}

const newGameButton = document.querySelector(".new_game");
newGameButton.addEventListener("click", () => location.reload());

const resetButton = document.querySelector(".reset");
resetButton.addEventListener("click", () => game.reset());

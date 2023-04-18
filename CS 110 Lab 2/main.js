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
		if (this.checkWin()) {
			this.endGame();
			return;
		}

		// Switch players
		this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";

		// Update display to show current player
		this.updateDisplay();
	}

	checkWin() {
		const winningCombos = [
			["one", "two", "three"],
			["four", "five", "six"],
			["seven", "eight", "nine"],
			["one", "four", "seven"],
			["two", "five", "eight"],
			["three", "six", "nine"],
			["one", "five", "nine"],
			["three", "five", "seven"],
		];

		// Check if any winning combo has been achieved
		return winningCombos.some((combo) => {
			const [a, b, c] = combo;
			return (
				this.gameBoard[a] !== "" &&
				this.gameBoard[a] === this.gameBoard[b] &&
				this.gameBoard[b] === this.gameBoard[c]
			);
		});
	}
}

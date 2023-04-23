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
		this.Board = [0,0,0,0,0,0,0,0,0];
		this._xScore = 0;
		this._oScore = 0; 
		this.currentPlayer = "X";
		this.numMoves = 0;
		this.round = 1;
		//Set default game mode to 2 players until the user change it.
		document.querySelector('#twoPlayers').checked = true;
		document.querySelector('.round').textContent = this.round;

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


		// Add event listener to the reset button
		const resetButton = document.querySelector(".reset");
    	resetButton.addEventListener("click", () => this.resetBoard());

		// Add event listener to the new game button
		const newGame = document.querySelector(".new_game");
    	newGame.addEventListener("click", () => this.resetGame());

		//Set up the scores
		this.updateScores();

		// Update display to show current player
		this.updateDisplay();

		//always check
	}

	handleMove(element) {
		// Check if space is already taken
		// If it is taken, return, do nothing
		if (element.textContent !== "") return;

		// Update game board state
		this.gameBoard[element.classList[0]] = this.currentPlayer;
		console.log(element.classList[0]);
		
		//Increment the move counts
		this.numMoves++;
		
		//Update the array as well
		if(element.classList[0] === "one"){
			if(this.currentPlayer === "X") this.Board[0] = 1;
			else this.Board[0] = 2;
		}
		if(element.classList[0] === "two"){
			if(this.currentPlayer === "X") this.Board[1] = 1;
			else this.Board[1] = 2;
		} 
		if(element.classList[0] === "three"){
			if(this.currentPlayer === "X") this.Board[2] = 1;
			else this.Board[2] = 2;
		} 
		if(element.classList[0] === "four"){
			if(this.currentPlayer === "X") this.Board[3] = 1;
			else this.Board[3] = 2;
		} 
		if(element.classList[0] === "five"){
			if(this.currentPlayer === "X") this.Board[4] = 1;
			else this.Board[4] = 2;
		} 
		if(element.classList[0] === "six"){
			if(this.currentPlayer === "X") this.Board[5] = 1;
			else this.Board[5] = 2;
		} 
		if(element.classList[0] === "seven"){
			if(this.currentPlayer === "X") this.Board[6] = 1;
			else this.Board[6] = 2;
		} 
		if(element.classList[0] === "eight"){
			if(this.currentPlayer === "X") this.Board[7] = 1;
			else this.Board[7] = 2;
		} 
		if(element.classList[0] === "nine"){
			if(this.currentPlayer === "X") this.Board[8] = 1;
			else this.Board[8] = 2;
		}   

		console.log(this.Board);
		// Update display
		element.querySelector(".xo").textContent = this.currentPlayer;



		//This is to flip the player from X to O or O to x
		let prePlayer = 0;
		if( this.currentPlayer === "X"){
			prePlayer = 1;
			this.currentPlayer = "O";
			this.updateDisplay("O");
		} 
		else{
			prePlayer = 2;
			this.currentPlayer = "X";
			this.updateDisplay("X");
		}

		
		//Increment the score of the winner of the round and reset the board.
		if(this.checkWin(prePlayer) != 0){
			//Check which player wins
			if(this.checkWin(prePlayer) == 1) this._xScore++;
			else if( this.checkWin(prePlayer) == 2) this._oScore++;
			
			//Increment round, display to the UI
			this.round = this.round + 1;
			document.querySelector('.round').textContent = this.round;
			
			//Update the current players scores
			this.updateScores();

			//Reset the board
			this.resetBoard();

			//Check if the game is over
			this.gameOver();
			

			
		}

		//If it is draw, increment the scores of 2 players, reset the game.
		if( this.checkDraw()){
			//Increment the scores of both players
			this._xScore++;
			this._oScore++;

			//Increment round, display the new round to the UI
			this.round = this.round + 1;
			document.querySelector('.round').textContent = this.round;
			
			//Update the current players scores
			this.updateScores();

			//Reset the board
			this.resetBoard();
			
		}

	}

	//Set up the scores
	updateScores(){
		let xScore = document.querySelector(".Xscores");
		let oScore = document.querySelector(".Oscores");
		xScore.textContent = "X: " + this._xScore + " ";
		oScore.textContent = "O: " + this._oScore;
	}

	updateDisplay( player) {
		// Update display to show current player
		const displayPlayer = document.querySelector(".display_player");
		displayPlayer.innerHTML = "Your turn, ";
		
		if( player === "X" ) displayPlayer.innerHTML += " X!";
		else if (player === "O") displayPlayer.innerHTML += " O!";
	}
	
	//This function check if the a user chooses 1-2-3 , 1-5-9, 1-4-7, 2 -5 - 8,  3 - 5 -7, 3 - 6 - 9 , 4 - 5 - 6, 
		//If this function return 0, no one wins yet
	checkWin( user){
		if( (this.Board[0] === user && this.Board[1] === user && this.Board[2] === user) 
		||  (this.Board[0] === user && this.Board[4] === user && this.Board[8] === user)
		||  (this.Board[0] === user && this.Board[3] === user && this.Board[6] === user)
		||  (this.Board[1] === user && this.Board[4] === user && this.Board[7] === user)
		||  (this.Board[2] === user && this.Board[4] === user && this.Board[6] === user)
		||  (this.Board[2] === user && this.Board[5] === user && this.Board[8] === user)
		||  (this.Board[3] === user && this.Board[4] === user && this.Board[5] === user)
		){
			return user;
		};
		return 0;
	}

	
	//This function check if the current round is draw
	checkDraw(){
		return this.numMoves == 9;
	}

	//Reset the board
	resetBoard(){
		let divs = document.getElementsByClassName("xo");
		for (var i = 0; i < divs.length; i++) {
			divs[i].innerHTML = "";
		  }
		this.currentPlayer = "X";
		this.Board = [0,0,0,0,0,0,0,0,0];
		this.numMoves = 0;
	}

	//Reset the board
	resetGame(){
		//Clear out the current board
		let divs = document.getElementsByClassName("xo");
		for (var i = 0; i < divs.length; i++) {
			divs[i].innerHTML = "";
		}

		//Reset players scores
		this._xScore = 0;
		this._oScore = 0; 

		//Set X as the default player
		this.currentPlayer = "X";
		
		//Set number of moves to 0
		this.numMoves = 0;

		//Reset the array board
		this.Board = [0,0,0,0,0,0,0,0,0];

		//reset the number of round
		this.round = 0;

		//Update the current scores
		this.updateScores();
	}
	
	
	gameOver(){
		if(this.round > 10){
			let winner = "";
			if(this._xScore > this._oScore) winner = "X wins, game over!"
			else if(this._xScore < this._oScore) winner = "O wins, game over!"
			else winner = "It's a draw, game over!"
			alert(winner);
			this.resetGame();
		}
	}

}



//const newGameButton = document.querySelector(".new_game");
//newGameButton.addEventListener("click", () => location.reload());



document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusMessage = document.getElementById('statusMessage');
    const newGameButton = document.getElementById('newGameButton');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const handleCellPlayed = (clickedCell, clickedCellIndex) => {
        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
    };

    const handlePlayerChange = () => {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `It's ${currentPlayer}'s turn`;
    };

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            let a = board[winCondition[0]];
            let b = board[winCondition[1]];
            let c = board[winCondition[2]];
            if (a === null || b === null || c === null) {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            statusMessage.textContent = `Player ${currentPlayer} has won!`;
            gameActive = false;
            newGameButton.classList.remove('hidden');
            return;
        }
        let roundDraw = !board.includes(null);
        if (roundDraw) {
            statusMessage.textContent = 'Game is a draw!';
            gameActive = false;
            newGameButton.classList.remove('hidden');
            return;
        }
        handlePlayerChange();
    };

    const handleCellClick = (event) => {
        const clickedCell = event.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        if (board[clickedCellIndex] !== null || !gameActive) {
            return;
        }
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    };

    const handleRestartGame = () => {
        board = Array(9).fill(null);
        gameActive = true;
        currentPlayer = 'X';
        statusMessage.textContent = `Player ${currentPlayer} starts`;
        cells.forEach(cell => cell.textContent = '');
        newGameButton.classList.add('hidden');
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    newGameButton.addEventListener('click', handleRestartGame);
});

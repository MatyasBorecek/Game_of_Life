const universeDAO = require('../Daos/Universe');

const getNextGeneration = () => {
    const currentGeneration = universeDAO.getUniverseState();
    const nextGeneration = computeNextGeneration(currentGeneration);

    universeDAO.saveUniverseState(nextGeneration);
    return nextGeneration;
};

const computeNextGeneration = (currentGeneration) => {
    const height = currentGeneration.length;
    const width = currentGeneration[0].length;
    const nextGeneration = [];

    for (let row = 0; row < height; row++) {
        const currentRow = currentGeneration[row];
        const nextRow = [];

        for (let col = 0; col < width; col++) {
            const isAlive = currentRow[col];
            const numNeighbors = countNeighbors(currentGeneration, row, col);

            if (isAlive) {
                // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                // Any live cell with more than three live neighbours dies, as if by overpopulation.
                if (numNeighbors < 2 || numNeighbors > 3) {
                    nextRow.push(false);
                } else {
                    // Any live cell with two or three live neighbours lives on to the next generation.
                    nextRow.push(true);
                }
            } else {
                // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                if (numNeighbors === 3) {
                    nextRow.push(true);
                } else {
                    nextRow.push(false);
                }
            }
        }

        nextGeneration.push(nextRow);
    }

    return nextGeneration;
};

const countNeighbors = (currentGeneration, row, col) => {
    const height = currentGeneration.length;
    const width = currentGeneration[0].length;
    let count = 0;

    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            const isValidIndex = (
                i >= 0 &&
                i < height &&
                j >= 0 &&
                j < width
            );
            const isNotCurrentCell = !(i === row && j === col);

            if (isValidIndex && isNotCurrentCell && currentGeneration[i][j]) {
                count++;
            }
        }
    }

    return count;
};

module.exports = {
    getNextGeneration,
};

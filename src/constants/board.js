const boardConfig = {
    width: 8,
    height: 8,
    white: '#EAEAEA',
    black: '#2D7FD6'
}

const positionX = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

function getColor(positionX, positionY, config) {
    const firstColor = positionY % 2 === 0 ? config.white : config.black
    const secondColor = firstColor === config.white ? config.black : config.white

    return positionX % 2 == 0 ? firstColor : secondColor
}

function createBoard(config) {
    const board = []
    for (let j = 0; j < config.height; j++) {
        const boardRow = []
        for (let i = 0; i < config.height; i++) {
            const field = {
                id: Math.random(),
                color: getColor(i, j, config),
                positionX: positionX[j],
                positionY: config.height - i,
            }
            boardRow.push(field)
        }
        board.push(boardRow)
    }

    return board
}

export const board = createBoard(boardConfig)
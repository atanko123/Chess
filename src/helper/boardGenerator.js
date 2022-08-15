export function getColor(config, positionX, positionY) {
    const firstColor = positionY % 2 === 0 ? config.white : config.black
    const secondColor = firstColor === config.white ? config.black : config.white

    return positionX % 2 == 0 ? firstColor : secondColor
}

export function generateBoard(config, positionX, positionY) {
    const board = []
    for (let y = 0; y < config.height; y++) {
        const boardRow = []
        for (let x = 0; x < config.height; x++) {
            const field = {
                id: Math.random(),
                color: getColor(config, x, y),
                label: `${positionX[x]}-${positionY[config.height - y - 1]}`
            }
            boardRow.push(field)
        }
        board.push(boardRow)
    }

    return board
}
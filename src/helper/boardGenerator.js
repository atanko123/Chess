export function getColor(config, isWhite) {
    return isWhite ? config.white : config.black
}

export function getLabel(x, y, rowLabel, columnLabel) {
    return `${rowLabel[y]}-${columnLabel[columnLabel.length - x - 1]}`
}

export function generateBoard(config, rowLabel, columnLabel) {
    const board = [...Array(config.length).keys()].map(row => {
        const column = [...Array(config.length).keys()].map(column => {
            const isWhite = (row + column) % 2 === 0
            const label = getLabel(row, column, rowLabel, columnLabel)
            const field = {
                id: `field-${label}`,
                color: getColor(config, isWhite),
                label: label
            }
            return field
        })
        return column
    })
    return board
}


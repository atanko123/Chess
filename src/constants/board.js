export const boardConfig = {
    width: 8,
    height: 8,
    white: '#EAEAEA',
    black: '#2D7FD6',
}

export const positionX = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const positionY = ['1', '2', '3', '4', '5', '6', '7', '8']

export function getPositionIndex (position) {
    const splitedPosition = position.split("-")
    const x = splitedPosition[0]
    const y = splitedPosition[1]

    const positionIndex = {
        x: positionX.indexOf(x),
        y: boardConfig.height - positionY.indexOf(y) - 1,
    }

    return positionIndex
}


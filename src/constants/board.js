const masa = false
export const boardConfig = {
    length: 8,
    white: {
        default: masa ? '#FEE0FB' : '#EAEAEA',
        highlighted: '#DCFF93',
    },
    black: {
        default: masa ? '#ED79FC' : '#2D7FD6',
        highlighted: '#B9F23F',
    }
}

export const rowLabel = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

export const columnLabel = ['1', '2', '3', '4', '5', '6', '7', '8']

export function getPositionIndex (position) {
    const splitedPosition = position.split("-")
    const x = splitedPosition[0]
    const y = splitedPosition[1]

    const positionIndex = {
        x: rowLabel.indexOf(x),
        y: boardConfig.length - columnLabel.indexOf(y) - 1,
    }

    return positionIndex
}


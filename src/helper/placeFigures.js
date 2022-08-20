import { getPositionIndex } from "../constants/board.js"

export function placeFigures(boardConfig, figuresConfig) {
    const placedFigures = [...Array(boardConfig.length).keys()].map(row => {
        const column = [...Array(boardConfig.length).keys()].map(column => {
            return null
        })
        return column
    })

    for (let figure of figuresConfig) {
        fillFigures(figure, "white", placedFigures)
        fillFigures(figure, "black", placedFigures)
    }

    return placedFigures
}

function fillFigures (figure, type, placedFigures) {
    for (let position of figure[type]) {
        const place =  getPositionIndex(position)   
        const placedFigure = {
            id: figure.name + "-" + position,
            name: figure.name,
            type: type,
        }
        placedFigures[place.y][place.x] = placedFigure
    }
    return placedFigures
}
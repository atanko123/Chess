import { getPositionIndex } from "../constants/board.js"

export function placeFigures(boardConfig, figuresConfig) {
    let placedFigures = []
    for (let y = 0; y < boardConfig.height; y++) {
        const figuresRow = []
        for (let x = 0; x < boardConfig.height; x++) {
            figuresRow.push(null)
        }
        placedFigures.push(figuresRow)
    }

    for (let figure of figuresConfig) {
        placedFigures = fillFigures(figure, "white", placedFigures)
        placedFigures = fillFigures(figure, "black", placedFigures)
    }
    console.log("placedFigures", placedFigures)

    return placedFigures
}

function fillFigures (figure, type, placedFigures) {
    for (let position of figure[type]) {
        const place =  getPositionIndex(position)   
        const placedFigure = {
            id: figure.name + "-" + position,
            name: figure.name,
            type: type,
            icon: figure.icon,
            moveHistory: []
        }
        placedFigures[place.y][place.x] = placedFigure
    }

    return placedFigures
}
import Vue from 'vue'
import Vuex from 'vuex'
import { boardConfig, positionX, positionY } from '../constants/board.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
	board: createBoard(boardConfig),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

function getColor(positionX, positionY, config) {
    const firstColor = positionY % 2 === 0 ? config.white : config.black
    const secondColor = firstColor === config.white ? config.black : config.white

    return positionX % 2 == 0 ? firstColor : secondColor
}

function createBoard(config) {
    const board = []
    for (let y = 0; y < config.height; y++) {
        const boardRow = []
        for (let x = 0; x < config.height; x++) {
            const field = {
                id: Math.random(),
                color: getColor(x, y, config),
                positionX: positionX[x],
                positionY: positionY[config.height - y - 1],
            }
            boardRow.push(field)
        }
        board.push(boardRow)
    }

    return board
}

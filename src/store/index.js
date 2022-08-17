import Vue from 'vue'
import Vuex from 'vuex'
import { boardConfig, positionX, positionY, getPositionIndex } from '../constants/board.js'
import { generateBoard } from '../helper/boardGenerator'
import { figures } from '../constants/figures.js'
import { placeFigures } from '../helper/placeFigures'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
	board: generateBoard(boardConfig, positionX, positionY),
	placedFigures: placeFigures(boardConfig, figures),
	activeField: null,
	activeTurn: "white",
  },
  getters: {
	potentialFields (state) {
		const potential = []
		if (state.activeField) {
			const figures = state.placedFigures
			for (let y = 0; y < figures.length; y++) {
				for (let x = 0; x < figures[y].length; x++) {
					const figure = figures[y][x]
					// Empty or figure of opponent
					if (!figure || figure.type !== state.activeTurn) {
						potential.push(`${positionX[x]}-${positionY[figures.length - y - 1]}`)
					}
				}
			}
		}
		return potential
	},
	isFieldPotential: (state, getters) => label => {
		return getters.potentialFields.includes(label)
	}
  },
  mutations: {
	SET_ACTIVE_FIELD(state, label) {
		state.activeField = label
	},
	SET_ACTIVE_TURN(state, activeTurn) {
		state.activeTurn = activeTurn
	},
	SET_MOVE_FIGURE(state, data) {
		const { position, figure } = data
		console.log("position, figure", position, figure)
		state.placedFigures[position.y][position.x] = figure
	}
  },
  actions: {
	setActiveField ({ state, commit }, label) {
		if (state.activeField === label) {
			commit('SET_ACTIVE_FIELD', null)
		} else {
			commit('SET_ACTIVE_FIELD', label)
		}
	},
	setActiveTurn ({ commit }, activeTurn) {
		commit('SET_ACTIVE_TURN', activeTurn)
	},
	moveFigure({ state, commit, dispatch }, moveToField) {
		const fromPosition = getPositionIndex(state.activeField)
		const toPosition = getPositionIndex(moveToField)
		const figure  = state.placedFigures[fromPosition.y][fromPosition.x]
		commit('SET_MOVE_FIGURE', { position: fromPosition, figure: null })
		commit('SET_MOVE_FIGURE', { position: toPosition, figure: figure })

		// No field is active after move
		dispatch('setActiveField', null)
		// Toggle turn
		dispatch('setActiveTurn', state.activeTurn === "white" ? "black" : "white")

		console.log("placedFigures", state.placedFigures)
	}
  },
  modules: {
  }
})

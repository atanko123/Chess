import Vue from 'vue'
import Vuex from 'vuex'
import { boardConfig, rowLabel, columnLabel, getPositionIndex } from '../constants/board.js'
import { generateBoard } from '../helper/boardGenerator'
import { figures } from '../constants/figures.js'
import { placeFigures } from '../helper/placeFigures'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
	board: generateBoard(boardConfig, rowLabel, columnLabel),
	placedFigures: placeFigures(boardConfig, figures),
	activeField: null,
	activeTurn: "white",
	whiteIsDown: true,
  },
  getters: {
	potentialFields (state, getters) {
		const potential = []
		if (state.activeField) {
			state.placedFigures.forEach((rowFigures, rowIndex) => {
				rowFigures.forEach((figure, columnIndex) => {
					// If figure on field is empty or figure of opponent
					// field is potential
					if (!figure || figure.type !== state.activeTurn) {
						const label = `${rowLabel[columnIndex]}-${columnLabel[columnLabel.length - rowIndex - 1]}`
						potential.push(label)
					}
				})
			})
		}
		return potential
	},
	isFieldPotential: (state, getters) => label => {
		return getters.potentialFields.includes(label)
	},
	getBoard (state) {
		if (state.whiteIsDown) {
			console.log("state.board", state.board)
			return state.board
		}
		const board = state.board
		const reversed = []
		for (let y = board.length - 1; y >= 0; y--) {
			const row = []
			for (let x = board[y].length - 1; x >= 0; x--) {
				row.push(board[y][x])
			}
			reversed.push(row)
		}
		return reversed
	},
	getPlacedFigures (state) {
		if (state.whiteIsDown) {
			return state.placedFigures
		}
		const figures = state.placedFigures
		const reversed = []
		for (let y = figures.length - 1; y >= 0; y--) {
			const row = []
			for (let x = figures[y].length - 1; x >= 0; x--) {
				row.push(figures[y][x])
			}
			reversed.push(row)
		}
		return reversed
	},
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
		state.placedFigures[position.y][position.x] = figure
	},
	TOGGLE_TURN_SCREEN(state) {
		state.whiteIsDown = !state.whiteIsDown
	},
	ADD_MOVE_TO_HISTORY(state, historyData) {
		state.history.push(historyData)
	},
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
	addMoveToHistoy ({ state, commit }, data) {
		const { fromField, toField } = data
		const from = getPositionIndex(fromField)
		const to = getPositionIndex(toField)
		const fromFigure = state.placedFigures[from.y][from.x]
		const toFigure = state.placedFigures[to.y][to.x]
		const historyData = {
			figure: fromFigure,
			eaten: toFigure,
			fromField: fromField,
			toField: toField,
		}
		commit('ADD_MOVE_TO_HISTORY', historyData)
		console.log("history", state.history)
	},
	moveFigure({ state, commit, dispatch }, moveToField) {
		const fromPosition = getPositionIndex(state.activeField)
		const toPosition = getPositionIndex(moveToField)
		// save move to history
		dispatch('addMoveToHistoy', { fromField: state.activeField, toField: moveToField })

		const figure = state.placedFigures[fromPosition.y][fromPosition.x]
		commit('SET_MOVE_FIGURE', { position: fromPosition, figure: null })
		commit('SET_MOVE_FIGURE', { position: toPosition, figure: figure })

		// No field is active after move
		dispatch('setActiveField', null)
		// Toggle turn
		dispatch('setActiveTurn', state.activeTurn === "white" ? "black" : "white")
	},
	turnScreen ({ commit }) {
		commit('TOGGLE_TURN_SCREEN')
	}
  },
  modules: {
  }
})

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
	masa: false,
	anze: false,
	autoRotate: false,
	isLastMove: [],
  },
  getters: {
	imageUrl: (state, getters) => (figureName, figureType) => {
		if (state.masa && figureName === "queen") {
			return `src/assets/figures/v1/${figureName}_masa_${figureType}.jpg`
		}
		else if (state.anze && figureName === "king") {
			return `src/assets/figures/v1/${figureName}_a_${figureType}.jpg`
		}
		return `src/assets/figures/v1/${figureName}_${figureType}.svg`
	},
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
	isFieldLastMove: (state) => label => {
		return state.isLastMove.includes(label)
	},
	getFieldColor: (state) => isWhite => {
		return isWhite ? boardConfig.white.default : boardConfig.black.default 	
	},
	getFieldHighlightedColor: (state) => isWhite => {
		return isWhite ? boardConfig.white.highlighted : boardConfig.black.highlighted 	
	},
  },
  mutations: {
	SET_ACTIVE_FIELD(state, label) {
		state.activeField = label
	},
	SET_IS_LAST_MOVE (state, lastMoves) {
		state.isLastMove = lastMoves
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
	toggleActiveTurn ({ state, commit }) {
		const activeTurn = state.activeTurn === "white" ? "black" : "white"
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

		let figure = state.placedFigures[fromPosition.y][fromPosition.x]
		// if pawn is at the end of the board, transform it to queen
		if (figure.name === "pawn") {
			figure = pawnToQueen(figure, toPosition.y)
		}
		commit('SET_MOVE_FIGURE', { position: fromPosition, figure: null })
		commit('SET_MOVE_FIGURE', { position: toPosition, figure: figure })
		commit('SET_IS_LAST_MOVE', [state.activeField, moveToField])

		// No field is active after move
		dispatch('setActiveField', null)
		// Toggle turn
		dispatch('toggleActiveTurn')

		if (state.autoRotate) {
			dispatch('turnScreen')
		}

		function pawnToQueen (figure, positionY) {
			if (figure.type === "white" && positionY === 0 || figure.type === "black" && positionY === boardConfig.length - 1) {
				figure.name = "queen"
			}
			return figure
		}
	},
	turnScreen ({ commit }) {
		commit('TOGGLE_TURN_SCREEN')
	}
  },
  modules: {
  }
})

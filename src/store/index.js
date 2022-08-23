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

		if (state.autoRotate) {
			dispatch('turnScreen')
		}
	},
	turnScreen ({ commit }) {
		commit('TOGGLE_TURN_SCREEN')
	}
  },
  modules: {
  }
})

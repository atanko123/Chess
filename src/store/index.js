import Vue from 'vue'
import Vuex from 'vuex'
import { boardConfig, positionX, positionY } from '../constants/board.js'
import { generateBoard } from '../helper/boardGenerator'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
	board: generateBoard(boardConfig, positionX, positionY),
	activeField: null,
  },
  mutations: {
	SET_ACTIVE_FIELD(state, label) {
		state.activeField = label
	}
  },
  actions: {
	setActiveField ({ state, commit }, label) {
		if (state.activeField === label) {
			commit('SET_ACTIVE_FIELD', null)
		} else {
			commit('SET_ACTIVE_FIELD', label)
		}
	}
  },
  modules: {
  }
})

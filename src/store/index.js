import Vue from 'vue'
import Vuex from 'vuex'
import { boardConfig, positionX, positionY } from '../constants/board.js'
import { generateBoard } from '../helper/boardGenerator'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: [],
	board: generateBoard(boardConfig, positionX, positionY),
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})

<template>
  <div class="board-wrapper">
    <div v-for="(row, index) in board" :key="index">
        <div v-for="field in row" :key="field.id">
			<chess-field :field="field" />
			{{ test }}
        </div>
    </div>
  </div>
</template>

<script>
import { board } from '../constants/board.js'
import ChessField from './ChessField.vue'
import { mapState } from 'vuex'


export default {

	components: {
		ChessField,
	},
	data () {
		return {
			board: board
		}
	},
	computed: {
		...mapState([
		])
	},
	created() {
	console.log('board', board)
	}
}

</script>

<style scoped>

.board-wrapper {
	display: flex;
	flex-direction: row;
}

.board-field {
	width: 100px;
	height: 100px;
}

</style>

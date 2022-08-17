<template>
  <div class="board-wrapper">
    <div v-for="(row, y) in board" :key="y">
		<div class="board-row">
			<div v-for="(field, x) in row" :key="field.id">
				<chess-field
					:field="field"
					:figure="placedFigures[y][x]"
					:isPotential="isFieldPotential(field.label)" />
			</div>
		</div>
    </div>
  </div>
</template>

<script>
import ChessField from './ChessField.vue'
import { mapGetters, mapState } from 'vuex'


export default {

	components: {
		ChessField,
	},
	computed: {
		...mapState([
			'board',
			'placedFigures',
		]),
		...mapGetters([
			'isFieldPotential',
		]),
	},
	created() {
	console.log('board', this.board)
	}
}

</script>

<style scoped>

.board-wrapper {
	display: flex;
	flex-direction: column;
}

.board-row {
	display: flex;
	display: row;
}

.board-field {
	width: 100px;
	height: 100px;
}

</style>

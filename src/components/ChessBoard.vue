<template>
  <div>
	<div class="turn-text">
		Move {{ activeTurn }} 
		<button @click="turnScreen">Turn screen</button>
	</div>
	<div class="board-wrapper">
		<div v-for="(row, y) in getBoard" :key="y">
			<div class="board-row">
				<div v-for="(field, x) in row" :key="field.id">
					<chess-field
						:field="field"
						:figure="getPlacedFigures[y][x]"
						:isPotential="isFieldPotential(field.label)" />
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script>
import ChessField from './ChessField.vue'
import { mapState, mapGetters, mapActions } from 'vuex'


export default {

	components: {
		ChessField,
	},
	computed: {
		...mapState([
			'activeTurn',

		]),
		...mapGetters([
			'isFieldPotential',
			'getBoard',
			'getPlacedFigures',
		]),
	},
	methods: {
		...mapActions([
			'turnScreen',
		]),
	},
}

</script>

<style scoped>

.board-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}

.board-row {
	display: flex;
	display: row;
}

.board-field {
	max-width: 100px;
	max-height: 100px;
}

.turn-text {
	font-weight: 600;
}

</style>

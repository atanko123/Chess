<template>
	<div>
		<div class="turn-text">
			{{ activeTurn }}'s turn
			<!-- <button @click="turnScreen">Turn screen</button> -->
		</div>
		<div class="board-screen">
			<div class="board-wrapper">
				<div v-for="(row, y) in getBoard" :key="y">
					<div class="board-row">
						<div v-for="(field, x) in row" :key="field.id">
							<chess-field
								class="board-field"
								:field="field"
								:figure="getPlacedFigures[y][x]"
								:isPotential="isFieldPotential(field.label)" />
						</div>
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

.board-screen {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.board-wrapper {
	display: flex;
	flex-direction: column;
	border: 3px solid black;
}

.board-row {
	display: flex;
	flex-direction: row;
	justify-content: center;
}

.board-field {
	width: 11vmin;
    height: 11vmin;
	max-width: 100px;
    max-height: 100px;
	min-width: 50px;
    min-height: 50px;
}

.turn-text {
	font-weight: 600;
	display: flex;
	justify-content: center;
	padding-bottom: 10px;
	text-transform: capitalize;
	font-style: arial;
	font-size: 20px;
}

</style>

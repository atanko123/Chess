<template>
	<div>
		<div class="turn-text">
			{{ activeTurn }}'s turn &nbsp;
			<div v-if="!autoRotate" class="icon-wrapper" @click="turnScreen">
				<img class="turn-icon" src="src/assets/rotate.svg" />
			</div>
		</div>
		<div class="board-screen">
			<div class="board-wrapper" :class="{ 'reversed': !whiteIsDown }">
				<div v-for="(row, y) in board" :key="y">
					<div class="board-row">
						<div v-for="(field, x) in (row)" :key="field.id">
							<chess-field
								class="board-field"
								:class="{ 'reversed': !whiteIsDown }"
								:field="field"
								:figure="placedFigures[y][x]"
								:isLastMove="isFieldLastMove(field.label)"
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
			'whiteIsDown',
			'board',
			'placedFigures',
			'autoRotate',
		]),
		...mapGetters([
			'isFieldPotential',
			'isFieldLastMove',
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

.icon-wrapper {
	width: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	background-color:#B8B8B8;
	border-radius: 10px;
}

.icon-wrapper:hover {
	background-color:#D0D0D0;
}
.turn-icon {
	width: 20px;
	height: 20px;
}

.reversed {
	transform: rotate(180deg);
}

</style>

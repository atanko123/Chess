<template>
  <div class="board-wrapper">
    <div v-for="(row, index) in board" :key="index">
		<div class="board-row">
			<div v-for="field in row" :key="field.id">
				<chess-field :field="field" />
			</div>
		</div>
    </div>
  </div>
</template>

<script>
import ChessField from './ChessField.vue'
import { mapState } from 'vuex'


export default {

	components: {
		ChessField,
	},
	computed: {
		...mapState([
			'board',
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

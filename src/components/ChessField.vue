<template>
    <div class="board-field"
		:class="{ 'active': isActive }"
		:style="{ backgroundColor: field.color }"
		@click="clickOnField()">
			<!--{{ field.label }} -->
			<div v-if="figure" class="figure-wrapper">
				<img class="figure" :src="imageUrl(figure.name, figure.type)" />
			</div>
			<div v-show="isPotential" class="potential-dot"></div>
    </div>
</template>

<script>
import { mapState,mapGetters, mapActions } from 'vuex'

export default {

	props: {
		field: { type: Object, required: true },
		isPotential: { type: Boolean, default: false },
		figure: { type: Object, default: null },
	},
	computed: {
		...mapState([
			'activeField',
			'activeTurn',
		]),
		...mapGetters([
			'imageUrl',
		]),
		isActive () {
			return this.field.label === this.activeField
		},
	},
	methods: {
		...mapActions([
			'setActiveField',
			'moveFigure',
		]),
		clickOnField () {
			if (this.isPotential) {
				this.moveFigure(this.field.label)
			}
			// activate field
			else if (this.figure && this.activeTurn === this.figure.type) {
				this.setActiveField(this.field.label)
			}
		}
	}
}

</script>

<style scoped>

.board-field {
	width: 100px;
	height: 100px;
	cursor: pointer;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
}

.field-label {
	display: flex;
	justify-content: start;
	align-items: start;
}

.active {
	opacity: 0.5;
}

.figure-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
}

.figure {
	width: 80%;
	height: 80%;
	position: absolute;
}

.potential-dot {
	height: 30px;
	width: 30px;
	background-color: rgb(192, 226, 141);
	border-radius: 50%;
	display: block;
	opacity: 0.5;
	position: absolute;
}

</style>

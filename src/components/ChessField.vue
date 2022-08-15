<template>
    <div class="board-field"
		:class="{ 'active': isActive }"
		:style="{ backgroundColor: field.color }"
		@click="setActiveField(field.label)">
    	{{ field.label }}
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {

	props: {
		field: { type: Object, required: true },
	},
	computed: {
		...mapState([
			'activeField',
		]),
		isActive () {
			return this.field.label === this.activeField
		},
	},
	methods: {
		...mapActions([
			'setActiveField',
		]),
	}
}

</script>

<style scoped>

.board-field {
	width: 100px;
	height: 100px;
	cursor: pointer;
}

.active {
	opacity: 0.5;
}

</style>

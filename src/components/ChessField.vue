<template>
    <div class="board-field" :style="{ backgroundColor: field.color }">
    	{{ field.positionX }}-{{ field.positionY}}
    </div>
</template>

<script>

export default {

	props: {
		field: { type: Object, required: true },
	}
}

</script>

<style scoped>

.board-field {
	width: 100px;
	height: 100px;
}

</style>

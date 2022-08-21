<template>
  <div id="app">
    <main>
      <ChessBoard />
    </main>
  </div>
</template>

<script>
import ChessBoard from './components/ChessBoard.vue'

export default {
  components: {
    ChessBoard,
  }
}
</script>

<style scoped>
  #app {
    width: 100%;
    height: 100%;
    padding: 10px;
    display: inline;
    background-color: #F0F0F0;
  }
</style>

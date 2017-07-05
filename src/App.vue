<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.logo {
  width: 120px;
  margin: 10px;
}

@media (max-width: 768px) {
  .logo {
    width: 96px;
    margin: 5px;
  }
}
</style>

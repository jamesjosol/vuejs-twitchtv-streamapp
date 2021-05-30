<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<style>
@import './assets/styles/main.css';
@import url('https://use.fontawesome.com/releases/v5.7.2/css/all.css');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #e056fd;
  background-image: linear-gradient(315deg, #6d0083 0%, #1e0024 74%);
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.router-link-exact-active {
  color: #dfdfdf !important;

}
</style>

<template>
  <div id="app">
    <MainPage msg="TribefireJS + Vue"/>
  </div>
</template>

<script>
import './assets/css/tailwind.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
 
import MainPage from './components/MainPage.vue'

export default {
  name: 'App',
  components: {
    MainPage
  },
  data() {
    return {
     session: null,
    }
  },
  methods: {
    setContent(content) {
       console.log("App test called: " + content);

      let children = this.$children[0];  
      children.setContent(content);
    } ,
    configureGmSession(session) {
      this.session = session;

      let children = this.$children[0];  
      children.configureGmSession(session);
    },
    deselectAll() {
      //let children = this.$children[0];  
      //children.deselectAll();
    },
    getFirstSelectedItem() {
      let children = this.$children[0];  
      return children.getFirstSelectedItem(); 
    },
    getCurrentSelection() {
      let children = this.$children[0];  
      return children.getCurrentSelection(); 
    },
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #d8b20a;
  margin-top: 60px;
} */
html,
body {
  position: relative;
  width: 100%;
  height: 100%;
}

body {
  /*display: flex;*/
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: rgb(27, 43, 52);
  color: silver;
  margin: 0;
  padding: 8px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

button {
  margin-bottom: 30px;
}
</style>

<template>
  <div id="app">
    <main-layout />
  </div>
</template>

<script>
import MainLayout from './components/main-layout.vue'

export default {
    name: 'app',
    components: {
        MainLayout
    }
}
</script>

<style lang="scss">
/**
  material custom team
**/
@import "~vue-material/dist/theme/engine";

@include md-register-theme("default", (
        primary: #fff,
        accent: #f16536,
        theme: dark
));

@import "~vue-material/dist/theme/all";


#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

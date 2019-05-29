<template>
  <div class="page-container">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-accent">
        <city-search-form />
      </md-app-toolbar>

      <md-app-content>
        <transition-group class="animation-group" name="list" tag="div">
          <city-card v-for="(item , i) in allCities" :key="`${i}-${item}`" :weather-data="item" />
        </transition-group>
      </md-app-content>
    </md-app>
    <md-snackbar md-position="left" :md-active.sync="snackBarState" md-persistent>
      <span>City not found</span>
    </md-snackbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CitySearchForm from './city-search-form';
import CityCard from './city-card';

export default {
    name: 'main-layout',
    components: {
        CitySearchForm,
        CityCard
    },
    methods: {
        ...mapActions(['fetchCityFromLocalStorage','updateWeather'])
    },
    computed: mapGetters(['allCities','snackBarState']),
    created() {
        this.fetchCityFromLocalStorage();
        this.updateWeather();
    }
}
</script>

<style lang="scss" scoped>
.md-app {
  height: 100vh;
  border: 1px solid rgba(#000, .12);
}

.md-drawer {
  width: 230px;
  max-width: calc(100vw - 125px);
}

.animation-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  height: auto;
}

.list-enter-active, .list-leave-active {
  transition: all 300ms ease-in-out;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<template>
    <md-card class="md-primary">
        <md-card-header>
            <md-card-header-text>
                <span class="md-title">{{weatherData.name}}</span>
                <img class="card-header-icon card-header-flag" :src="`http://openweathermap.org/images/flags/${weatherData.sys.country.toLowerCase()}.png`" alt="flag icon">
                <div class="md-subhead card-header-temperature">{{ weatherData.main.temp | round }} °C {{ weatherData.weather[0].description }}</div>
                <img class="card-header-icon" :src="`http://openweathermap.org/img/w/${ weatherData.weather[0].icon }.png`" alt="weather icon">
            </md-card-header-text>
        </md-card-header>

        <md-card-actions>
            <md-button @click="removeCity(weatherData.id)" class="md-icon-button md-accent">
                <md-icon>delete</md-icon>
            </md-button>
        </md-card-actions>
    </md-card>
</template>

<script>
export default {
    name: 'city-card',
    props: {
        weatherData: {
            type: Object,
            required: true,
            default: () => { return {} }
        }
    },
    filters: {
        round(val) {
            return Math.round(val);
        }
    },
    methods: {
        removeCity(id) {
            this.$store.dispatch('removeCityById',id)
        }
    }
}
</script>

<style lang="scss" scoped>
.md-card {
    height: fit-content;
    flex: 0 0 22%;
    margin: 0 1% 20px;

    .md-card-header-text {
        display: flex;
        align-items: center;
    }

    .card-header-icon {
        margin: 8px 0 0 10px;
    }

    .card-header-flag {
        flex: 0 0 30px;
        height: 20px;
    }

    .card-header-temperature {
        color: #fff;
        font-weight: 600;
        background-color: gray;
        border-radius: 30px;
        display: table;
        padding: 10px;
        margin-left: auto;
    }
}
</style>

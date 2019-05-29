<template>
<md-field class="form">
        <label>Your city name</label>
        <md-input class="full" v-model="city" />
        <md-button @click="searchCity" class="md-icon-button md-accent">
            <md-icon>search</md-icon>
        </md-button>
    </md-field>
</template>

<script>
export default {
    name: 'city-search-form',
    data() {
        return {
            city: '',
        }
    },
    methods: {
        searchCity() {
            if (this.city === '') {
                return false
            }

            this.$store.dispatch('fetchCity', this.city);
            this.city = '';
        }
    }
}
</script>

<style lang="scss" scoped>
.form {
    width: 25%;
    display: flex;
    align-items: baseline;

    .full {
        flex: 1;
    }
}
</style>

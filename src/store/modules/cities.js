import Api from '../../services/api';

const state = {
    cities: [],
    snackBarState: false,
};

const getters = {
    allCities: state => state.cities,
    snackBarState: state => state.snackBarState,
};

const actions = {
    fetchCity({ commit }, city) {

        Api().get(`/weather?q=${city}&units=metric&appid=be9823b7b469fe0a92dad7d99c11f304`)
            .then((response) => {

                commit('setCities', response.data);

                // Storing city ids for loading weather data on next sessions
                const citiesFromStorage = localStorage.getItem('cities');

                if (!citiesFromStorage) {
                    localStorage.setItem('cities', response.data.id.toString());
                } else if(!citiesFromStorage.includes(response.data.id.toString())) {
                    localStorage.setItem('cities', citiesFromStorage + ',' + response.data.id);
                }
            }).catch(e => {
                commit('showSnackBar', true);
            });

    },
    fetchCityFromLocalStorage({ commit }) {
        const citiesFromStorage = localStorage.getItem('cities');

        if (citiesFromStorage) {
            Api().get(`group?id=${citiesFromStorage}&units=metric&appid=be9823b7b469fe0a92dad7d99c11f304`)
                .then((response) => {
                    commit('updateCitiesData', response.data.list);
                });
        }
    },
    updateWeather({ commit }) {
        setInterval(() => {
            const citiesFromStorage = localStorage.getItem('cities');

            if (citiesFromStorage) {
                Api().get(`group?id=${citiesFromStorage}&units=metric&appid=be9823b7b469fe0a92dad7d99c11f304`)
                    .then((response) => {
                        commit('updateCitiesData', response.data.list);
                    });
            }
        }, 600000);
    },
    removeCityById({ commit }, id) {
        // removing city id from local storage
        const citiesFromStorage = localStorage.getItem('cities');
        const citiesIdArr = citiesFromStorage.split(',');
        const upadtedIdArr = citiesIdArr.filter(brand => brand !== id.toString());
        localStorage.setItem('cities', upadtedIdArr.join());

        commit('removeProduct', id);
    }
};

const mutations = {
    setCities(state, newCities) {
        const existenceOfCity  = state.cities.find(city => city.id === newCities.id);

        if (!existenceOfCity) {
            state.cities.push(newCities);
        }
    },
    updateCitiesData: (state, updatedCities) => (state.cities = updatedCities),
    removeProduct: (state, id) => (state.cities = state.cities.filter(city => city.id !== id)),
    showSnackBar(state, uiState) {
        state.snackBarState = uiState;
        setTimeout(()=>{
            state.snackBarState = !uiState;
        }, 3000);
    }
};

export default {
    state,getters,actions,mutations,
};

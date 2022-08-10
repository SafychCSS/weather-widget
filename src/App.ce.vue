<template>
    <div
        class="weather-widget"
        :class="theme"
        v-if="weathers.length"
    >
        <button
            class="weather-widget__button weather-widget__button_settings"
            @click="isEditing = !isEditing"
        >
            <template v-if="!isEditing">&#9881;</template>
            <template v-else>&times;</template>
        </button>
        <WeatherList
            v-if="!isEditing"
            :weathers="weathers"
        />
        <WeatherListEdit
            v-else
            :weathers="weathers"
            :filtered-themes="filteredThemes"
            @new-location="addLocation"
            @remove-location="removeLocation"
            @close-settings="isEditing = false"
            @change-theme="changeTheme"
        />
    </div>
</template>

<script>
    import WeatherListEdit from './components/WeatherListEdit.vue';
    import WeatherList from './components/WeatherList.vue';
    import getPosition from './utils/getPosition.js';
    import fetchWeather from './utils/fetchWeather.js';
    import { saveUserLocations, saveUserTheme } from './utils/saveUserSettings.js';
    import {defineComponent, ref, reactive, computed } from 'vue';

    export default defineComponent({
        name: 'App',

        components: {
            WeatherList,
            WeatherListEdit,
        },

        emits: ['removeLocation'],

        setup() {
            const API_KEY = ref('4974807139fce1eb73651a44bbee39ec');
            const lat = ref('34.0522');
            const lon = ref('-118.2437');
            const isEditing = ref(false);
            const currentTheme = ref('default');
            const weathers = ref([]);
            const themes = reactive([
                {
                    name: 'default',
                    color: 'transparent',
                },
                {
                    name: 'light',
                    color: '#c4effb',
                },
                {
                    name: 'dark',
                    color: '#000',
                },
                {
                    name: 'purple',
                    color: '#800080',
                }
            ]);
            const loading = ref(true);

            const locationIds = computed(() => {
                return weathers.value.map(weather => weather.id);
            });

            const getWeather = async (query) => {
                try {
                    const weather = await fetchWeather(query, API_KEY.value);
                    if (locationIds.value.includes(weather.id)) {
                        alert(
                            `${weather.name} has already been added. Choose another location`,
                        );
                        return;
                    }
                    weathers.value.push({ ...weather });
                } catch (e) {
                    console.error(e);
                }
            };

            const init = async () => {
                try {
                    const clientGeo = await getPosition();
                    lat.value = clientGeo.coords.latitude;
                    lon.value = clientGeo.coords.longitude;

                    const query = `lat=${lat.value}&lon=${lon.value}`;
                    await getWeather(query);
                } catch (e) {
                    console.log('access to user geolocation denied or something wrong, load location by default');
                    const query = `lat=${lat.value}&lon=${lon.value}`;
                    await getWeather(query);
                }
            };

            const changeTheme = theme => {
                currentTheme.value = theme.name;
                saveUserTheme(currentTheme.value);
            };

            const locationNames = computed(() => {
                return weathers.value.map(weather => weather.name);
            });

            const addLocation = async (name) => {
                const query = `q=${name}`;
                await getWeather(query);

                saveUserLocations(locationNames.value);
            };

            const removeLocation = id => {
                if (weathers.value.length === 1) {
                    alert('Locations can\'t be empty');
                    return;
                }

                weathers.value = weathers.value.filter(weather => weather.id !== id);
                saveUserLocations(locationNames.value);
            };

            const filteredThemes = computed(() => {
                return themes.filter(theme => theme.name !== currentTheme.value);
            });

            const theme = computed(() => {
                return currentTheme.value ? `weather-widget_theme_${currentTheme.value}` : '';
            });

            return {
                API_KEY,
                weathers,
                isEditing,
                currentTheme,
                init,
                addLocation,
                removeLocation,
                changeTheme,
                locationIds,
                locationNames,
                filteredThemes,
                theme,
            };
        },

        watch: {
            locationNames: {
                handler(_, newValue) {
                    if (newValue.length) {
                        saveUserLocations(this.locationNames);
                    }
                },
            }
        },

        async created() {
            const clientLocations = JSON.parse(localStorage.getItem('weather-widget-locations'));
            const clientTheme = localStorage.getItem('weather-widget-theme');
            if (clientTheme) {
                this.currentTheme = clientTheme;
            } else {
                const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
                if (isDarkTheme) {
                    this.currentTheme = 'dark';
                }
            }
            if(clientLocations) {
                const locationsPromise = clientLocations.map(name => {
                    const query = `q=${name}`;
                    return fetchWeather(query, this.API_KEY);
                });
                const result = await Promise.all(locationsPromise);
                result.forEach(item => this.weathers.push({ ...item }));
            } else {
                await this.init();
            }
        },
    });
</script>

<style lang="scss">
@import "./assets/scss/style.scss";
</style>

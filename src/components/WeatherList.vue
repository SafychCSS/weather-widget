<template>
    <div class="weather-widget__list">
        <WeatherListItemVue
            v-for="weather in weathers"
            :weather="weather"
            :key="weather.id"
        />
    </div>
</template>

<script>
    import WeatherListItemVue from './WeatherListItem.vue';
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'WeatherList',

        components: {
            WeatherListItemVue,
        },

        props: {
            weathers: {
                type: Array,
                required: true,
            },
        },
    });
</script>

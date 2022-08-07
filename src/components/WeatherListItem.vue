<template>
    <div class="weather-widget__item">
        <p class="weather-widget__city">{{ weather.name }},
            <span class="weather-widget__country">{{ weather.sys.country }}</span>
        </p>
        <p class="weather-widget__description">{{ weather.weather[0].description }}</p>
        <div class="weather-widget__block">
            <img
                width="50"
                height="50"
                :src="'http://openweathermap.org/img/wn/'+ weather.weather[0].icon +'.png'"
                :srcset="'http://openweathermap.org/img/wn/'+ weather.weather[0].icon +'@2x.png 2x'"
                :alt="weather.weather.description"
            >
            <div class="weather-widget__temp">
                <p class="weather-widget__temp-current">{{ Math.round(weather.main.temp) }}&#176;</p>
                <p class="weather-widget__temp-max"><span>max:</span> {{ Math.round(weather.main.temp_max) }}&#176;</p>
                <p class="weather-widget__temp-min"><span>min:</span> {{ Math.round(weather.main.temp_min) }}&#176;</p>
            </div>
        </div>

        <div class="weather-widget__info">
            <div class="weather-widget__info-block">
                <p class="weather-widget__info-name">Feels like</p>
                <p class="weather-widget__info-value">{{ Math.round(weather.main.feels_like) }}</p>
            </div>

            <div class="weather-widget__info-block">
                <p class="weather-widget__info-name">Pressure</p>
                <p class="weather-widget__info-value">{{ weather.main.pressure }}</p>
            </div>

            <div class="weather-widget__info-block">
                <p class="weather-widget__info-name">Humidity</p>
                <p class="weather-widget__info-value">{{ weather.main.humidity }}</p>
            </div>
        </div>

        <div class="weather-widget__info">
            <div class="weather-widget__info-block">
                <p class="weather-widget__info-name">Visibility</p>
                <p class="weather-widget__info-value">{{ weather.visibility }}</p>
            </div>

            <div class="weather-widget__info-block">
                <p class="weather-widget__info-name">Wind</p>
                <p class="weather-widget__info-value">{{ weather.wind.speed }} / {{ weather.wind.deg }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import  { defineComponent } from 'vue';

    export default defineComponent({
        name: 'WeatherListItem',

        props: {
            weather: {
                type: Object,
                required: true,
            },
        },
    });
</script>

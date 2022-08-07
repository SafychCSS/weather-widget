<template>
    <div class="weather-widget__edit">
        <div class="widget-edit">
            <div class="widget-edit__themes">
                <p>Choose color themes:</p>
                <button
                    class="weather-widget__button weather-widget__button_theme"
                    :class="{'weather-widget__button_theme_default': theme.name === 'default'}"
                    v-for="theme in filteredThemes"
                    :key="theme.name"
                    @click="changeTheme(theme)"
                    :style="'background-color: ' + theme.color"
                >
                </button>
            </div>
            <draggable
                class="widget-edit__list"
                tag="ul"
                :list="weathers"
                handle=".weather-widget__button_hamburger"
            >
                <li
                    class="widget-edit__item"
                    v-for="weather in weathers"
                    :key="weather.id"
                >
                    <div
                        class="weather-widget__button weather-widget__button_hamburger"
                        data-draggable
                    ></div>
                    <span class="widget-edit__location">{{ weather.name }}, {{ weather.sys.country }}</span>
                    <button
                        class="weather-widget__button weather-widget__button_delete"
                        @click="$emit('removeLocation', weather.id)"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 172.541 172.541">
                            <g>
                                <path d="M166.797,25.078h-13.672h-29.971V0H49.388v25.078H19.417H5.744v15h14.806l10,132.463h111.443l10-132.463h14.805V25.078z    M64.388,15h43.766v10.078H64.388V15z M128.083,157.541H44.46L35.592,40.078h13.796h73.766h13.796L128.083,157.541z"/>
                                <rect x="80.271" y="65.693" width="12" height="66.232"/>
                                <rect x="57.271" y="65.693" width="12" height="66.232"/>
                                <rect x="103.271" y="65.693" width="12" height="66.232"/>
                            </g>
                        </svg>
                    </button>
                </li>
            </draggable>
            <div class="widget-edit__add-location">
                <form
                    @submit.prevent="addLocation"
                    class="widget-edit__form"
                >
                    <input
                        type="text"
                        v-model.trim="location"
                        class="widget-edit__input"
                        placeholder="Add location"
                    />
                    <button
                        class="weather-widget__button weather-widget__button_add"
                        type="submit"
                    >
                        &crarr;
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref } from 'vue';
    import { VueDraggableNext } from 'vue-draggable-next';

    export default defineComponent({
        name: 'WeatherListEdit',

        components: {
            draggable: VueDraggableNext,
        },

        props: {
            weathers: {
                type: Array,
                required: true,
            },

            filteredThemes: {
                type: Array,
                required: true,
            }
        },

        emits: ['newLocation', 'changeTheme', 'removeLocation'],

        setup(props, ctx) {
            const location = ref('');

            const addLocation = () => {
                ctx.emit('newLocation', location.value);
                location.value = '';
            };

            const changeTheme = theme => {
                ctx.emit('changeTheme', theme)
            };

            return {
                location,
                addLocation,
                changeTheme,
            };
        },
    });
</script>

# weather widget

Implement a widget that displays the weather in the specified cities.

1. Users should be able to add this widget to their websites as simple as inserting the snippet into an HTML-page:

   ```
   <weather-widget />

   <script type="text/javascript" url="{URL to
   the app}"></script>
   ````
2. Get data for the widget from [free public API](https://openweathermap.org/current). You must register an account at OpenWeather.
3. After clicking the ‘Gear’ button at the upper-right corner, switch the view to the following

   1. Remove previously added cities.
   2. Reorder the cities by dragging and dropping them within the list using ‘Hamburger’ icon to the left from the city name.
   3. Add new locations.
4. Save the configuration in the local storage and restore it on future visits. A user
   should be able to configure the widget just once and then have the same view
   until they change the computer or clean the storage
5. By default, on initial opening, request the current user’s location and display the weather in their city

   ![Screenshot20220815at165727.png](./assets/1660572658199-Screenshot%202022-08-15%20at%2016.57.27.png)


   ![Screenshot20220815at170949.png](./assets/Screenshot%202022-08-15%20at%2017.09.49.png)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

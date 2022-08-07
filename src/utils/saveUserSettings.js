function saveUserLocations(locations) {
    localStorage.setItem('weather-widget-locations', JSON.stringify(locations));
}

function saveUserTheme(theme) {
    localStorage.setItem('weather-widget-theme', theme);
}

export { saveUserLocations, saveUserTheme };
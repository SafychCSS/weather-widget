export default async function fetchWeather(query, key) {
    return fetch(
        `https://api.openweathermap.org/data/2.5/weather?&${query}&units=metric&appid=${key}`,
    )
        .then(response => {
            if (response.ok) {
                return response.json();
            }

            if (response.status === 404) {
                alert('Wrong location');
                return Promise.reject(response);
            }
        })
        .then(result => result)
        .catch(e => {
            throw(e.statusText);
        });
}

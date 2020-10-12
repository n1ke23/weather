import { data } from "autoprefixer";

export default {
    apiKey: `28262ec172630c10349c6d789ea281ff`,
    _city: '',
    fetchWeather() {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this._city}&units=metric&appid=${this.apiKey}`;
        return fetch(url)
            .then(response => response.json())
    },
    get city() {
        return this._city
    },
    set city(newCity) {
        this._city = newCity
    }
}
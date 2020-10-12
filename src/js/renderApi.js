import refs from './refs.js'
import fetch from './fetch.js'
import moment from 'moment'
import momentHandlebars from 'handlebars.moment'
import momentHelper from 'handlebars-helper-moment'
import template from './../template/template.hbs'
import { data } from 'autoprefixer';
let currentTime, sunriseTime, sunsetTime;
refs.form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.currentTarget.city.value);
    fetch.city = e.currentTarget.city.value;
    fetch.fetchWeather().then((data) => {
        // console.log(data);
        // console.log(new Date((data.sys.sunset * 1000) - (data.sys.sunrise * 1000)).getHours());
        // refs.item.innerHTML += `<p>Дата: ${currentTime}</p><p>Восход солнца: ${sunriseTime}</p><p>Закат солнца: ${sunsetTime}</p>`
        render({ data })
        unicRender(data)

    });
})
function render(data) {
    refs.item.innerHTML = ""
    refs.input.value = ''
    const items = template(data);
    refs.item.insertAdjacentHTML('afterbegin', items)
    // sunriseJs.insertAdjacentHTML('beforeend', sunriseTime)
    // sunsetJs.insertAdjacentHTML('beforeend', sunsetTime)
}
function unicRender(data) {
    currentTime = new Date(data.dt * 1000);
    sunriseTime = new Date(items.sys.sunrise * 1000);
    sunsetTime = new Date(items.sys.sunset * 1000);

    document.querySelector('.dtJs').textContent = currentTime
    console.log(currentTime);
    // console.log(data.dt);

}

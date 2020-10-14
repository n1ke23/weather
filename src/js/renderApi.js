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
        // refs.item.innerHTML += `<p>Дата: ${currentTime}</p><p>Восход солнца: ${sunriseTime}</p><p>Закат солнца: ${sunsetTime}</p>`
        unicRender(data)
        
    });
})
function unicRender(data) {
    // data.dtNow = new Date(data.dt * 1000);
    // data.nowDay = data.dtNow.getDay();
    // data.nowMonth = data.dtNow.getMonth() + 1;
    // data.nowYear = data.dtNow.getFullYear();
    data.dtNow = `${new Date(data.dt * 1000).getDate()}.${new Date(data.dt * 1000).getMonth() + 1}.${new Date(data.dt * 1000).getFullYear()}`;
    // data.sys.sunriseNew = new Date(data.sys.sunrise * 1000);
    // data.sys.sunriseHours = data.sys.sunriseNew.getHours();
    // data.sys.sunriseMinutes = data.sys.sunriseNew.getMinutes()
    data.sys.sunriseNew = `${new Date(data.sys.sunrise * 1000).getHours()}:${new Date(data.sys.sunrise * 1000).getMinutes()}`
    // data.sys.sunsetNew = new Date(data.sys.sunset * 1000);
    // data.sys.sunsetHours = data.sys.sunsetNew.getHours()
    // data.sys.sunsetMinutes =data.sys.sunsetNew.getMinutes()
    data.sys.sunsetNew = `${new Date(data.sys.sunset * 1000).getHours()}:${new Date(data.sys.sunset * 1000).getMinutes()}`
    //  console.log(new Date((data.sys.sunset * 1000) - (data.sys.sunrise * 1000)).getHours());
    data.sys.longDay = `${new Date((data.sys.sunset * 1000) - (data.sys.sunrise * 1000)).getHours()}`
    
    render({ data })
}
function render(data) {
    refs.item.innerHTML = ""
    refs.input.value = ''
    const items = template(data);
    refs.item.insertAdjacentHTML('afterbegin', items)
    // sunriseJs.insertAdjacentHTML('beforeend', sunriseTime)
    // sunsetJs.insertAdjacentHTML('beforeend', sunsetTime)
}

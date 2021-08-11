
const cityForm = document.querySelector('[data-js="form-location"]')
const cityName = document.querySelector('[data-js="city-name"]')
const cityWeather = document.querySelector('[data-js="city-weather"]')
const cityTemperature = document.querySelector('[data-js="city-temperature"]')
const cityCard = document.querySelector('[data-js="city-card"]')
const timeIcon = document.querySelector('[data-js="time-icon"]')
let imgTime = document.querySelector('[data-js="img-current"]')

const handleHTML = (selectedWeatherIcon, LocalizedName, WeatherText, Temperature) => {
    timeIcon.innerHTML = selectedWeatherIcon
    cityName.textContent = LocalizedName
    cityWeather.textContent = WeatherText
    cityTemperature.textContent = Temperature.Metric.Value
}

const isDayOrNight = IsDayTime => {
    if (IsDayTime) {
        imgTime.src = './src/day.svg'
    } else {
        imgTime.src = './src/night.svg'
    }
}

const showCityCard = () => {
    if (cityCard.classList.contains('d-none')) {
        cityCard.classList.remove('d-none')
    }
}

cityForm.addEventListener('submit', async event => {
    event.preventDefault()
    
    const inputValue = event.target.city.value
    
    const [{ Key, LocalizedName }] = await getCityData(inputValue)
    const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] = await getCityWeather(Key)     
    const selectedWeatherIcon = `<img src="./src/icons/${WeatherIcon}.svg">`    

    showCityCard()
    isDayOrNight(IsDayTime)
    handleHTML(selectedWeatherIcon, LocalizedName, WeatherText, Temperature)

    cityForm.reset()
})
const request = require('request')

const forecast = (long,lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=653f53416db4a3ad9860396314d9797e&query=${lat},${long}`

    request({url, json:true}, (error,{body}) => {
        if (error) {
            callback('Unable to connect to the weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        }

        else {
            const currentWeather = body.current;
            callback(undefined, `${currentWeather.weather_descriptions[0]}. Currently it is ${currentWeather.temperature} degree and it feels like ${currentWeather.feelslike}`)
            console.log();
        }
    })
}

module.exports = forecast
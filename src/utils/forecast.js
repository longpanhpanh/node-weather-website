const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url =
        `http://api.weatherstack.com/current?access_key=e66e713068c9822dad60d527e2049581&query=${latitude},${longitude}&units=m`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast', undefined)
        } else if (body.error) {
            callback('Unable to find the location. Try to search again', undefined)
        } else {
            const data = body.current
            callback(
              undefined,
              `${data.weather_descriptions[0]}. The temperature is ${data.temperature} but it feels like ${data.feelslike}. \t The humidity is ${data.humidity}%`
            );

        }
    })
}

module.exports = forecast;
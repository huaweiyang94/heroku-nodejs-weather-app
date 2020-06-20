const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=622d3a805903919444bc89c8870e3e3a&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            const { weather_descriptions, temperature, feelslike, humidity } = body.current;

            const data = `${weather_descriptions[0]}. It is currently ${temperature} degress out. It feels like ${feelslike} degrees. The humidity is ${humidity} %.`;
            callback(undefined, data);
        }
    });
};

module.exports = forecast;
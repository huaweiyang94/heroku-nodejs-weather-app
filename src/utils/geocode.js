const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibGFtYmJiIiwiYSI6ImNrYjhqeHd0eDA0dmEyd3BobzZlbWNqNjMifQ.PS9G5mPvFPkt-k-pefF3qA&limit=1`;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (!body.features.length) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            const { center: [ longitude, latitude ], place_name: location } = body.features[0];
            callback(undefined, {
                latitude,
                longitude,
                location
            });
        }
    });
};

module.exports = geocode;
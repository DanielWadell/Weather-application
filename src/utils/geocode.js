const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFuaWVsd2FkZWxsIiwiYSI6ImNqejZrNTVpcDBuM3kzbm5rcmdlOWV2aDIifQ.HtWtDwKXw1Zzr5_MGnN1qQ&limit=1'

    request({ url:url, json:true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Incorrect location has been entered!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
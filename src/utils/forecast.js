const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9e98303447decd89bd9922a3275dbd99/' + latitude + ',' + longitude

    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Incorrect location has been entered!', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, body.daily.data[0].summary + ' The high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '.' + ' It is currently ' + body.currently.temperature + ' degrees fahrenheit.')
        }
    })
}

module.exports = forecast
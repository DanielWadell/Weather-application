console.log('Client side javascript is here!')

fetch('http://localhost:3000/weather?address=yucaipa').then((response) => {
    response.json().then(({location, forecast, error} = {}) => {
        if (error) {
            return console.log('Wrong location entered!')
        }
        console.log(location)
        console.log(forecast)
    })
})
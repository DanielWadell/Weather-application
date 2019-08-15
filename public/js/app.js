console.log('Client side javascript is here!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then(({location, forecast, error} = {}) => {
        if (error) {
            return console.log(error)
        }
        console.log(forecast)
        console.log(location)
    })
})
})
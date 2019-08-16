const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

//selecting paragraphs in index.html
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then(({location, forecast, error} = {}) => {
        if (error) {
            messageOne.textContent = error
        } else {
            messageOne.textContent = location
            messageTwo.textContent = forecast
        }
    })
})
})
// console.log("Client side jascript file is loaded")

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })

// })


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#message_1')
const msg2 = document.querySelector('#message_2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    msg1.textContent = "Loading..."
    msg2.textContent = ''

    fetch('http://localhost:3000/weather?address='+search.value).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                msg1.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)
                 
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })

    })
})
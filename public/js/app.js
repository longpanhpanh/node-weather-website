console.log('Client side javascript has been loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector("#message-2")

messageOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (event) => {
    const location = search.value;

    event.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          return messageOne.textContent = data.error;
        }
        
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecast
      });
    });
})
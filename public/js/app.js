const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
let errorMessage = document.querySelector('#message-1');
let successMessage = document.querySelector('#message-2');

weatherForm.addEventListener('submit', e => {
  e.preventDefault();
  const loc = search.value;

  errorMessage.textContent = 'Loading...';
  successMessage.textContent = '';
  fetch(`/weather?address=${loc}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        return (errorMessage.textContent = data.error);
      }

      console.log(`Location: ${data.location}`);
      console.log(`Forecast ${data.forecast}`);

      errorMessage.textContent = '';
      successMessage.textContent = `${data.location} 
       ${data.forecast}`;
    });
  });
});

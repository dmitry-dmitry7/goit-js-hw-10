// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  
  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value;

  // Create promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Registering promise callbacks
  promise
    .then(value => {
      iziToast.show({
        close: false,
        message: `✅ Fulfilled promise in ${value}ms`,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',
      });
      console.log(value);
    })
    .catch(error => {
      iziToast.show({
        close: false,
        message: `❌ Rejected promise in ${error}ms`,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });    
      console.log(error);
    });

  form.reset();
}
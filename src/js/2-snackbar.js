// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target.elements.delay.value);
  console.log(event.target.elements.state.value);
    

  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value;

  // Create promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === "fulfilled") {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  // Registering promise callbacks
  promise
    .then(value => {
      iziToast.show({
        close: false,
        message: value,
        messageColor: '#fff',
        backgroundColor: '#59a10d',
        position: 'topRight',
      });
      console.log(value);
    })
    .catch(error => {
      iziToast.show({
        close: false,
        message: error,
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });    
      console.log(error);
    });

  form.reset();
}
// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const input = document.querySelector('input');
const button = document.querySelector('button');

const valueDays = document.querySelector('.value[data-days]');
const valueHours = document.querySelector('.value[data-hours]');
const valueMinutes = document.querySelector('.value[data-minutes]');
const valueSeconds = document.querySelector('.value[data-seconds]');
let userSelectedDate;
let intervalId;

button.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    
    if (userSelectedDate <= new Date()) {
      iziToast.warning({
        theme: 'dark',
        iconUrl: '/img/highlight_off_24dp_FFFFFF.png',
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
      button.disabled = true;

    } else {
      button.disabled = false;
    }

  },
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

flatpickr("input#datetime-picker", options);

button.addEventListener("click", handleClick);

function handleClick() {
  button.disabled = true;
  input.disabled = true;
  intervalId = setInterval(timerDate, 1000, userSelectedDate);
} 

function timerDate(userSelectedDate) {
  const timerTime = convertMs(userSelectedDate - new Date());
  
  valueDays.textContent = addLeadingZero(timerTime.days);
  valueHours.textContent = addLeadingZero(timerTime.hours);
  valueMinutes.textContent = addLeadingZero(timerTime.minutes);
  valueSeconds.textContent = addLeadingZero(timerTime.seconds);
  if (timerTime.days === 0 & timerTime.hours === 0 & timerTime.minutes === 0 & timerTime.seconds === 0) {
    clearInterval(intervalId);
    input.disabled = false;
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0")
}


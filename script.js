// image slides

var slideIndex = 1;
const minIndex = 1;
const maxIndex = 3;

function OpenNthSlide(n) {
  let modal = document.getElementsByClassName("modal-slideshow")[0];
  let img = document.getElementsByClassName("slideshow-image")[n - 1];
  let modalImg = document.getElementsByClassName("modal-image")[0];
  
  modal.style.display = "flex";
  modalImg.src = img.src;
  slideIndex = n;
  
  let prev_btn = document.getElementsByClassName("prev-button")[0];
  let next_btn = document.getElementsByClassName("next-button")[0];
  
  if (slideIndex == minIndex) { prev_btn.style.display = "none"; }
  else { prev_btn.style.display = "flex"; }
  if (slideIndex == maxIndex) { next_btn.style.display = "none"; }
  else { next_btn.style.display = "flex"; }
}

function PlusSlides(n) {
  OpenNthSlide(slideIndex + n);
}

function CloseSlides() {
  let modal = document.getElementsByClassName("modal-slideshow")[0];
  modal.style.display = "none";
}

function OpenFeedbackForm() {
  let modal = document.getElementsByClassName("modal-feedback-form")[0];
  modal.style.display = "flex";
}

// feedback form

const email = document.getElementById("mail");
const subject = document.getElementById("subject");

const feedback_form = document.getElementById("feedback");

const email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const subject_regex = /^[а-яА-Я0-9_.,'"!?;:& ]+$/i;

function validateEmail() {
  let result = email.value.match(email_regex);
  
  let result_color = result ? "#84ff80" : "#ff8080";
  email.style.background-color = result_color;
  
  return result;
}

function validateSubject() {
  let result = subject.value.match(subject_regex);
  
  let result_color = result ? "#84ff80" : "#ff8080";
  subject.style.backgroundColor = result_color;
  
  return result;
}

function postForm() {
  const correctly = validateEmail && validateSubject;
  let button = document.getElementById("fsubmit");
  let name = document.getElementById("fname").value;
  let subj = subject.value;
  document.body.style.cursor = 'wait';
  button.disabled = true;
  if (!correctly) {
    button.style.backgroundColor = "#ff8080";
    button.value = "Invalid input";
  button.disabled = false;
  } else {
    button.style.backgroundColor = "#84ff80";
    button.value = "Sending...";
    delay(2000);
    sendPost(name, subj);
    button.value = "Submitted";
  }
  document.body.style.cursor = 'default';
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function sendPost(post_title, post_body) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=UTF-8'},
    body: JSON.stringify({title: post_title, body: post_body})
  });
}

email.addEventListener("input", validateEmail());
subject.addEventListener("input", validateSubject());

feedback_form.addEventListener("submit", postForm());

function CloseForm() {
  let modal = document.getElementsByClassName("modal-feedback-form")[0];
  modal.style.display = "none";
}

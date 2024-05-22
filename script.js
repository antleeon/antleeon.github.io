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

const email = document.getElementById("mail");
const subject = document.getElementById("subject");

const email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const subject_regex = /^[а-яА-Я0-9_.,'"!?;:& ]+$/i;

const validateEmail = (email) => {
  let result = email.match(email_regex);
  
  let result_color = result ? "#84ff80" : "#ff8080";
  email.style.background-color = result_color;
  
  return result;
};

const validateSubject = (subject) => {
  let result = subject.match(subject_regex);
  
  let result_color = result ? "#84ff80" : "#ff8080";
  subject.style.background-color = result_color;
  
  return result;
}

email.addEventListener("input", validateEmail);
subject.addEventListener("input", validateSubject);

function CloseForm() {
  let modal = document.getElementsByClassName("modal-feedback-form")[0];
  modal.style.display = "none";
}

// image gallery

var slideIndex = 1;
const minIndex = 1;
const maxIndex = 3;

function openNthSlide(n) {
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

function plusSlides(n) {
  openNthSlide(slideIndex + n);
}

function closeSlides() {
  let modal = document.getElementsByClassName("modal-slideshow")[0];
  modal.style.display = "none";
}

function openFeedbackForm() {
  let modal = document.getElementsByClassName("modal-feedback-form")[0];
  modal.style.display = "flex";
}

// feedback form

var email = document.getElementById("mail");
var subject = document.getElementById("subject");

var feedback_form = document.getElementById("feedback");

const email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
const subject_regex = /^[а-яА-Я0-9_.,'"!?;:& ]+$/i;

function validateEmail() { // email validation
  let result = email.value.match(email_regex);
  
  let result_color = result ? "#84ff80" : "#ff8080";
  email.style.backgroundColor = result_color;
  
  return result;
}

function validateSubject() { // text language validation
  let result = subject.value.match(subject_regex);
  
  let result_color = result ? "#84ff80" : "#ff8080";
  subject.style.backgroundColor = result_color;
  
  return result;
}

function postForm() {
  const correctly = validateEmail() && validateSubject();
  let button = document.getElementById("fsubmit");
  let name = document.getElementById("fname").value;
  let subj = subject.value;
  document.body.style.cursor = 'wait';
  button.disabled = true;
  if (!correctly) {
    button.style.backgroundColor = "#ff8080";
    button.value = "Invalid input";
    button.disabled = false;
    return false;
  }
  button.style.backgroundColor = "#84ff80";
  button.value = "Sending...";
  delay(2000);
  sendPost(name, subj);
  button.value = "Submitted";
  document.body.style.cursor = 'default';
  return true;
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

email.addEventListener("input", validateEmail);
feedback_form.addEventListener("submit", postForm);

function closeForm() {
  let modal = document.getElementsByClassName("modal-feedback-form")[0];
  modal.style.display = "none";
}

// 30-seconds message

function setMessage() {
  var all_cookies = document.cookie.split(';');
  var found_cookie = false;
  for (var i = 0; i < all_cookies.length; i++) {
    name = all_cookies[i].split('=')[0];
    if (name == 'message_sent') {
      found_cookie = true;
      break;
    }
  }
  if (!found_cookie) {
    setTimeout(() => {
      alert("You can fill out the feedback form");
      var name = "mesage_sent";
      var value = "true";
    
      var now = new Date();
      now.setMonth(now.getMonth() + 1);
      var expire = now.toUTCString();
    
      document.cookie = name + "=" + value + "; expires=" + expire + "; path=/"; 
    }, 30000);
  }
}

setMessage();

// countdown timer

var countdown_timer = document.getElementById("countdowntimer");
const countdown_date = new Date("May 31, 2027 23:59:59").getTime();

function updateCountdown() {
  var now = new Date().getTime();
  var distance = countdown_date - now;

  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdown_timer.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  if (distance < 0) {
    clearInterval(x);
    countdown_timer.innerHTML = "Already got!";
  }
}

var countdownUpdater = setInterval(updateCountdown() , 1000);

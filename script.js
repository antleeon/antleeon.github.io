var slideIndex = 1;
var minIndex = 1;
var maxIndex = 3;

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

function CloseForm() {
  let modal = document.getElementsByClassName("modal-feedback-form")[0];
  modal.style.display = "none";
}

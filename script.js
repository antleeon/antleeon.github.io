var slideIndex = 1;

function OpenNthSlide(n) {
  let modal = document.getElementById("slideshow_modal");
  let img = document.getElementsByClassName("slideshow-image")[n - 1];
  let modalImg = document.getElementsByClassName("modal-image")[0];
  modal.style.display = "block";
  modalImg.src = img.src;
  slideIndex = n;
}

function PlusSlides(n) {
  OpenNthSlide(slideIndex + n);
}

function CloseSlides() {
  let modal = document.getElementById("slideshow_modal");
  modal.style.display = "none";
}

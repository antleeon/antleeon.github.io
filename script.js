function OpenNthSlide(n) {
  let modal = document.getElementById("slideshow_modal");
  let modalImg = document.getElementsByClassName("modal-image")[0];
  modal.style.display = "block";
  modalImg.src = this.src;
}

function CloseSlides() {
  modal.style.display = "none";
}

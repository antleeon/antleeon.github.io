var modal = document.getElementById("slideshow_modal");

var img = document.getElementById("slsh_img_1");
var modalImg = document.getElementById("img_1");
img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
}

var span = document.getElementsByClassName("close-button")[0];

span.onclick = function() {
  modal.style.display = "none";
}

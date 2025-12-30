const modal = document.getElementById("image-modal");
const modalImage = document.getElementById("enlarged-image");

document.querySelectorAll(".zoomimage").forEach((img) => {
  img.onclick = function () {
    modal.style.display = "block";
    modalImage.src = this.src;
  };
});

modal.onclick = function (e) {
  if (e.target !== modalImage) {
    modal.style.display = "none";
  }
};

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});

const modal = document.getElementById("modal");
const closeBtn = modal.querySelector(".close-modal-view");

document.addEventListener("click", function (e) {
  const button = e.target.closest(".openModalBtn");
  if (!button) return;

  console.log("click");
  modal.style.display = "block";
  requestAnimationFrame(() => {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  });
});

// const openButtons = document.querySelectorAll(".openModalBtn");

// openButtons.forEach(button => {
//   button.addEventListener("click", () => {
//     console.log('click');
//     modal.style.display = "block";
//     requestAnimationFrame(() => {
//       modal.classList.add("show");
//       modal.classList.remove("hide");
//       document.body.style.overflow = "hidden";
//     });
//     console.log('click');
//   });
// });

function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";

  setTimeout(() => {
    modal.style.display = "none";
  }, 300);
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});
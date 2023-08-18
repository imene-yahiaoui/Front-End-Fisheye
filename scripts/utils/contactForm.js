function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}
document.getElementById('openModal') .addEventListener('click',displayModal)
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
document.getElementById('closeModal') .addEventListener('click',closeModal)



const filtre = `
<section class="filtre-box">
  <label for="filter">Trier par :</label>
  <label for="data-select" class="data-select select-icon"> 
    <p class="value">Popularité</p>
    <button class="data_btn"><i class="fa-solid fa-angle-down"></i></button>
  </label>
  <div class="custom-select">
    <button class="custom-select-option select-icon" data-value="Popularité">Popularité <i class="fa-solid fa-chevron-up"></i></button>
    <button class="custom-select-option" data-value="Date">Date</button>
    <button class="custom-select-option" data-value="Titre">Titre</button>
  </div>
</section>
`;

document
  .querySelector(".photograph-header")
  .insertAdjacentHTML("afterend", filtre);

const selectContainer = document.querySelector(".data_btn");
const select = document.querySelector(".custom-select");
const label = document.querySelector(".data-select .value");

selectContainer.addEventListener("click", () => {
  select.classList.toggle("open"); //affiche les options
});

const buttonSelect = document.querySelectorAll(".custom-select-option");
buttonSelect.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedValue = button.getAttribute("data-value");
    label.textContent = selectedValue; //metre le text de value
    select.classList.remove("open");
  });
});

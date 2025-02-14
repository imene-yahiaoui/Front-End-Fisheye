const filtre = `
<section class="filtre-box">
  <label for="filter">Trier par :</label>
  <button class="data_btn" aria-label="filtre" >
  <label for="data-select" class="data-select select-icon"> 
    <p class="value">Popularité</p>
   <i class="fa-solid fa-angle-down"></i>
  </label>
  </button>
  <div class="custom-select">
    <button class="custom-select-option select-icon" data-value="Popularité" aria-label="filtre par Popularité">Popularité <i class="fa-solid fa-chevron-up"></i></button>
    <button class="custom-select-option" data-value="Date" aria-label=" filtre par Date">Date</button>
    <button class="custom-select-option" data-value="Titre" aria-label="filtre par Titre">Titre</button>
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
//les function de filtre
//par like
function sortByLikes(mediaArray) {
  // Trier les médias par likes décroissants
  let sortedMedia = mediaArray.slice();

  // Mettre à jour les likes à partir du stockage local
  sortedMedia.forEach((media) => {
    const mediaId = media.id;
    const storedLikes = localStorage.getItem(`likes_${mediaId}`);

    if (storedLikes !== null) {
      media.likes = parseInt(storedLikes, 10); // Mettre à jour les likes du média à partir du stockage local
    }
  });
  ///apres recuprer tout les media en active le filtre
  sortedMedia = mediaArray.slice().sort((a, b) => b.likes - a.likes);

  return sortedMedia;
}

//par date la plus recente
function sortByDate(mediaArray) {
  return mediaArray.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}
//par order alphabetique
function sortByTitle(mediaArray) {
  return mediaArray.slice().sort((a, b) => a.title.localeCompare(b.title));
}

// écoute a les btn de filtre
buttonSelect.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedValue = button.getAttribute("data-value");
    label.textContent = selectedValue;
    select.classList.remove("open");

    // Mettez à jour  le div des media
    currentSortCriteria = selectedValue;
    document.getElementById("media").innerHTML = ""; // Efface les médias actuels

    processData();
  });
});

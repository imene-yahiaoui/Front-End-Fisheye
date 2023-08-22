const getProfile = async () => {
  try {
    const requete = await fetch("./data/photographers.json", {
      method: "GET",
    });

    if (requete.ok) {
      const data = await requete.json();

      // Filtrer les photographes et médias en fonction de l'id
      const photographers = data.photographers.filter(
        (profil) => profil.id === Number(idUrl)
      );
      const media = data.media.filter(
        (profil) => profil.photographerId === Number(idUrl)
      );

      return {
        photographers: photographers,
        media: media,
      };
    }
  } catch (e) {
    console.log(e);
  }
};

let currentSortCriteria = "Popularité"; // Valeur par défaut

// Appeler la fonction getProfile
const processData = async () => {
  const profileData = await getProfile();
  if (profileData) {
    const photographer = profileData.photographers[0];

    // Triez les médias en fonction du critère actuel
    let sortedMedia = profileData.media;
    if (currentSortCriteria === "Popularité") {
      sortedMedia = sortByLikes(sortedMedia);
    } else if (currentSortCriteria === "Date") {
      sortedMedia = sortByDate(sortedMedia);
    } else if (currentSortCriteria === "Titre") {
      sortedMedia = sortByTitle(sortedMedia);
    }

    sortedMedia.forEach((media) => ProfileMedia(media, photographer));
  }
};

processData();

const info = async () => {
  const profileData = await getProfile();
  if (profileData) {
    const photographer = profileData.photographers[0];
    profile(photographer);
  }
};
info();

//function pour créer les éléments HTML
function profile(data) {
  const { name, portrait, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;

  const photographerInfo = `
      <div id="cader">
        <h2>${name}</h2>
        <p>${city}, ${country}</p>
        <p>${tagline}</p>
        
      </div>
    `;

  document
    .getElementById("main_contact")
    .insertAdjacentHTML("afterbegin", photographerInfo);

  const photographerImg = `
    <div id="imagePhotographer">
      <img  class="photographerImg" src=${picture} alt=${name}></div>
    `;
  document
    .getElementById("main_contact")
    .insertAdjacentHTML("beforeend", photographerImg);
}

//Crée un continer div pour regrouper l'ensemble des médias
const div = `
  <div id="media" > </div>
  `;

document.getElementById("main").insertAdjacentHTML("beforeend", div);

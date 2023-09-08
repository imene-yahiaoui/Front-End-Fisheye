var idUrl = window.location.search.substring(4);

const getProfile = async () => {
  try {
    const requete = await fetch("./data/photographers.json", {
      method: "GET",
    });

    if (requete.ok) {
      const data = await requete.json();
      /**
       * protéger la route
       * Vérifier si l'id correspond à un photographe existant
       */

      const photographerExists = data.photographers.some(
        (profil) => profil.id === Number(idUrl)
      );

      if (!photographerExists) {
        console.log("Aucun photographe ne correspond à cet ID");
        window.location.href = "index.html";
        return null;
      }
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
    Lightbox.init();
  }
};

processData();

const info = async () => {
  const profileData = await getProfile();
  if (profileData) {
    const photographer = profileData.photographers[0];
    profile(photographer);
    getName(photographer);
  }
};
info();


function profile(data) {

  const { name, portrait, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;

  const photographerInfo = `
      <div id="cader">
        <h2 class="cader-name">${name}</h2>
        <p>${city}, ${country}</p>
        <p>${tagline}</p>
        
      </div>
    `;

  document
    .getElementById("main_contact")
    .insertAdjacentHTML("afterbegin", photographerInfo);

  const photographerImg = `
    <div id="imagePhotographer">
      <img  class="photographerImg" src=${picture} alt="la photo de photographe:${name}"></div>
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

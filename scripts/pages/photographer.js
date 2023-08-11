// Récupérer l'id depuis l'URL
var idUrl = window.location.search.substring(4);
console.log(idUrl);

// Récupérer les données du id
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

      console.log(photographers);
      console.log(media);

      return {
        photographers: photographers,
        media: media,
      };
    }
  } catch (e) {
    console.log(e);
  }
};

// Appeler la fonction getProfile
const processData = async () => {
  const profileData = await getProfile();
  if (profileData) {
    const photographer = profileData.photographers[0];
    profile(photographer);
    profileData.media.forEach(ProfileMedia); // Appeler ProfileMedia pour chaque média
  }
};

processData();

//function pour créer les éléments HTML
function profile(data) {
  const { name, portrait, city, country, tagline } = data;
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
    <img class="photographerImg" src=${picture} alt=${name}>
  `;
  document
    .getElementById("main_contact")
    .insertAdjacentHTML("beforeend", photographerImg);
}

//cree les médias
function ProfileMedia(media) {
  const { id, image, title,photographerId,video } = media;

  const photo = `../../assets/images/photos/${photographerId}/${image}
  `;
  const videoMedia = `../../assets/images/photos/${photographerId}/${video}`;

  if (video === undefined) {
  const mediaPhotographe = `
  <div class="media">
  <figure class="media-info">
    <img class="photographerImg" src=${photo} alt=${title}>
    <figcaption class="media-title">${title}</figcaption>
    <div class="like">
<p> ${likes} </p>
<i class="fa-solid fa-heart"></i>
    </div>
    </figure>
    </div>
  `;
  document
  .getElementById("main")
  .insertAdjacentHTML("beforeend", mediaPhotographe);
  } 

 
else{
 
  const mediaPhotographe = `
  <div class="media">
  <figure class="media-info">
    <video  width="320" height="240" autoplay class="video" src=${videoMedia} type="video/mp4" >

    <figcaption class="media-title">${title}</figcaption>
    <div class="like">
<p> ${likes} </p>
<i class="fa-solid fa-heart"></i>
    </div>
    </figure>
    </div>
  `;



  document
  .getElementById("main")
  .insertAdjacentHTML("beforeend", mediaPhotographe);
}

}

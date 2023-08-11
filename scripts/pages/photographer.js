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
  }
};

processData();

function profile(data) {
  const { name, portrait, id, city, country, tagline, price } = data;
  const picture = `assets/photographers/${portrait}`;
  //cree les information de photographers
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
  //cree l'image de photographers
const photographerImg = `
<img class="photographerImg"  src=${picture} alt=${name} >
`;
document
.getElementById("main_contact")
.insertAdjacentHTML("beforeend", photographerImg );

}
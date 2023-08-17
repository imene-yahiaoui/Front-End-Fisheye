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
//Crée un conteneur div pour regrouper l'ensemble des médias
const div = `
<div id="media" > </div>
`;

document.getElementById("main").insertAdjacentHTML("beforeend", div);

//cree les médias
function ProfileMedia(media) {
  const { id, image, title, photographerId, video, likes } = media;

  const photo = `../../assets/images/photos/${photographerId}/${image}
  `;
  const videoMedia = `../../assets/images/photos/${photographerId}/${video}`;
  //si ya pas des videos
  if (video === undefined) {
    const mediaPhotographe = `
 
  <figure class="media-info">
  <a href=${photo} class="img-media"  data-title="${title}">
    <img class="mediaImg" src=${photo} alt="${title}">
    </a>
    <div class="media-title-like">
    <figcaption class="media-title">${title}</figcaption>
  
    <div class="like">
<p > ${likes} </p>
<i class="fa-solid fa-heart" aria-label="likes"></i>
</div>
</div>
   
    </figure>
    
  `;
    document
      .getElementById("media")
      .insertAdjacentHTML("beforeend", mediaPhotographe);
  }

  //si il ya  des videos
  else {
    const mediaPhotographe = `
 
  <figure class="media-info">
  <a href=${videoMedia} class="img-media" data-title="${title}">
    <video  class="video" src=${videoMedia} type="video/mp4" >
    </a>
    <div class="media-title-like">
    <figcaption class="media-title">${title}</figcaption>
    <div class="like">
<p> ${likes} </p>
<i class="fa-solid fa-heart"></i>
</div>
</div>
    </figure>
   
  `;

    document
      .getElementById("media")
      .insertAdjacentHTML("beforeend", mediaPhotographe);
  }

  //cree le lightbox
  class Lightbox {
    static init() {
      const links = document.querySelectorAll(
        'a[href$=".png"], a[href$=".jpeg"], a[href$=".jpg"], a[href$=".mp4"]'
      );

      console.log(links);
      links.forEach((link) =>
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const href = link.getAttribute("href");
          const title = link.getAttribute("data-title");
          new Lightbox(href, title);
        })
      );
    }

    constructor(url, titre) {
      this.element = this.buildDom(url, titre);
      this.onKeyUp = this.onKeyUp.bind(this);
      document.body.appendChild(this.element);
      document.addEventListener("keyup", this.onKeyUp);
    }

    //function close lightbox avec clavier
    onKeyUp(e) {
      if (e.key === "Escape" || e.key === "Esc") {
        this.close(e);
      }
    }
    //function close lightbox
    close() {
      const lightboxes = document.querySelectorAll(".lightbox");
      lightboxes.forEach((lightbox) => {
        lightbox.classList.add("fadeOut");
      });
  
      window.setTimeout(() => {
        lightboxes.forEach((lightbox) => {
          if (lightbox.parentElement) {
            lightbox.parentElement.removeChild(lightbox);
          }
        });
      }, 500);


  //suprission d'EventListener apres la  fermeture de lghitbox 
      document.removeEventListener("keyup", this.onKeyUp);
    }

    buildDom(url, titre) {
      const dom = document.createElement("div");
      dom.classList.add("lightbox");
      //di il ya un video
      if (url.endsWith(".mp4")) {
        dom.innerHTML = `
        <div class="lightbox-div">
        <button class="close fa-x">  </button >
        <button class="right">     <i class="fa-solid fa-chevron-right"></i> </button >
        <button class="left">      <i class="fa-solid fa-chevron-left"></i>  </button >
        <div class="lightbox-container">
        <video  class="video" src=${url} type="video/mp4" >
        <P class="media-title">${titre}</P>
        </div>
       
        </div>
      `;
        //si il yas pas de video
      } else {
        dom.innerHTML = `
        <div class="lightbox-div">
    <button class="close fa-x">  </button >
    <button class="right">     <i class="fa-solid fa-chevron-right"></i> </button >
    <button class="left">      <i class="fa-solid fa-chevron-left"></i>  </button >
   
      <div class="lightbox-container">
     
      <img src="${url}" alt="${titre}">
      <P class="media-title">${titre}</P>
      </div>
     
      </div>
    `;
      }
      dom
        .querySelector(".close")
        .addEventListener("click", this.close.bind(this));
      return dom;
    }
  }

  Lightbox.init();
}

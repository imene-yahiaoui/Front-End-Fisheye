// Récupérer l'id depuis l'URL
var idUrl = window.location.search.substring(4);

//cree les médias
function ProfileMedia(media, data) {
  const { id, image, title, photographerId, video, likes } = media;
  const { price } = data;
  const photo = `../../assets/images/photos/${photographerId}/${image}
  `;
  const videoMedia = `../../assets/images/photos/${photographerId}/${video}`;

  let thisMedia =
    video === undefined
      ? `<a href=${photo} class="img-media" data-title="${title}">
    <img class="mediaImg" src=${photo} alt="${title}">
  </a>`
      : `<a href=${videoMedia} class="img-media" data-title="${title}">
  <video class="video" src=${videoMedia} type="video/mp4"></video></a>`;

  const mediaPhotographe = `
   <figure class="media-info">
  ${thisMedia}
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

  /////////////affiche le total des likes
  const mediaInfoElements = document.querySelectorAll(".media-info");
  let totalLikes = 0;

  mediaInfoElements.forEach((element) => {
    const likes = parseInt(element.querySelector(".like p").textContent);
    totalLikes += likes;
  });

  //cree tarif box
  const tarifBox = `
   <div class="tarif-box">
    <div class="like-box">
    <p>${totalLikes}</p>
    <i class="fa-solid fa-heart black"></i>
  </div>
    <p> ${price}€  / jour </p>
    </div>
    
  `;
  document.getElementById("media").insertAdjacentHTML("beforeend", tarifBox);
}
//appeler Lightbox.init(), après le chargement du contenu de la page
window.onload = function () {
  Lightbox.init();
};

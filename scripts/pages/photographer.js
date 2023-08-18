// Récupérer l'id depuis l'URL
var idUrl = window.location.search.substring(4);



//cree les médias
function ProfileMedia(media, data) {
  const { id, image, title, photographerId, video, likes } = media;
  const { price } = data;

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

  /////////////affiche le totel likes
  const mediaInfoElements = document.querySelectorAll(".media-info");
  let totalLikes = 0;

  mediaInfoElements.forEach((element) => {
    const likes = parseInt(element.querySelector(".like p").textContent, 10);
    totalLikes += likes;
  });

  console.log(totalLikes);

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

  //cree le lightbox
  class Lightbox {
    static init() {
      // this.activeLightbox = null; // Initialize the active lightbox reference

      const links = document.querySelectorAll(
        'a[href$=".png"], a[href$=".jpeg"], a[href$=".jpg"], a[href$=".mp4"]'
      );

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
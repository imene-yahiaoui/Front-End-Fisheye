//cree le lightbox
class Lightbox {
  static init() {
    const links = Array.from(document.querySelectorAll("a[data-src]"));
    const images = links.map((link) => link.getAttribute("data-src"));
    const getAllTitles = Array.from(document.querySelectorAll("a[data-title]"));
    // Récupérer tous les titres
    const titles = getAllTitles.map((getAllTitle) =>
      getAllTitle.getAttribute("data-title")
    );
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const datasrc = e.currentTarget.getAttribute("data-src");
        const title = e.currentTarget.getAttribute("data-title");
        new Lightbox(datasrc, title, images, titles);
      })
    );
  }
  constructor(url, title, images, titles) {
    this.element = this.buildDom(url, title);
    this.images = images;
    this.title = title;
    this.titles = titles;
    this.onKeyUp = this.onKeyUp.bind(this);
    this.nexKey = this.nexKey.bind(this);
    this.prevKey = this.prevKey.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("keyup", this.nexKey);
    document.addEventListener("keyup", this.prevKey);
    this.url = url;
  }
  /////les fuction avec le clavier////
  //function close lightbox avec clavier
  onKeyUp(e) {
    if (e.key === "Escape" || e.key === "Esc") {
      this.close(e);
    }
  }
  ///fonction right avec le clavier
  nexKey(e) {
    if (e.key === "ArrowRight") {
      this.next(e);
    }
  }
  ///fonction left avec le clavier
  prevKey(e) {
    if (e.key === "ArrowLeft") {
      this.prev(e);
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
    document.removeEventListener("keyup", this.prevKey);
    document.removeEventListener("keyup", this.nexKey);
  }
  //function prev
  prev() {
    const currentIndex = this.images.indexOf(this.url); // Trouver l'indice du url actuel
    const currentTitleIndex = this.titles.indexOf(this.title); // Trouver l'indice du titre actuel
    const numImages = this.images.length; // Nombre total de images
    const numTitles = this.titles.length; // Nombre total de titres
    const prevIndex = (currentIndex - 1 + numImages) % numImages;
    const prevTitleIndex = (currentTitleIndex - 1 + numTitles) % numTitles; // Indice du titre précédent
    this.url = this.images[prevIndex];
    this.title = this.titles[prevTitleIndex]; // Utilise le titre précédent
    this.updateMediaContent();
  }
  // function  next
  next() {
    const currentIndex = this.images.indexOf(this.url); // Trouver l'indice du url actuel
    const currentTitleIndex = this.titles.indexOf(this.title); // Trouver l'indice du titre actuel
    const numImages = this.images.length; // Nombre total de images
    const numTitles = this.titles.length; // Nombre total de titres
    const nextIndex = (currentIndex + 1) % numImages;
    const nextTitleIndex = (currentTitleIndex + 1) % numTitles; // Indice du titre suivant
    this.url = this.images[nextIndex];
    this.title = this.titles[nextTitleIndex]; // Utilise le titre suivant
    this.updateMediaContent();
  }
  // Function de update le media dans lightbox
  updateMediaContent() {
    const mediaLightbox = this.url.endsWith(".mp4")
      ? `<video class="video" controls>
      <source src="${this.url}" type="video/mp4"> </video>`
      : `<img src="${this.url}" alt="${this.title}">`;
    const mediaTitle = `<p class="media-title">${this.title}</p>`;
    const lightboxContainer = this.element.querySelector(".lightbox-container");
    lightboxContainer.innerHTML = mediaLightbox + mediaTitle;
  }

  buildImageContent(url, title) {
    const mediaLightbox = LightBoxFactory(url, title);
  }

  buildDom(url, title) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");

    const mediaLightbox = LightBoxFactory(url, title);

    dom.innerHTML = `
    <div class="lightbox-div">
      <button class="close fa-x"></button>
      <button class="right" aria-label=" adroit "><i class="fa-solid fa-chevron-right"></i></button>
      <button class="left"aria-label="agouche "><i class="fa-solid fa-chevron-left"></i></button>
      <div class="lightbox-container" aria-label="photo de ${title}">
    ${mediaLightbox}    
    <p class="media-title">${title}</p>
      </div>
    </div>
  `;
    dom
      .querySelector(".close")
      .addEventListener("click", this.close.bind(this));
    dom.querySelector(".right").addEventListener("click", this.next.bind(this));
    dom.querySelector(".left").addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

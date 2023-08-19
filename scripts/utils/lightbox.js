//cree le lightbox
class Lightbox {

  static init() {
 


    const links = Array.from(
      document.querySelectorAll(
        'a[href$=".png"], a[href$=".jpeg"], a[href$=".jpg"], a[href$=".mp4"]'
      )

    );
    const images = links.map((link) => link.getAttribute("href"));
    // console.log("gaaalry", images);
    let a=0
    
    console.log("boucle ",a);
    links.forEach((link) =>

      link.addEventListener("click", (e) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute("href");
        const title = e.currentTarget.getAttribute("data-title");
a=a+1
console.log("boucle 2 ",a);
        new Lightbox(href, title, images);
      })
    );
        }
  constructor(url, title, images) {
    this.element = this.buildDom(url, title);
    this.images = images;
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
    this.url = url;
  
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



 
  buildImageContent(url, title) {
    const mediaLightbox = url.endsWith(".mp4")
      ? `<video class="video" src=${url} type="video/mp4"></video>`
      : `<img src="${url}" alt="${title}">`;

    return `
    ${mediaLightbox}
    <p class="media-title">${title}</p>
  `;
  }

  buildDom(url, title) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");

    // la condition si une img ou video
    const mediaLightbox = url.endsWith(".mp4")
      ? `<video class="video" src=${url} type="video/mp4"></video>`
      : `<img src="${url}" alt="${title}">`;

    dom.innerHTML = `
    <div class="lightbox-div">
      <button class="close fa-x"></button>
      <button class="right"><i class="fa-solid fa-chevron-right"></i></button>
      <button class="left"><i class="fa-solid fa-chevron-left"></i></button>
      <div class="lightbox-container">
        ${mediaLightbox}
        <p class="media-title">${title}</p>
      </div>
    </div>
  `;

    dom
      .querySelector(".close")
      .addEventListener("click", this.close.bind(this));
    // dom.querySelector(".right").addEventListener("click", this.next.bind(this));
    // dom.querySelector(".left").addEventListener("click", this.prev.bind(this));
    return dom;
  }

}

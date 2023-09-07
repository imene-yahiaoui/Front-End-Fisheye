/**
 * Récupérer le id
 *  */

var urlParams = new URLSearchParams(window.location.search);
var idUrl = urlParams.get("id");

//cree les médias
function ProfileMedia(media, data) {
  const { id, image, title, photographerId, video, likes } = media;
  const { price } = data;

  const thisMedia = mediaFactory(media);
  const mediaPhotographe = `
   <figure class="media-info">
  ${thisMedia}
     <div class="media-title-like">
       <figcaption class="media-title" aria-label="${title}" >${title}</figcaption>
        <div class="like">
        <p aria-label="${likes}">${likes}</p>
         <button class='hearts' aria-label="Cœur" ><i class="fa-solid fa-heart"  ></i></button>
        </div>
     </div>
   
    </figure> 
    
  `;
  document
    .getElementById("media")
    .insertAdjacentHTML("beforeend", mediaPhotographe);
  //click sur e coeur

  const mediaInfoElement = document.querySelectorAll(".media-info");

  // Parcourir tous les éléments media-info une seule fois
  mediaInfoElement.forEach((element) => {
    const like = element.querySelector(".like p");
    const currentLikes = parseInt(like.textContent);

    const heartButton = element.querySelector(".hearts");
    heartButton.addEventListener("click", () => {
      const updatedLikes = currentLikes + 1;
      like.textContent = updatedLikes.toString();
    });
  });

  /////////////affiche le total des likes
  const mediaInfoElements = document.querySelectorAll(".media-info");
  let totalLikes = 0;
  mediaInfoElements.forEach((element) => {
    const likes = parseInt(element.querySelector(".like p").textContent);
    totalLikes += likes;
    TotalLikes = totalLikes;

    const heartButton = element.querySelector(".hearts");
    //quand on click sur like
    heartButton.addEventListener("click", () => {
      //update total Likes
      const tarifBox = document.querySelectorAll(".tarif-box");
      tarifBox.forEach((element) => {
        const Total = element.querySelector(".totalLikes");
        const currentTotal = parseInt(Total.textContent);
        let updateTotalLikes = 0;
        mediaInfoElements.forEach((element) => {
          const likes = parseInt(element.querySelector(".like p").textContent);
          updateTotalLikes += likes;
          //affiche update totla likes
          Total.textContent = updateTotalLikes.toString();
        });
      });
    });
  });

  //cree tarif box
  const tarifBox = `
   <div class="tarif-box">
     <div class="like-box">
       <p class='totalLikes'> ${TotalLikes}</p>
       <i class="fa-solid fa-heart black"></i>
     </div>
       <p> ${price}€  / jour </p>
   </div>
    
  `;
  document.getElementById("media").insertAdjacentHTML("beforeend", tarifBox);

  Lightbox.init();
}

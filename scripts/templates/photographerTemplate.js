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
  
  // Appeler la fonction getProfile
  const processData = async () => {
    const profileData = await getProfile();
    if (profileData) {
      const photographer = profileData.photographers[0];
      profile(photographer);

      let filtreMedia = "Popularité"; // Valeur par défaut
     // filtrer les media
    let sortedMedia = profileData.media;
    if (filtreMedia === "Popularité") {
      sortedMedia = sortByLikes(sortedMedia);
    } else if (filtreMedia === "Date") {
      sortedMedia = sortByDate(sortedMedia);
    } else if (filtreMedia === "Titre") {
      sortedMedia = sortByTitle(sortedMedia);
    }

    sortedMedia.forEach((media) => ProfileMedia(media, photographer));
  }
  };
  
  processData();
  
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
      <img class="photographerImg" src=${picture} alt=${name}>
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
  
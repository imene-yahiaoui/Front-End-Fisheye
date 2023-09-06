/**
 * Génère le balisage HTML pour afficher une image dans la galerie de médias.
 * @param {Object} media - Les informations sur le média (image).
 * @returns {string} - Le balisage HTML pour l'image.
 */

function generateDomPhoto(media) {
  const { image, photographerId, title } = media;

  const photo = `../../assets/images/photos/${photographerId}/${image}`;
  return `<a href="${photo}" class="img-media" data-title="${title}" aria-label="${title}">
    <img class="mediaImg" src="${photo}" alt="photo de ${title}">
  </a>`;
}
/**
 * Génère le balisage HTML pour afficher une vidéo dans la galerie de médias.
 * @param {Object} media - Les informations sur le média (vidéo).
 * @returns {string} - Le balisage HTML pour la vidéo.
 */
function generateDomVideo(media) {
  const { video, photographerId, title } = media;
  const videoMedia = `../../assets/images/photos/${photographerId}/${video}`;
  return `<a href="${videoMedia}" class="img-media" data-title="${title}" aria-label=" video de ${title}">
    <video class="video"  controls> <source src=" ${videoMedia}" type="video/mp4"></video></a>`;
}

function mediaFactory(media) {
  const { video } = media;
  return video === undefined
    ? generateDomPhoto(media)
    : generateDomVideo(media);
}

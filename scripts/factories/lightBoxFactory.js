/**
 * Génère le balisage HTML pour afficher une image dans la lightbox.
 * @param {string} url - L'URL de l'image.
 * @param {string} title - Le titre ou le texte alternatif pour l'image.
 * @returns {string} - Le balisage HTML pour l'image.
 */

function generateLightBoxPhoto(url, title) {
  return `<img src="${url}" alt="${title}"  >`;
}
/**
 * Génère le balisage HTML pour afficher une vidéo dans la lightbox.
 * @param {string} url - L'URL de la vidéo.
 * @param {string} title - Le titre ou le texte alternatif pour l'image.
 * @returns {string} - Le balisage HTML pour la vidéo.
 */
function generateLightBoxVideo(url, title) {
  return `<video class="video" controls aria-label="Lecture vidéo ${title}" >
  <source src="${url}" type="video/mp4"></video>`;
}
/**
 * Fonction  qui détermine s'il faut générer un élément image ou vidéo pour la lightbox.
 * @param {string} url - L'URL du média (image ou vidéo).
 * @param {string} title - Le titre ou le texte alternatif pour le média.
 * @returns {string} - Le balisage HTML pour l'élément média (soit une image, soit une vidéo).
 */
function LightBoxFactory(url, title) {
  if (url.endsWith(".mp4")) {
    return generateLightBoxVideo(url, title);
  } else {
    return generateLightBoxPhoto(url, title);
  }
}

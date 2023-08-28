function generateDomPhoto(media) {
  const { image, photographerId, title } = media;

  const photo = `../../assets/images/photos/${photographerId}/${image}`;
  return `<a href="${photo}" class="img-media" data-title="${title}" aria-label="Clickable Link img">
    <img class="mediaImg" src="${photo}" alt="${title}">
  </a>`;
}

function generateDomVideo(media) {
  const { video, photographerId, title } = media;
  const videoMedia = `../../assets/images/photos/${photographerId}/${video}`;
  return `<a href="${videoMedia}" class="img-media" data-title="${title}" aria-label="Clickable Link video">
    <video class="video" src="${videoMedia}" type="video/mp4"></video></a>`;
}

function mediaFactory(media) {
  const { video } = media;
  return video === undefined
    ? generateDomPhoto(media)
    : generateDomVideo(media);
}

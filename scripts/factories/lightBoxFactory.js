function generateLightBoxPhoto(url, title) {
  return `<img src="${url}" alt="${title}">`;
}

function generateLightBoxVideo(url) {
  return `<video class="video" controls>
  <source src="${url}" type="video/mp4"></video>`;
}

function LightBoxFactory(url, title) {
  if (url.endsWith(".mp4")) {
    return generateLightBoxVideo(url);
  } else {
    return generateLightBoxPhoto(url, title);
  }
}

function photographerTemplate(data) {
  const { name, portrait, id, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.innerHTML = `
      <a href="photographer.html?id=${id}">
        <img src="${picture}" alt="photographer picture ${name}">
        <h2>${name}</h2>
      </a>
      <span>${city}, </span>
      <span>${country}</span>
      <p>${tagline}</p>
      <p>${price}€/jour</p>
    `;

    return article;
  }

  return { name, picture, getUserCardDOM };
}

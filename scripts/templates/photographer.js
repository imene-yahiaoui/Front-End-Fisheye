function photographerTemplate(data) {
    const { name, portrait , id, city,country,tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const a=  document.createElement( 'a' );
        //ajout le lien ver la page photographer
        a.setAttribute("href",`photographer.html?id=${id}`);
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);
     
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
const span= document.createElement( 'span' );
span.textContent = `${city}, `;
const span1= document.createElement( 'span' );
span1.textContent = country;
const  P1= document.createElement( 'p' );
P1.textContent = tagline;
const  P2= document.createElement( 'p' );
P2.textContent = `${price}€/jour`;


article.appendChild(a);
a.appendChild(img);
a.appendChild(h2);
        // article.appendChild(img);
        // article.appendChild(h2);
        article.appendChild(span);
        article.appendChild(span1);
        article.appendChild(P1);
        article.appendChild(P2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}
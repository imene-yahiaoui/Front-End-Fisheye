//ouvre   modal contact
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}
document.getElementById("openModal").addEventListener("click", displayModal);

//ferme  modal contact
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

document.getElementById("closeModal").addEventListener("click", closeModal);
//ferme  modal contact avec clavier
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal();
  }
});
function getName(data) {
  const { name } = data;
  const modalContact = document.querySelector(".modal-contact");
  const nom = `<h2 > ${name}</h2>`;
  modalContact.insertAdjacentHTML("beforeend", nom);
}

//cree les element de modal contact
const form = document.forms["contact"];
const first = document.querySelector(".first");

const contactInfo = `

<div  class="formData last">
<label for="lastName">Nom</label>
<input id="last" placeholder="entrer votre nom "   type="text" name="lastName" minlength="2" required/>
</div>
<div class="formData email">
<label for="email">Email</label>
<input id="email" placeholder="entrer votre email"  type="email" name="email"
required/>
</div>
<div class="formData message">
<label for="message" >Votre message</label>
<textarea id="message" placeholder="entrer votre message"  type="text" rows="20" name="message"  required></textarea>
</div>

`;

first.insertAdjacentHTML("afterend", contactInfo);

const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const email = document.getElementById("email");
const message = document.getElementById("message");
//la validation de formlaire
/////////////validation pour le prenom
function validateFirst(form) {
  const validateFirst = document.querySelector(".first");
  const first = form["first"].value.trim();

  //Si le prénom est vide ou contient moins de 2 lettres
  if (first === "" || first.length < 2) {
    validateFirst.setAttribute("data-error-visible", "true");
    validateFirst.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du Prénom"
    );

    return false;
    //Si le prénom est correctement rempli
  } else {
    validateFirst.setAttribute("data-error-visible", "false");
    validateFirst.removeAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du Prénom"
    );
    return true;
  }
}
///////////////validation pour le nom
function validateLast(form) {
  const validateLast = document.querySelector(".last");
  const last = form["last"].value.trim();
  //Si le nom est vide ou contient moins de 2 lettres
  if (last === "" || last.length < 2) {
    validateLast.setAttribute("data-error-visible", "true");
    validateLast.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom"
    );

    return false;
    //Si le prénom est correctement rempli
  } else {
    validateLast.setAttribute("data-error-visible", "false");
    validateLast.removeAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom"
    );
    return true;
  }
}
///////////////validation pour l'email
function validateEmail(form) {
  const validateEmailField = document.querySelector(".email");
  const email = form["email"].value;

  // Utilisation d'une expression régulière pour valider le format de l'email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //si l'email est vide
  if (email === "") {
    validateEmailField.setAttribute("data-error-visible", "true");
    validateEmailField.setAttribute(
      "data-error",
      "Veuillez saisir votre email"
    );
    return false;
    // si l'email nai pas valide
  } else if (!emailRegex.test(email)) {
    validateEmailField.setAttribute("data-error-visible", "true");
    validateEmailField.setAttribute(
      "data-error",
      "Veuillez saisir une adresse email valide"
    );
    return false;
  } else {
    validateEmailField.setAttribute("data-error-visible", "false");
    validateEmailField.removeAttribute("data-error");
    return true;
  }
}
//message
function validatemessage(form) {
  const validatemessage = document.querySelector(".message");
  const message = form["message"].value.trim();
  //Si le nom est vide ou contient moins de 2 lettres
  if (message === "" || message.length < 2) {
    validatemessage.setAttribute("data-error-visible", "true");
    validatemessage.setAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du message"
    );

    return false;
    //Si le messege bien rempli
  } else {
    validatemessage.setAttribute("data-error-visible", "false");
    validatemessage.removeAttribute(
      "data-error",
      "Veuillez entrer 2 caractères ou plus pour le champ du nom"
    );
    return true;
  }
}
const reserveForm = document.getElementById("form");

//declache la validation de formulaire
reserveForm.addEventListener("submit", function (event) {
  event.preventDefault();
  validate();
});
/////////////// Form validation
function validate() {
  const isFirstNameValid = validateFirst(form);
  const isLastNameValid = validateLast(form);
  const isEmailValid = validateEmail(form);
  const isValidateMessage = validatemessage(form);

  return (
    isFirstNameValid && isLastNameValid && isEmailValid && isValidateMessage
  );
}

////////// Fonction pour gérer  le bouton de soumission "cest parti"
function handleFormSubmit(e) {
  e.preventDefault(); // Empêche la soumission du formulaire
  //modal confermation

  function modalConfirmation() {
    const modalconferm = `
    <div class="continer_modal">
    <div class="modal-confermation ">
      <div class="modal_title">
       <p>confermation </p>
       <img src="../../assets/icons/close.svg" alt="icon" id="closeModal" />
      </div>
      <p> ${prenom.value} Merci pour votre message </p>
      <button id ="submitModal" type="submit"class="contact_button"> ok </button>
    </div>
    </div>`;
    document
      .getElementById("main")
      .insertAdjacentHTML("beforeend", modalconferm);
    // Rediriger vers la page index.html pour les 2 btn
    document.getElementById("closeModal").addEventListener("click", gotoindex);
    document.getElementById("submitModal").addEventListener("click", gotoindex);
  }
  function gotoindex() {
    window.location.href = "../../index.html";
  }
  ////////// Appeler la fonction validate() si elle retourne true
  if (validate()) {
    modalConfirmation();

    console.log(
      `prenom:${prenom.value}  nom: ${nom.value}  email: ${email.value}  message: ${message.value}`
    );
  }
}

//ecoute  le click de submit
document
  .getElementById("btn-submit")
  .addEventListener("click", handleFormSubmit);

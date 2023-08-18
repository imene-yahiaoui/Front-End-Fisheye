
//ouvre   modal contact
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}
document.getElementById('openModal') .addEventListener('click',displayModal)

//ferme   modal contact 
function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}
document.getElementById('closeModal') .addEventListener('click',closeModal)


//cree les element de modal contact 

const form = document.getElementById('form')
const first = document.querySelector('.first')

const contactInfo=`

<div>
<label>Nom</label>
<input placeholder="entrer votre nom "   type="text" required/>
</div>
<div>
<label>Email</label>
<input placeholder="entrer votre email"  type="email"
required/>
</div>
<div>
<label>Votre message</label>
<textarea placeholder="entrer votre message"  type="text" rows="20"  required></textarea>
</div>

`

first.insertAdjacentHTML("afterend", contactInfo);
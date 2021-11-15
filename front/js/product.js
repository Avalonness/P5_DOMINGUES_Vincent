/*  ---------- Générer les produits en HTML  ---------- */
//Récupérer l'ID du produit
const url_id = window.location.search;


const urlSearchParams = new URLSearchParams(url_id);


const id = urlSearchParams.get("id");

//Sélection des classes pour injecter les éléments
const imgProduct = document.querySelector(".item__img");
const nameProduct = document.getElementById("title");
const priceProduct = document.getElementById("price");
const descriptionProduct = document.getElementById("description");
const colorsProduct = document.getElementById("colors");
const titleProduct = document.querySelector("title");
let i = 0;

//Récupérer l'objet via l'ID
fetch(`http://localhost:3000/api/products/${id}`).then(function(response){
response.json().then(function(data){ //Injecter les informations dans le code HTML
titleProduct.innerHTML = `${data.name}`;
imgProduct.innerHTML = `<img src="${data.imageUrl}" alt="Photographie d'un canapé">`;
nameProduct.innerHTML = `${data.name}`;
priceProduct.innerHTML = `${data.price}`;
descriptionProduct.innerHTML = `${data.description}`;
for (let i of data.colors) {
    colorsProduct.innerHTML += `<option value="${i}">${i}</option>`;
}


/* ----------Panier Utilisateur ---------- */
//Selection ID formulaire //
const idOptionsColors = document.querySelector("#colors");
const idOptionsQuantity = document.querySelector("#quantity");

//Sélection du bouton ajouter à l'artible//
const btn_ajoutPanier = document.querySelector("#addToCart");

//Evenement d'ajout au panier//
btn_ajoutPanier.addEventListener("click", (event)=>{
event.preventDefault();

//Choix de l'utilisateur//
const choixOptions = idOptionsColors.value;
const choixQuantity = idOptionsQuantity.value;

//Récupérer les éléments du formulaire//
let produitOptions = {
    nameProduct: data.name,
    idProduct: data._id,
    colorsProduct: choixOptions,
    priceProduct: data.price,
    quantitéProduct: choixQuantity,
    imgProduct: data.imageUrl
   
}
// ---- Ajout au panier utilisateur ---- //
//Variable "produitEnregistre"

let produitEnregistreLocal = JSON.parse(localStorage.getItem("produit")); /*JSON.parse pour convertir les données au format JSON en JS*/

//Fonction fenetre validation
const fenetreConfirmation = () => {
    if(window.confirm(`${data.name} couleur: ${choixOptions} a été ajouté au panier.
Allez au panier (Ok) ou retourner à l'acceuil (Annuler). `)){
        window.location.href = "cart.html";
    } else {
        window.location.href = "index.html";
    }
}
//Fonction pour ajout dans le localStorage:
const ajoutLocalStorage = () => {
    let estDejaPresent = false;
    produitEnregistreLocal.forEach(function(element){
        if(produitOptions.idProduct == element.idProduct && produitOptions.colorsProduct == element.colorsProduct){
            element.quantitéProduct = parseInt(element.quantitéProduct) + parseInt(produitOptions.quantitéProduct);
            estDejaPresent = true;
            return element;
        }
    }) 
if(!estDejaPresent){
    produitEnregistreLocal.push(produitOptions);  
}
    localStorage.setItem("produit", JSON.stringify(produitEnregistreLocal));
}

//Si déjà produit dans le localStorage
if(!produitEnregistreLocal){
    produitEnregistreLocal = [];
}
    ajoutLocalStorage ();
    fenetreConfirmation();

})
})
});



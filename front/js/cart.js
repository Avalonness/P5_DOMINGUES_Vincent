//Récupérer les données du local storage
let produitEnregistreLocal = JSON.parse(localStorage.getItem("produit"));

/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/!\  Injection du Code Dynamique 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//Sélection de la classe 
const panierId = document.getElementById("cart__items");

//Si Panier vide, le notifier.
if (produitEnregistreLocal === null || produitEnregistreLocal == 0 ){
    const panierVide = `<article class="cart__item">
        <div>
            <p>Le panier est vide</p>
        </div>
    </article>`;
    panierId.innerHTML = panierVide;
} else { // Si le panier n'est pas vide : afficher les objets
    let arrayProduitPanier = [];

    for(a = 0; a < produitEnregistreLocal.length; a++){
        arrayProduitPanier = arrayProduitPanier + `
        <article class="cart__item" data-id="${produitEnregistreLocal[a].idProduct}" data-color="${produitEnregistreLocal[a].colorsProduct}">
            <div class="cart__item__img">
                <img src="${produitEnregistreLocal[a].imgProduct}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${produitEnregistreLocal[a].nameProduct} - ${produitEnregistreLocal[a].colorsProduct}</h2>
                    <p>${produitEnregistreLocal[a].priceProduct} €</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitEnregistreLocal[a].quantitéProduct}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
        </article>`;
    }

        if(a === produitEnregistreLocal.length){
            panierId.innerHTML = arrayProduitPanier;
        }
    
};


/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/!\  Supprimer un élément du panier 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
//Localisation du boutton supprimer
let boutonSupprimerPanier = document.getElementsByClassName(`deleteItem`);

for(let n = 0; n < boutonSupprimerPanier.length; n++){
    boutonSupprimerPanier[n].addEventListener("click", (event) =>{
    event.preventDefault();

        //Supprimer l'élément cliqué avec méthode filter
        let idProductSupprimer = produitEnregistreLocal[n].idProduct;
        let colorsProductSupprimer = produitEnregistreLocal[n].colorsProduct;
        produitEnregistreLocal = produitEnregistreLocal.filter(el => el.idProduct !== idProductSupprimer);

        //Renvoyer l'array dans le localstorage
        localStorage.setItem("produit", JSON.stringify(produitEnregistreLocal));
        window.location.href = "cart.html";
    })
}

/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/!\  Modifier la quantité d'un produit sur le panier
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
//Sélection de l'input pour modifier la quantité du panier
const selectQuantity = document.querySelectorAll('.itemQuantity');

selectQuantity.forEach(function(valueQuantite){
    valueQuantite.addEventListener("change", (event) => {
        //Variable pour sélectionner les articles / quantités
        let newQuantity = event.target.value;
        let selectItems = event.target.closest(".cart__item").dataset.id;
        let selectColors = event.target.closest(".cart__item").dataset.color;

        //Boucle afin de traiter les éléments du localStorage et les comparer aux variables pour modifier le bon élément.
       for (i = 0; i < produitEnregistreLocal.length; i++){
            if(produitEnregistreLocal[i].idProduct == selectItems && produitEnregistreLocal[i].colorsProduct == selectColors){
            produitEnregistreLocal[i].quantitéProduct = newQuantity;
            localStorage.setItem("produit", JSON.stringify(produitEnregistreLocal)); 
            window.location.href = "cart.html";  
            break;
            }
        }
})
});

/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/!\  Calcul du coup total 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

//Fonction de calcul
//Variable pour le prix et quantité
let totalPanier = 0;
let totalQuantitePanier = 0;
const articlePrice = document.getElementById(`totalPrice`);
const articleQuantite = document.getElementById('totalQuantity');

//Fonction pour calculer le prix total à partir prix Articles + Quantité Articles du localStorage
produitEnregistreLocal.forEach(function(totalCommandePanier){
    totalQuantitePanier += parseInt(totalCommandePanier.quantitéProduct);;
    totalPanier += totalCommandePanier.priceProduct * parseInt(totalCommandePanier.quantitéProduct);
});

    articlePrice.innerHTML = `${totalPanier}`;
    articleQuantite.innerHTML = `${totalQuantitePanier}`;

/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/!\ Formulaire commande 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
//Sélection du formulaire
const boutonOrderFormulaire = document.querySelector('#order');

//Evenement au click du bouton order
boutonOrderFormulaire.addEventListener("click", (e)=>{
    e.preventDefault();

    //Récupérer les valeurs du formulaire : 
    const formulaireContent = {
        prenom: document.querySelector("#firstName").value,
        nom: document.querySelector("#lastName").value,
        adresse: document.querySelector("#address").value,
        ville: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }

/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/!\ Validation Formulaire commande 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
// Règle pour des noms propres.
const regExNomPropre = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
};

const regExEmail = (value) => {
    return /^([A-Za-z\d\.-]+)@([a-z\d-]+).([a-z]{2,8})(\.[a-z]{2,8})?$/.test(value);
};

const regExAdresse = (value) => {
    return /^[A-Za-z0-9]{5,50}$/.test(value);
};

const textAlert = (value) => {
    return `${value} : Les caractères spéciaux et chiffres ne sont pas autorisés et doit contenir entre 3 et 20 caractères.`
};


//Vérification du PRENOM
    function prenomValidation(){
    const prenomValue = formulaireContent.prenom;
    if(regExNomPropre(prenomValue)){
        return true;
    }else{
        alert(textAlert(`Prénom`));
        return false;
    }
    };

//Vérification du NOM
    function nomValidation(){
    const nomValue = formulaireContent.nom;
    if(regExNomPropre(nomValue)){
        return true;
    }else{
        alert(textAlert(`Nom`));
        return false;
    }
    };

//Vérification de la VILLE 
function villeValidation(){
    const villeValue = formulaireContent.ville;
    if(regExNomPropre(villeValue)){
        return true;
    }else{
        alert(textAlert(`Ville`));
        return false;
    }
    };

//Vérification de l'ADRESSE
function adresseValidation(){
    const adresseValue = formulaireContent.adresse;
    if(regExAdresse(adresseValue)){
        return true;
    }else{
        alert(`L'adresse ne semble pas correcte. Elle ne doit pas contenir de caractère spéciaux et doit comporter entre 5 et 50 caractères.`);
        return false;
    }
    };  
    
//Vérification du EMAIL 
function emaillValidation(){
    const emailValue = formulaireContent.email;
    if(regExEmail(emailValue)){
        return true;
    }else{
        alert(`L'adresse email ne saisit ne semble pas valide.`);
        return false;
    }
    };  

    //Mettre l'objet des valeurs du formulaire dans le localStorage
    if(prenomValidation() && nomValidation() && villeValidation() && emaillValidation() && adresseValidation()){
    localStorage.setItem("formulaireContent", JSON.stringify(formulaireContent));
    } else {
        alert("Le formulaire n'est pas complet ou comporte une erreur.");
    }
    
    //Envoyer les informations utilsiateurs ainsi que les produits de la commande
    const serveurEnvoie = {
        produitEnregistreLocal,
        formulaireContent  
    }

    console.log(serveurEnvoie);

})



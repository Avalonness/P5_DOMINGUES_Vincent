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
//tableau ID
let tableauProductId = [];
for (z = 0; z < produitEnregistreLocal.length; z++){
tableauProductId.push(produitEnregistreLocal[z].idProduct);
};

//Sélection du formulaire
const boutonOrderFormulaire = document.querySelector('#order');
const validationCommande = document.querySelector('#orderId');

//Evenement au click du bouton order
boutonOrderFormulaire.addEventListener("click", (e)=>{
    e.preventDefault();

    //Récupérer les valeurs du formulaire : 
    const formulaireContent = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    }

/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/!\ Validation Formulaire commande 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
// Règle pour des noms propres.
const regExNomPropre = (value) => {
    return /^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(value);
};

const regExEmail = (value) => {
    return /^([A-Za-z\d\.-]+)@([a-z\d-]+).([a-z]{2,8})(\.[a-z]{2,8})?$/.test(value);
};

const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{5,50}$/.test(value);
};

const textAlert = (value) => {
    return `${value} : Les caractères spéciaux et chiffres ne sont pas autorisés et doit contenir entre 3 et 20 caractères.`
};


//Vérification du PRENOM
    function prenomValidation(){
    const prenomValue = formulaireContent.firstName;
    if(regExNomPropre(prenomValue)){
        document.querySelector(`#firstNameErrorMsg`).textContent = ``;
        return true;
    }else{
        document.querySelector(`#firstNameErrorMsg`).textContent = `Champ obligatoire`;
        alert(textAlert(`Prénom`));
        return false;
    }
    };

//Vérification du NOM
    function nomValidation(){
    const nomValue = formulaireContent.lastName;
    if(regExNomPropre(nomValue)){
        document.querySelector(`#lastNameErrorMsg`).textContent = ``;
        return true;
    }else{
        document.querySelector(`#lastNameErrorMsg`).textContent = `Champ obligatoire`;
        alert(textAlert(`Nom`));
        return false;
    }
    };

//Vérification de l'ADRESSE
function adresseValidation(){
    const adresseValue = formulaireContent.address;
    if(regExAdresse(adresseValue)){
        document.querySelector(`#addressErrorMsg`).textContent = ``;
        return true;
    }else{
        document.querySelector(`#addressErrorMsg`).textContent = `Champ obligatoire`;
        alert(`L'adresse ne semble pas correcte. Elle ne doit pas contenir de caractère spéciaux et doit comporter entre 5 et 50 caractères.`);
        return false;
    }
    };  

//Vérification de la VILLE 
function villeValidation(){
    const villeValue = formulaireContent.city;
    if(regExNomPropre(villeValue)){
        document.querySelector(`#cityErrorMsg`).textContent = ``;
        return true;
    }else{
        document.querySelector(`#cityErrorMsg`).textContent = `Champ obligatoire`;
        alert(textAlert(`Ville`));
        return false;
    }
    };
    
//Vérification du EMAIL 
function emaillValidation(){
    document.querySelector(`#emailErrorMsg`).textContent = ``;
    const emailValue = formulaireContent.email;
    if(regExEmail(emailValue)){
        return true;
    }else{
        document.querySelector(`#emailErrorMsg`).textContent = `Champ obligatoire`;
        alert(`L'adresse email ne saisit ne semble pas valide.`);
        return false;
    }
    };  

    //Mettre l'objet des valeurs du formulaire dans le localStorage
    if(prenomValidation() && nomValidation() && adresseValidation() && villeValidation() && emaillValidation()){
    localStorage.setItem("formulaireContent", JSON.stringify(formulaireContent));

    /* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/!\ Requête API POST
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

// Envoyer l'ensemble des informations utilisateurs et produits sur le serveur.
const requeteServeur = fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        contact: formulaireContent,
        products: tableauProductId
    })
});

//récupérer le résultat dans la console
requeteServeur.then(async(response)=>{
    try{
        const contenu = await response.json();
        console.log(contenu);
//Condition si le serveur répond ou non 
        if(response.ok){
            idOrderServer = contenu.orderId;
// renvoie sur la page de validation de commande avec l'id de commande généré par le serveur
            window.location = `confirmation.html?orderId=${contenu.orderId}`;
            
            
        } else {
//affiche une erreur avec le serveur s'il ne répond pas
            alert(`Problème avec le serveur : erreur ${response.status}`)
        }
    }catch(e){
        console.log(e);
    }
})
    } else {
        alert("Le formulaire n'est pas complet ou comporte une erreur.");
    }
    
    /*//Envoyer les informations utilsiateurs ainsi que les produits de la commande
    const serveurEnvoie = {
        produitEnregistreLocal,
        formulaireContent  
    }*/
    


});

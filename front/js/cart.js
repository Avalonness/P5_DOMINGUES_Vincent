//Récupérer les données du local storage
let produitEnregistreLocal = JSON.parse(localStorage.getItem("produit"));
console.log(produitEnregistreLocal[0].quantitéProduct);

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
        console.log(event.target.value);
        let newQuantity = event.target.value;
        let selectItems = event.target.closest(".cart__item").dataset.id;
        let selectColors = event.target.closest(".cart__item").dataset.color;
        console.log(selectItems);
        console.log(selectColors);
        

       for (i = 0; i < produitEnregistreLocal.length; i++){
            if(produitEnregistreLocal[i].idProduct == selectItems && produitEnregistreLocal[i].colorsProduct == selectColors){
            console.log(produitEnregistreLocal[i].idProduct);
            produitEnregistreLocal[i].quantitéProduct = newQuantity;
            localStorage.setItem("produit", JSON.stringify(produitEnregistreLocal)); 
            window.location.href = "cart.html";               
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
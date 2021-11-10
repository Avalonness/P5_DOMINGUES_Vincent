//Récupérer les données du local storage
let produitEnregistreLocal = JSON.parse(localStorage.getItem("produit"));

/* ______________________________________
/!\  Injection du Code Dynamique 
_________________________________________*/

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
        <article class="cart__item" data-id="${produitEnregistreLocal[a].idProduct}">
            <div class="cart__item__img">
                <img src="${produitEnregistreLocal[a].imgProduct}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__titlePrice">
                    <h2>${produitEnregistreLocal[a].nameProduct}</h2>
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


/* ______________________________________
/!\  Supprimer un élément du panier 
_________________________________________*/
//Localisation du boutton supprimer
let boutonSupprimerPanier = document.getElementsByClassName(`deleteItem`);

for(let n = 0; n < boutonSupprimerPanier.length; n++){
    boutonSupprimerPanier[n].addEventListener("click", (event) =>{
    event.preventDefault();

        //Supprimer l'élément cliqué avec méthode filter
        let idProductSupprimer = produitEnregistreLocal[n].idProduct;
        produitEnregistreLocal = produitEnregistreLocal.filter(el => el.idProduct !== idProductSupprimer);

        //Renvoyer l'array dans le localstorage
        localStorage.setItem("produit", JSON.stringify(produitEnregistreLocal));
        window.location.href = "cart.html";
    })
}
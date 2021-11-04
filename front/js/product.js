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
let i = 0;

//Récupérer l'objet via l'ID
fetch(`http://localhost:3000/api/products/${id}`).then(function(response){
response.json().then(function(data){
imgProduct.innerHTML = `<img src="${data.imageUrl}" alt="Photographie d'un canapé">`;
nameProduct.innerHTML = `${data.name}`;
priceProduct.innerHTML = `${data.price}`;
descriptionProduct.innerHTML = `${data.description}`;
for (let i of data.colors) {
    colorsProduct.innerHTML += `<option value="${i}">${i}</option>`;
}
})
});










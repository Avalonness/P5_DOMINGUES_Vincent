/* //Script permettant d'injecter les objets de l'API dans le HTML//
fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    console.log(data);
    let item = "";
    for(let object of data) { //Parcourt le tableau afin de récupérer les éléments et générer les éléments HTML//
        item += ` 
          <a href="./product.html?id=42">
            <article>
              <img src="${object.imageUrl}" alt="image de ${object.name}">
              <h3 class="productName">${object.name}</h3>
              <p class="productDescription">${object.description}</p>
            </article>
          </a>
        `;
      }
    document.getElementById("items").innerHTML = item; //Injecte l'objet dans l'HTML//
})*/


// Permet d'appeler la requête et retourne les données
function getData() {
    fetch('http://localhost:3000/api/products')
    .then(res => res.json())
    .then(data => displayHtml(data)); // ici on appelle la deuxième fonction en passant les datas en paramètre
  };
  
  // Boucle sur les données puis injecte le html
  function displayHtml(data) {
    let item = "";
    for(let object of data) {
      item += `
        <a href="./product.html?id=42">
          <article>
            <img src="${object.imageUrl}" alt="image de ${object.name}">
            <h3 class="productName">${object.name}</h3>
            <p class="productDescription">${object.description}</p>
          </article>
        </a>
      `;
    }
    document.getElementById("items").innerHTML = item; 
  };

  
  //on appelle la première fonction
  getData();

   

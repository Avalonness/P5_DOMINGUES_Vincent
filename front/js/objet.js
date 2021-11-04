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
        <a href="./product.html?id=${object._id}">
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

  //on apelle la première fonction
  getData();






   

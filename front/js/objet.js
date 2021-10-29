//Script permettant d'injecter les objets de l'API dans le HTML//
fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    console.log(data);
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
})
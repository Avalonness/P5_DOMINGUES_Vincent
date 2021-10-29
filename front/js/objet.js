//Script permettant d'injecter les objets de l'API dans le HTML//
fetch('http://localhost:3000/api/products')
.then(res => res.json())
.then(data => {
    console.log(data);
    let item = "";
    for (let object of data) {
        item += '<a href="./product.html?id=42">';
        item += '<article>';
        item += '<img src="'+object.imageUrl+'" alt="Lorem ipsum dolor sit amet, Kanap name1">';
        item += '<h3 class="productName">'+object.name+'</h3>';
        item += '<p class="productDescription">'+object.description+'</p>';
        item += '</article>' + '</a>';
    }   
    document.getElementById("items").innerHTML = item;
})
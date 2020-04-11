let request = new XMLHttpRequest();

// On récupère la liste des articles disponibles sur le service web

request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        for (let item of response) {

            // Creation et ajout  d'une div article pour créer un nouveau produit
            const newItem = document.createElement("article");
            const productList = document.getElementById('product-list');
            productList.appendChild(newItem);

            // Création et ajout de la balie img pour ajouter la photo du produit
            const itemImage = document.createElement("img");
            itemImage.setAttribute("src", item.imageUrl);

            // Création d'une div pour ajouter la nom du produit, puis ajout de la class item-name
            const itemName = document.createElement("div");
            itemName.classList.add("item-name");

            // Création d'une div pour ajouter la description du produit, puis ajout de la class item-description
            const itemDescription = document.createElement("div");
            itemDescription.classList.add("item-description");

            // Création d'une div pour ajouter le prix du produit, puis ajout de la class item-price
            const itemPrice = document.createElement("div");
            itemPrice.classList.add("item-price");

            // Création d'un bouton renvoyant à la page produit.html et correspondant au produit cliqué

            // Ajout des div name, description et price a l'élément article parent
            newItem.append(itemImage, itemName, itemDescription, itemPrice);

            // Récupération des éléments disponible dans l'objet renvoyé par le serveur
            itemName.innerHTML = item.name;
            itemDescription.innerHTML = item.description;
            itemPrice.innerHTML = item.price / 100 + '.00 EUR';

        }
    }
};
request.open('get', 'http://localhost:3000/api/furniture');
request.send();

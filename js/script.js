let request = new XMLHttpRequest();

// On récupère la liste des articles disponibles sur le service web

request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        for (let item of response) {
            
            const newItem = document.createElement("article");
            const productList = document.getElementById('product-list');
            productList.appendChild(newItem);

            const itemImage = document.createElement("img");
            itemImage.setAttribute("src", item.imageUrl);
            const itemName = document.createElement("div");
            const itemPrice = document.createElement("div");
            const itemDescription = document.createElement("div");

            newItem.append(itemImage, itemName, itemPrice, itemDescription);
            //itemImage.innerHTML = item.imageUrl;
            itemName.innerHTML = '<label>Name: <label>' + item.name;
            itemPrice.innerHTML = 'Price: EUR ' + item.price/100 + '.00';
            itemDescription.innerHTML = 'Description :' + item.description;
        }

    }
};
request.open('get', 'http://localhost:3000/api/furniture');
request.send();

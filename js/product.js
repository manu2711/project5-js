let request = new XMLHttpRequest();

// On récupère la liste des articles disponibles sur le service web

request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        for (let item of response) {

            // On récupère le numéro de l'ID dans l'URL
            let str = window.location.href;
            let url = new URL(str);
            let search_id = new URLSearchParams(url.search);

            // On créé les constante qui vont permettre d'afficher le produit sélectionné dans la page produit.html
            const itemImage = document.getElementById("item-image");
            const itemName = document.getElementById("item-name");
            const itemDescription = document.getElementById("item-description");
            const itemPrice = document.getElementById("item-price");
            const options = item.varnish;

            const noProduct = document.getElementById("no-product");

            if (search_id.has("id")) {
                let id = search_id.get("id");

                // On vérifie si un article correspond à l'ID de l'URL, si oui on l'affiche, sinon on affiche "Product not found"

                if (id == item._id) {
                    itemImage.setAttribute("src", item.imageUrl);
                    itemName.innerHTML = item.name;
                    itemDescription.innerHTML = item.description;
                    itemPrice.innerHTML = item.price / 100 + '.00 EUR';

                    for (let option of options) {
                        const itemOption = document.getElementById("item-option");
                        const addOption = document.createElement("option");
                        addOption.innerHTML = option;
                        itemOption.appendChild(addOption);
                        console.log(option);
                    }

                } else {
                    // document.getElementById("product").style.display = "none";
                    //  noProduct.style.display = "block";
                }
            }
        }
    }
};
request.open('get', 'http://localhost:3000/api/furniture');
request.send();

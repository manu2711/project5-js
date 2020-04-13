let request = new XMLHttpRequest();

// On récupère la liste des articles disponibles sur le service web
request.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let response = JSON.parse(this.responseText);
        for (let item of response) {

            // On créé les constante qui vont permettre d'afficher le produit sélectionné dans la page produit.html
            const itemImage = document.getElementById("item-image");
            const itemName = document.getElementById("item-name");
            const itemDescription = document.getElementById("item-description");
            const itemPrice = document.getElementById("item-price");
            const options = item.varnish;
            const itemButton = document.getElementById("item-button");

            const noProduct = document.getElementById("no-product");

            // Création de la classe ProductComponent qui va nous permettre d'enregistrer les produits qui seront ajoutés au panier via localStorage
            class ProductComponent {
                constructor(name, price) {
                    this.name = name;
                    this.price = price;
                }
            }

            // On récupère le numéro de l'ID dans l'URL
            let str = window.location.href;
            let url = new URL(str);
            let search_id = new URLSearchParams(url.search);
            if (search_id.has("id")) {
                let id = search_id.get("id");

                // On vérifie si un article correspond à l'ID de l'URL, si oui on l'affiche, sinon on affiche "Product not found"
                if (id == item._id) {
                    itemImage.setAttribute("src", item.imageUrl);
                    itemName.innerHTML = item.name;
                    itemDescription.innerHTML = item.description;
                    itemPrice.innerHTML = "EUR " + (item.price/100).toFixed(2); // toFixed permet de retourner deux chiffres décimaux

                    for (let option of options) {
                        const itemOption = document.getElementById("item-option");
                        const addOption = document.createElement("option");
                        addOption.innerHTML = option;
                        itemOption.appendChild(addOption);
                    }

                    // Lorsqu'on clic sur le bouton acheter, les nom du produit et le prix sont ajoutés au localStorage
                    itemButton.addEventListener('click', function (e) {

                        // On ajoute l'article au panier
                        if (localStorage.getItem('basket')) {
                            let basket = JSON.parse(localStorage.getItem('basket'));
                            let newProductInBasket = new ProductComponent(item.name, item.price);
                            basket.push(newProductInBasket);
                            let basketStringified = JSON.stringify(basket);
                            localStorage.setItem('basket', basketStringified);
                            console.log(basket);
                        } else {
                            let basket = [];
                            let newProductInBasket = new ProductComponent(item.name, item.price);
                            basket.push(newProductInBasket);
                            let basketStringified = JSON.stringify(basket);
                            localStorage.setItem('basket', basketStringified);
                        }
                        e.preventDefault();
                    });
                } else {
                    //document.getElementById("product").style.display = "none";
                    //noProduct.style.display = "block";
                }
            }
        }
    }
};
request.open('get', 'http://localhost:3000/api/furniture');
request.send();

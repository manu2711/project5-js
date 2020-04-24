// Accès aux éléments du DOM
const item = document.getElementById('item')
const itemImage = document.getElementById("item-image");
const itemName = document.getElementById("item-name");
const itemDescription = document.getElementById("item-description");
const itemPrice = document.getElementById("item-price");
const itemButton = document.getElementById("item-button");
const noProduct = document.getElementById("no-product");
const userMessage = document.querySelector('#product p')

// Création de la classe ProductComponent qui va nous permettre d'enregistrer les produits qui seront ajoutés au panier via localStorage
class ProductComponent {
    constructor(name, price, productId) {
        this.name = name;
        this.price = price;
        this.productId = productId
    }
}

// On récupère l'ID du produit a afficher dans l'URL
let url = new URL(window.location.href);
let searchId = new URLSearchParams(url.search);
let productId = searchId.get('id')

// On créé une fonction de requete
makeRequest = (productId) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:3000/api/furniture/' + productId)
        request.onreadystatechange = () => {
            if (request.readyState === 4) {
                if (request.status === 200 || request.status === 201) {
                    resolve(JSON.parse(request.response))
                } else {
                    reject(JSON.parse(request.response))
                }
            }
        }
        request.send()
    })
}

async function loadProduct(productId) {
    try {
        const requestPromise = makeRequest(productId)
        const response = await requestPromise
        item.style.display = 'flex'
        itemImage.setAttribute("src", response.imageUrl);
        itemName.textContent = response.name;
        itemDescription.innerHTML = response.description;
        itemPrice.innerHTML = "EUR " + (response.price / 100).toFixed(2); // toFixed permet de retourner deux chiffres décimaux
        const options = response.varnish;
        for (let option of options) {
            const itemOption = document.getElementById("item-option");
            const addOption = document.createElement("option");
            addOption.innerHTML = option;
            itemOption.appendChild(addOption);
        }
        // Lorsqu'on clic sur le bouton acheter, les nom du produit et le prix sont ajoutés au localStorage
        itemButton.addEventListener('click', function ($event) {
            $event.preventDefault()
            // On ajoute l'article au panier
            if (localStorage.getItem('basket')) {
                let basket = JSON.parse(localStorage.getItem('basket'));
                let newProductInBasket = new ProductComponent(response.name, response.price, response._id);
                basket.push(newProductInBasket);
                let basketStringified = JSON.stringify(basket);
                localStorage.setItem('basket', basketStringified);
                console.log(basket);
            } else {
                let basket = [];
                let newProductInBasket = new ProductComponent(response.name, response.price, response._id);
                basket.push(newProductInBasket);
                let basketStringified = JSON.stringify(basket);
                localStorage.setItem('basket', basketStringified);
            }
            userMessage.style.display = 'block'
        });
    } catch (error) {
        console.log(error.message)
        noProduct.style.display = 'block'
    }
}

// On appelle la fonction loadProduct qui permet l'affichage du produit sur la page
loadProduct(productId)
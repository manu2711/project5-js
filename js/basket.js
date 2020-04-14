// Récupération des produits ajoutés au panier
let itemsInBasket = JSON.parse(localStorage.getItem('basket'));

// On liste les produits contenu dans le panier
for (item of itemsInBasket) {

    // Création des constante contenant les éléments HTML
    const rows = document.getElementById('table-row');
    const newRow = document.createElement('tr');
    const newRowName = document.createElement('td');
    const newRowPrice = document.createElement('td');

    rows.appendChild(newRow);
    newRow.append(newRowName, newRowPrice);

    newRowName.innerText = item.name;
    newRowPrice.innerText = 'EUR ' + (item.price/100).toFixed(2);
}

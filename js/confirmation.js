// On accède aux différent éléments du DOM que l'on va manipuler
const orderIdMessage = document.getElementById('orderId')
const priceMessage = document.getElementById('price')

// On récupère dans l'URL la prix et le numéro de la commande
let url = new URL(window.location.href)
let search = new URLSearchParams(url.search)

// On affiche un message de confirmation aux clients, indiquant le prix total et son numéro de commande
if (search.has('price') && search.has('orderId')) {
  let price = search.get('price')
  let id = search.get('orderId')

  orderIdMessage.textContent = id
  priceMessage.textContent = (price / 100).toFixed(2)
}

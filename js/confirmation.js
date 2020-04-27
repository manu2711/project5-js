const orderIdMessage = document.getElementById('orderId')
const priceMessage = document.getElementById('price')

let url = new URL(window.location.href)
let search = new URLSearchParams(url.search)
if (search.has('price') && search.has('orderId')) {
  let price = search.get('price')
  let id = search.get('orderId')

  orderIdMessage.textContent = id
  priceMessage.textContent = (price / 100).toFixed(2)
}

const HANDLEFEES = 6;

let cartItemObjects;

function onLoad() {
     loadCartItems();
     displayCartItems();
     displayCartSummary();
     renderCartSummary();
}

function loadCartItems() {
     console.log(cartItems);
     cartItemObjects = cartItems.map(cartItem => {
          const foundItem = allItems.find(item => item.id === cartItem.id);
          return {
               ...foundItem,
               quantity: cartItem.quantity
          };
     });
     console.log(cartItemObjects);
}

function displayCartItems() {
     let cartItemsContainer = document.querySelector('.bag-items-container');
     let innerhtml = '';

     if (!cartItemsContainer) {
          return;
     }

     if (cartItemObjects.length === 0) {
          innerhtml += `<div class="bag-item-container text-center">
               <p class="fs-2 mb-3">Add item to cart</p>
          </div>`;
     } else {
          cartItemObjects.forEach(cartItem => {
               innerhtml += generateItemHtml(cartItem);
          });
     }

     cartItemsContainer.innerHTML = innerhtml;
}

function generateItemHtml(item) {
     return `<div class="bag-item-container">
          <div class="item-left-part">
               <img class="bag-item-img" src="${item.item_image}">
          </div>
          <div class="item-right-part">
               <div class="item-name">${item.item_name}</div>
               <div class="price-container">
                    <span class="current-price">₹ ${item.prices.current_price * item.quantity}</span>
                    <span class="original-price">₹ ${item.prices.original_price * item.quantity}</span>
               </div>
               <div class="quantity-control">
                    <button onclick="changeQuantity('${item.id}', -1)"><i class="fa-solid fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.id}', 1)"><i class="fa-solid fa-plus"></i></button>
               </div>
               <div class="return-period">
                    <span class="return-period-days">${item.retun_period} days</span> return available
               </div>
               <div class="delivery-details">
                    Delivery by <span class="delivery-details-days">${item.delivary_date}</span>
               </div>
          </div>
          <div class="remove-from-cart" onclick="removeFromcart('${item.id}')">
               <i class="fa-solid fa-xmark"></i>
          </div>
     </div>`;
}

function changeQuantity(itemId, delta) {
     const index = cartItems.findIndex(item => item.id === itemId);
     if (index !== -1) {
          cartItems[index].quantity += delta;
          if (cartItems[index].quantity <= 0) {
               cartItems.splice(index, 1);
          }
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          loadCartItems();
          displayCartItems();
          displayCartSummary();
          displaycartCount()
     }
}

function removeFromcart(itemId) {
     cartItems = cartItems.filter(cartItem => cartItem.id !== itemId);
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
     loadCartItems();
     displayCartItems();
     displaycartCount(); // Make sure this function is defined
     displayCartSummary();
}

function displayCartSummary() {
     let cartSummarycontainer = document.querySelector('.bag-summary');
     if (!cartSummarycontainer) return;

     let totalItems = cartItemObjects.reduce((sum, item) => sum + item.quantity, 0);
     let totalMRP = 0;
     let discountMRP = 0;

     cartItemObjects.forEach(cartItem => {
          totalMRP += cartItem.prices.original_price * cartItem.quantity;
          discountMRP += (cartItem.prices.original_price - cartItem.prices.current_price) * cartItem.quantity;
     });

     let finalPayment = (totalMRP - discountMRP + HANDLEFEES);

     cartSummarycontainer.innerHTML = `<div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${totalItems}) Items </div>
          <div class="price-item">
               <span class="price-item-tag">Total MRP</span>
               <span class="price-item-value">₹ ${totalMRP}</span>
          </div>
          <div class="price-item">
               <span class="price-item-tag">Discount on MRP</span>
               <span class="price-item-value priceDetail-base-discount">-₹ ${discountMRP}</span>
          </div>
          <div class="price-item">
               <span class="price-item-tag">Handle Fee</span>
               <span class="price-item-value">₹ ${HANDLEFEES}</span>
          </div>
          <div class="price-footer">
               <span class="price-item-tag">Total Amount</span>
               <span class="price-item-value">₹ ${finalPayment}</span>
          </div>
     </div>
     <a href="${totalItems > 0 ? 'checkout.html' : 'javascript:void(0)'}" class="common_btn btn-place-order" ${totalItems > 0 ? '' : 'disabled'}>
          PLACE ORDER
     </a>`;
}

function renderCartSummary() {
     let cartSummarycontainer = document.querySelector('.checkout-summary');
     if (!cartSummarycontainer) return;

     let totalItems = cartItemObjects.reduce((sum, item) => sum + item.quantity, 0);
     let totalMRP = 0;
     let discountMRP = 0;

     cartItemObjects.forEach(cartItem => {
          totalMRP += cartItem.prices.original_price * cartItem.quantity;
          discountMRP += (cartItem.prices.original_price - cartItem.prices.current_price) * cartItem.quantity;
     });

     let finalPayment = (totalMRP - discountMRP + HANDLEFEES);

     cartSummarycontainer.innerHTML = `<div class="bag-details-container">
          <div class="price-header">PRICE DETAILS (${totalItems}) Items </div>
          <div class="price-item">
               <span class="price-item-tag">Total MRP</span>
               <span class="price-item-value">₹ ${totalMRP}</span>
          </div>
          <div class="price-item">
               <span class="price-item-tag">Discount on MRP</span>
               <span class="price-item-value priceDetail-base-discount">-₹ ${discountMRP}</span>
          </div>
          <div class="price-item">
               <span class="price-item-tag">Handle Fee</span>
               <span class="price-item-value">₹ ${HANDLEFEES}</span>
          </div>
          <div class="price-footer">
               <span class="price-item-tag">Total Amount</span>
               <span class="price-item-value">₹ ${finalPayment}</span>
          </div>
     </div>
     <a href="confirm.html" class="common_btn btn-place-order" onclick="clearStorage()">
          PAY NOW
     </a>`;
}

function clearStorage(){
     localStorage.clear()
}

onLoad();

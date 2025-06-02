let cartItems;
let prodItem;
onLoad();
function onLoad() {
     let cartItemsStr = localStorage.getItem('cartItems');
     let singleItemsStr = localStorage.getItem('prodItem');
     cartItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
     prodItem = singleItemsStr ? JSON.parse(singleItemsStr) : [];
     displayItemTrend();
     displayItemNewcol();
     displaycartCount();
     displayallProducts();

}

function displaycartCount(quantity) {
     let cartcoutSpan = document.querySelector('.cartcount');
     if (typeof quantity === 'undefined') {
          quantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
     }
     if (cartItems.length > 0) {
          cartcoutSpan.style.visibility = 'visible';
          cartcoutSpan.innerText = quantity;
     }
     else {
          cartcoutSpan.style.visibility = 'hidden';
     }
}

// function addToCart(itemId) {
//      cartItems.push(itemId);
//      localStorage.setItem('cartItems', JSON.stringify(cartItems));
//      displaycartCount()
// }

function addToCart(itemId) {
     let existingItem = cartItems.find(item => item.id === itemId);
     if (existingItem) {
          existingItem.quantity += 1;
     } else {
          cartItems.push({ id: itemId, quantity: 1 });
     }
     localStorage.setItem('cartItems', JSON.stringify(cartItems));
     // Calculate total quantity

     // Pass it to displaycartCount
     displaycartCount();
}

function goToprod(itemId) {
     prodItem = itemId
     localStorage.setItem('prodItem', JSON.stringify(prodItem));
}




/*let itemContainer = document.querySelector('.product_container');*/

function displayItemTrend() {
     let itemContainer = document.querySelector('.productTrending_container');
     if (!itemContainer) {
          return;
     }
     let prodTrendInnerHtml = '';
     productTrendings.forEach(item => {
          prodTrendInnerHtml += `<div class="product__item">
                                   <a href="product-details.html" onclick = "goToprod('${item.id}')" class="product__item-img">
                                        <img src="${item.item_image}" alt="Product image" class="pro_img">
                                   </a>
                                   <div class="product__item-details">
                                        <a href="product-details.html" onclick = "goToprod('${item.id}')" class="prod_name">${item.item_name}</a>
                                        <div class="d-flex align-items-center justify-content-between mt-3 flex-wrap">
                                             <div class="prod_det">
                                                  <p class="prod_price">₹${item.prices.current_price}</p>
                                                  <span class="org_price">₹ ${item.prices.original_price}</span>
                                             </div>
                                             <button class="addtocart_btn" onclick = "addToCart('${item.id}')">Add to cart</button>
                                        </div>
                                   </div>
                              </div>`
     })


     itemContainer.innerHTML = prodTrendInnerHtml;
}

function displayItemNewcol() {
     let itemContainer = document.querySelector('.productNewCol_container');
     if (!itemContainer) {
          return;
     }
     let prodNewColInnerHtml = '';
     productNewcol.forEach(item => {
          prodNewColInnerHtml += `<div class="product__item">
                                   <a href="product-details.html" onclick = "goToprod('${item.id}')" class="product__item-img">
                                        <img src="${item.item_image}" alt="Product image" class="pro_img">
                                   </a>
                                   <div class="product__item-details">
                                        <a href="product-details.html" onclick = "goToprod('${item.id}')" class="prod_name">${item.item_name}</a>
                                        <div class="d-flex align-items-center justify-content-between mt-3 flex-wrap">
                                             <div class="prod_det">
                                                  <p class="prod_price">₹${item.prices.current_price}</p>
                                                  <span class="org_price">₹ ${item.prices.original_price}</span>
                                             </div>
                                             <button class="addtocart_btn" onclick = "addToCart('${item.id}')">Add to cart</button>
                                        </div>
                                   </div>
                              </div>`
     })


     itemContainer.innerHTML = prodNewColInnerHtml;
}

function displayallProducts() {
     let itemContainer = document.querySelector('.productsall_container');
     if (!itemContainer) {
          return;
     }
     let prodallItemHtml = '';
     allItems.forEach(item => {
          prodallItemHtml += `<div class="col-lg-3 col-sm-6 product__item">
                                   <a href="product-details.html" onclick = "goToprod('${item.id}')" class="product__item-img">
                                        <img src="${item.item_image}" alt="Product image" class="pro_img">
                                   </a>
                                   <div class="product__item-details">
                                        <a href="product-details.html" onclick = "goToprod('${item.id}')" class="prod_name">${item.item_name}</a>
                                        <div class="d-flex align-items-center justify-content-between mt-3 flex-wrap">
                                             <div class="prod_det">
                                                  <p class="prod_price">₹${item.prices.current_price}</p>
                                                  <span class="org_price">₹ ${item.prices.original_price}</span>
                                             </div>
                                             <button class="addtocart_btn" onclick = "addToCart('${item.id}')">Add to cart</button>
                                        </div>
                                   </div>
                              </div>`
     })


     itemContainer.innerHTML = prodallItemHtml;
}



// fix to to header
const header = document.querySelector(".site_header_wrapper");
window.addEventListener("scroll", function () {
     if (window.scrollY > 100) {
          header.classList.add("fixed");
     } else {
          header.classList.remove("fixed");
     }
});

//Mobile navbar menu open
document.addEventListener('DOMContentLoaded', function () {
     // Mobile navbar collapse
     const mobileMenuBtn = document.querySelector('.mobile_menu_btn');
     const navBarCollapse = document.querySelector('.nav_bar_collapse');
     const body = document.body;
     const bgOverlay = document.querySelector('.bg_overlay');

     mobileMenuBtn.addEventListener('click', function () {
          navBarCollapse.classList.toggle('active');
          body.classList.toggle('nav_added');
          bgOverlay.classList.toggle('active');
     });

     bgOverlay.addEventListener('click', function (event) {
          console.log(event.target);
          body.classList.remove('nav_added');
          navBarCollapse.classList.remove('active');
          bgOverlay.classList.remove('active');
     });
});





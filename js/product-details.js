let singleItemObject;
function onLoad() {
     loadSingleItem();
     displaysingleItem();
}

function loadSingleItem() {
     console.log(prodItem);
     singleItemObject = allItems.find(item => item.id === prodItem);
     console.log(singleItemObject);
}

function displaysingleItem() {
     let singleItemsContainer = document.querySelector('.product_details-container');
     let innerhtml = ''

      innerhtml += generateSingleItemHtml(singleItemObject)

     singleItemsContainer.innerHTML = innerhtml;
}

function generateSingleItemHtml(item) {
     return `<div class="col-lg-7 leftPart">
               <div class="img_box">
                    <img src="${item.slider_images[0]}" alt="">
               </div>
               <div class="img_box">
                    <img src="${item.slider_images[1]}" alt="">
               </div>
          </div>
          <div class="col-lg-5 rightpart">
               <h3 class="Prod_name">${item.item_name}</h3>
               <p class="prod_subtitle mt-2">Excellent quality product</p>
               <span class="ratingstar"><i class="fa-solid fa-star"></i> ${item.rating.stars} Rating</span>
               <hr>
               <div class="prod_det">
                    <p class="prod_price d-inline-block me-2">₹ ${item.prices.current_price}</p>
                    <span class="org_price">₹ ${item.prices.original_price}</span>
                    <h3 class="sub-hd">SELECT SIZE</h3>
                    <ul class="size-list">
                         <li>S</li>
                         <li>M</li>
                         <li>L</li>
                         <li>XL</li>
                         <li>XXL</li>
                    </ul>
                    <button class="common_btn add-to-cart" onclick ="addToCart('${item.id}')">Add to cart
                    </button>
                    <a href ="cart.html" class="gotocartbtn">Go to cart</a>
                    <hr>
                    <h3 class="sub-hd">Product Details</h3>
                    <ul class="info_list mb-3">
                         <li>100% Original Products</li>
                         <li>Pay on delivery might be available</li>
                         <li>Easy 14 days returns and exchanges</li>
                    </ul>
                    <p class="mb-2"><strong>Size & Fit</strong></p>
                    <p>Brand Fit:<br>
                         Fit: Regular Fit<br>
                         The model (height 5'8) is wearing a size S</p>
                    <p class="my-2"><strong>Material & Care</strong></p>
                    <p>85% Polyester, 15% Viscose<br>
                         Machine Wash</p>
               </div>
          </div>`
}

onLoad()
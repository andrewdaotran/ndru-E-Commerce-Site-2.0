// DOM SELECTORS

// navbar selectors
const mobileNavButton = document.querySelector(".nav-icon-1");
const mobileNavbar = document.querySelector(".mobile-nav");
const overlay1 = document.querySelector(".overlay-1");
const overlay2 = document.querySelector(".overlay-2");
const productNames = document.querySelectorAll(".product-name");
const shoppingCartButton = document.querySelector(".fa-shopping-cart");

// shopping cart selectors
let shoppingCartObject = {};
const shoppingCart = document.querySelector(".shopping-cart");
const shoppingCartItemsContainer = document.querySelector(
  ".shopping-cart-container"
);
const shoppingCartDeleteButtons =
  document.getElementsByClassName("remove-cart-item");

const shoppingCartItemQuantity = document.getElementsByClassName(
  "shopping-cart-item-quantity"
);
const shoppingCartEmptyMessage = document.querySelector(".cart-empty");
const shoppingCartNotEmptyMessage = document.querySelector(".cart-not-empty");
const shoppingCartFooter = document.querySelector(".shopping-cart-footer");
const checkoutButton = document.querySelector(".checkout");

// product selectors
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// purchase confirmation screen selctors
const purchaseScreen = document.querySelector(".purchase-screen");
const overlay3 = document.querySelector(".overlay-3");

// page footer selectors
const footerContainer = document.querySelector(".footer-container");
const productMenu = document.querySelector(".footer-products-items");
const footerProductMenuOpenCloseIcon = document.querySelector(
  ".footer-open-products"
);
const emailInputField = document.querySelector(".email-input");
const emailSubmitButton = document.querySelector(".email-submit");
const invalidEmailInput = document.querySelector(".invalid-input");

//DOM SELECTORS END

// FUNCTIONS
const addPurchaseScreen = () => {
  let total = document.querySelector(".shopping-cart-total").innerText;
  let cartItems = document.querySelectorAll(".shopping-cart-item");

  let confirmationNumber = Math.floor(Math.random() * 10000000);
  let purchaseScreen = document.createElement("div");
  purchaseScreen.classList.add("purchase-screen");
  purchaseScreen.innerHTML = `<div class="purchase-screen-container">
        <h3>Thank you for your purchase!</h3>
        <h3>
          Your confirmation number is #<span class="confirmation">${confirmationNumber}</span>
        </h3>
        <h3>Order Summary:</h3>
        <i class="thank-you-close fas fa-times"></i>
        <div class="purchased-products">
          
        </div>

        <div class="purchase-total">
          <p>Total :</p>
          <p>$<span>${total}</span></p>
        </div>
      </div>`;
  //change confirmation number and total dynamically
  for (cartItem of cartItems) {
    let id = cartItem.getAttribute("data-id");
    let product = shoppingCartObject[id];
    console.log(product);
    let oneProduct = document.createElement("div");
    oneProduct.classList.add("one-product-total");

    oneProduct.innerHTML = `<div class="one-product-total">
          <p>${product.quantity}x ${product.productName}</p>
          <p>$<span>${(product.quantity * product.price).toFixed(2)}</span></p>
        </div>`;
    let purchasedProducts = purchaseScreen.querySelector(".purchased-products");
    purchasedProducts.append(oneProduct);
  }

  let overlay3 = document.createElement("div");
  overlay3.classList.add("overlay", "overlay-3");
  document.body.append(purchaseScreen);
  document.body.append(overlay3);
  overlay3.addEventListener("click", removePurchaseScreen);
  let purchaseScreenRemoveButton =
    purchaseScreen.querySelector(".thank-you-close");
  purchaseScreenRemoveButton.addEventListener("click", removePurchaseScreen);
};
const addToCart = (event) => {
  let button = event.target;
  let product = button.parentElement;
  product.querySelector(".add-to-cart").innerText = "In cart";
  let id = product.getAttribute("data-id");
  let imgSrc = product.querySelector(".product-img").src;
  let productName = product.querySelector(".product-name").innerText;
  let price = product.querySelector(".product-price").innerText;

  let cartItem = document.createElement("div");
  cartItem.classList.add("shopping-cart-item");
  cartItem.setAttribute("data-id", id);

  // Check if item is already in cart
  if (shoppingCartObject[id]) {
    return;
  }

  // adding of cart item
  cartItem.innerHTML = `<a href="#" class="shopping-cart-item-image">
              <img
                class="shopping-cart-item-image"
                src="${imgSrc}"
                alt="Tom Ford Glasses"
              />
            </a>
            <div class="shopping-cart-item-info">
              <span>
                <a class="shopping-cart-item-name" href="#"
                  >${productName}</a
                >
              </span>

              <h4 class="shopping-cart-item-amount">
                $<span class="shopping-cart-item-price">${price}</span>
              </h4>
              <div class="shopping-cart-item-quantity">
                <button class="shopping-cart-item-decrease">
                  <i class="fas fa-minus"></i>
                </button>
                <input
                  type="text"
                  class="shopping-cart-item-quantity-input"
                  value="1"
                />
                <button class="shopping-cart-item-increase">
                  <i class="fas fa-plus"></i>
                </button>
              </div>
            </div>
            <i class="fas fa-trash remove-cart-item"></i>`;
  shoppingCartItemsContainer.append(cartItem);

  //open shopping cart
  overlay2.addEventListener("click", openCloseShoppingCart);
  openShoppingCart();
  //add product id to cart for future checks
  shoppingCartObject[id] = {
    imgSrc: imgSrc,
    productName: productName,
    price: price,
    quantity: 1,
  };
  checkShoppingCartForID();
  updateCartTotal();

  // adding event listeners to shopping cart item buttons and input dynamically
  cartItem
    .querySelector(".remove-cart-item")
    .addEventListener("click", removeCartItem);

  cartItem
    .querySelector(".shopping-cart-item-quantity")
    .addEventListener("click", increaseDecreaseItemQuantity);
  checkoutButton.addEventListener("click", checkout);
};
const checkout = (event) => {
  let clickedItem = event.target;
  if (clickedItem.classList.contains("checkout")) {
    addPurchaseScreen();
    closeShoppingCart();
    // empty shopping cart
    let cartItems = document.querySelectorAll(".shopping-cart-item");
    for (let cartItem of cartItems) {
      cartItem.remove();
    }
    shoppingCartObject = {};
    checkShoppingCartForID();
    for (let button of addToCartButtons) {
      button.innerText = "Add to cart";
    }
  }
};
const checkShoppingCartForID = () => {
  if (Object.keys(shoppingCartObject).length !== 0) {
    shoppingCartEmptyMessage.style.display = "none";
    shoppingCartNotEmptyMessage.style.display = "block";
    shoppingCartFooter.style.display = "grid";
  } else {
    shoppingCartEmptyMessage.style.display = "grid";
    shoppingCartNotEmptyMessage.style.display = "none";
    shoppingCartFooter.style.display = "none";
  }
};
const closeFooterProductMenu = () => {
  productMenu.style.display = "none";
  footerProductMenuOpenCloseIcon.classList.remove("fa-times");
  footerProductMenuOpenCloseIcon.classList.add("fa-plus");
  footerProductMenuOpenCloseIcon.style.fontSize = "1rem";
};
const closeMobileNav = () => {
  mobileNavbar.style.display = "none";
  mobileNavButton.classList.remove("fa-times");
  mobileNavButton.classList.add("fa-bars");
  mobileNavButton.style.fontSize = "1.5rem";
  productNames.forEach((productName) => {
    productName.tabIndex = "0";
  });
};
const closeShoppingCart = () => {
  shoppingCart.style.display = "none";
  shoppingCartButton.classList.add("fa-shopping-cart");
  shoppingCartButton.classList.remove("fa-times");
  shoppingCartButton.style.fontSize = "1.5rem";
  productNames.forEach((productName) => {
    productName.tabIndex = "0";
  });
};
const increaseDecreaseItemQuantity = (event) => {
  let clickedItem = event.target;
  let quantity = clickedItem.parentElement.querySelector(
    ".shopping-cart-item-quantity-input"
  );
  let parent = quantity.parentElement.parentElement.parentElement;
  let id = parent.getAttribute("data-id");
  quantity.addEventListener("change", (event) => {
    let quantity = event.target;

    if (isNaN(quantity.value) || quantity.value <= 0) {
      quantity.value = 1;
    }
    updateCartTotal();
    shoppingCartObject[id].quantity = quantity.value;
  });
  if (
    clickedItem.classList.contains("shopping-cart-item-decrease") &&
    quantity.value > 1
  ) {
    quantity.value--;
    updateCartTotal();
  } else if (clickedItem.classList.contains("shopping-cart-item-increase")) {
    quantity.value++;
    updateCartTotal();
  }
  shoppingCartObject[id].quantity = quantity.value;
  console.log(shoppingCartObject);
};
const openCloseFooterProductMenu = (event) => {
  let clickedItem = event.target;
  if (clickedItem.classList.contains("fa-plus")) {
    openFooterProductMenu();
  } else if (clickedItem.classList.contains("fa-times")) {
    closeFooterProductMenu();
  }
};
const openCloseMobileNav = (event) => {
  let clickedItem = event.target;
  overlay1.addEventListener("click", openCloseMobileNav);
  if (clickedItem.classList.contains("fa-bars")) {
    openMobileNav();
  } else if (
    clickedItem.classList.contains("fa-times") ||
    clickedItem.classList.contains("overlay")
  ) {
    closeMobileNav();
  }
};
const openCloseShoppingCart = (event) => {
  let clickedItem = event.target;
  overlay2.addEventListener("click", openCloseShoppingCart);
  if (clickedItem.classList.contains("fa-shopping-cart")) {
    openShoppingCart();
  } else if (
    clickedItem.classList.contains("fa-times") ||
    clickedItem.classList.contains("overlay")
  ) {
    closeShoppingCart();
  }
};
const openFooterProductMenu = () => {
  productMenu.style.display = "grid";
  footerProductMenuOpenCloseIcon.classList.remove("fa-plus");
  footerProductMenuOpenCloseIcon.classList.add("fa-times");
  footerProductMenuOpenCloseIcon.style.fontSize = "1.1rem";
};
const openMobileNav = () => {
  mobileNavbar.style.display = "block";
  mobileNavButton.classList.remove("fa-bars");
  mobileNavButton.classList.add("fa-times");
  mobileNavButton.style.fontSize = "1.9rem";
  productNames.forEach((productName) => {
    productName.tabIndex = "-1";
  });
  // close shopping cart
  shoppingCart.style.display = "none";
  shoppingCartButton.classList.add("fa-shopping-cart");
  shoppingCartButton.classList.remove("fa-times");
  shoppingCartButton.style.fontSize = "1.5rem";
};
const openShoppingCart = () => {
  shoppingCart.style.display = "block";
  shoppingCartButton.classList.remove("fa-shopping-cart");
  shoppingCartButton.classList.add("fa-times");
  shoppingCartButton.style.fontSize = "1.9rem";
  productNames.forEach((productName) => {
    productName.tabIndex = "-1";
  });
  // close mobile navbar
  mobileNavbar.style.display = "none";
  mobileNavButton.classList.remove("fa-times");
  mobileNavButton.classList.add("fa-bars");
  mobileNavButton.style.fontSize = "1.5rem";
};
let submitEmail = (event) => {
  event.preventDefault();

  if (true) {
    invalidEmailInput.style.display = "block";
    counter++;
  } else {
    invalidEmailInput.style.display = "none";
  }
  emailInputField.value = "";
};
const removeCartItem = (event) => {
  let clickedItem = event.target;
  let id = clickedItem.parentElement.getAttribute("data-id");
  delete shoppingCartObject[id];
  clickedItem.parentElement.remove();
  updateCartTotal();
  checkShoppingCartForID();
  // change from in cart to add to cart when remove from cart
  let products = document.querySelectorAll(".product");
  for (let product of products) {
    let productID = product.getAttribute("data-id");
    if (id === productID) {
      product.querySelector(".add-to-cart").innerText = "Add to cart";
    }
  }
};
const removePurchaseScreen = () => {
  let purchaseScreen = document.querySelector(".purchase-screen");
  purchaseScreen.remove();
  let overlay3 = document.querySelector(".overlay-3");
  overlay3.remove();
};
const updateCartTotal = () => {
  let shoppingCartItems = document.querySelectorAll(".shopping-cart-item");
  let cartQuantity = 0;
  let total = 0;
  for (let item of shoppingCartItems) {
    let price = parseFloat(
      item.querySelector(".shopping-cart-item-price").innerText
    );
    let quantity = Number(
      item.querySelector(".shopping-cart-item-quantity-input").value
    );
    total += price * quantity;
    cartQuantity += quantity;
  }
  let cartTotal = document.querySelector(".shopping-cart-total");
  cartTotal.innerText = total.toFixed(2);
  let cartAmount = document.querySelector(".cart-amount");
  cartAmount.innerText = cartQuantity;
};

// EVENT LISTENERS
mobileNavButton.addEventListener("click", openCloseMobileNav);
footerProductMenuOpenCloseIcon.addEventListener(
  "click",
  openCloseFooterProductMenu
);
emailSubmitButton.addEventListener("click", submitEmail);
shoppingCartButton.addEventListener("click", openCloseShoppingCart);

//add to cart buttons
for (let button of addToCartButtons) {
  button.addEventListener("click", addToCart);
}

/* For when items are already in cart */
// delete cart item
for (let button of shoppingCartDeleteButtons) {
  button.addEventListener("click", removeCartItem);
}
// change cart item quantity
for (let individualQuantity of shoppingCartItemQuantity) {
  individualQuantity.addEventListener("click", increaseDecreaseItemQuantity);
}
checkoutButton.addEventListener("click", checkout);
/* ----------------------------------- */

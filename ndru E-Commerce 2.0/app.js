// DOM SELECTORS

// navbar selectors
const mobileNavButton = document.querySelector(".nav-icon-1");
const mobileNavbar = document.querySelector(".mobile-nav");
const overlay1 = document.querySelector(".overlay-1");
const overlay2 = document.querySelector(".overlay-2");
const productNames = document.querySelectorAll(".product-name");
const shoppingCartButton = document.querySelector(".fa-shopping-cart");

// shopping cart selectors
const shoppingCartArray = [];
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

// product selectors
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// footer selectors
const footerContainer = document.querySelector(".footer-container");
const productMenu = document.querySelector(".footer-products-items");
const footerOpenCloseIcon = document.querySelector(".footer-open-products");
const emailInputField = document.querySelector(".email-input");
const emailSubmitButton = document.querySelector(".email-submit");
const invalidEmailInput = document.querySelector(".invalid-input");

//DOM SELECTORS END

// FUNCTIONS
if (shoppingCartArray.length > 0) {
  shoppingCartEmptyMessage.style.display = "none";
  shoppingCartNotEmptyMessage.style.display = "block";
} else {
  shoppingCartEmptyMessage.style.display = "grid";
  shoppingCartNotEmptyMessage.style.display = "none";
}

const openCloseMobileNav = (event) => {
  let clickedItem = event.target;
  overlay1.addEventListener("click", openCloseMobileNav);
  if (clickedItem.classList.contains("fa-bars")) {
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

    // close shopping cart end
  } else if (
    clickedItem.classList.contains("fa-times") ||
    clickedItem.classList.contains("overlay")
  ) {
    mobileNavbar.style.display = "none";
    mobileNavButton.classList.remove("fa-times");
    mobileNavButton.classList.add("fa-bars");
    mobileNavButton.style.fontSize = "1.5rem";
    productNames.forEach((productName) => {
      productName.tabIndex = "0";
    });
  }
};

const openCloseShoppingCart = (event) => {
  let clickedItem = event.target;
  overlay2.addEventListener("click", openCloseShoppingCart);
  if (clickedItem.classList.contains("fa-shopping-cart")) {
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
    // close mobile navbar end
  } else if (
    clickedItem.classList.contains("fa-times") ||
    clickedItem.classList.contains("overlay")
  ) {
    shoppingCart.style.display = "none";
    shoppingCartButton.classList.add("fa-shopping-cart");
    shoppingCartButton.classList.remove("fa-times");
    shoppingCartButton.style.fontSize = "1.5rem";
    productNames.forEach((productName) => {
      productName.tabIndex = "0";
    });
  }
};

const increaseDecreaseItemQuantity = (event) => {
  let clickedItem = event.target;
  let quantity = clickedItem.parentElement.querySelector(
    ".shopping-cart-item-quantity-input"
  );
  quantity.addEventListener("change", (event) => {
    let quantity = event.target;
    if (isNaN(quantity.value) || quantity.value <= 0) {
      quantity.value = 1;
    }
    updateCartTotal();
  });
  console.log(quantity);
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
};

const removeCartItem = (event) => {
  let clickedItem = event.target;
  clickedItem.parentElement.remove();
  updateCartTotal();
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

const addToCart = (event) => {
  let button = event.target;
  let product = button.parentElement;
  let imgSrc = product.querySelector(".product-img").src;
  let productName = product.querySelector(".product-name").innerText;
  let price = product.querySelector(".product-price").innerText;
  let item = document.createElement("div");
  item.classList.add("shopping-cart-item");
  console.log(item);
  item.innerHTML = `<a href="#" class="shopping-cart-item-image">
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
  shoppingCartItemsContainer.append(item);
  //open shopping cart
  // shoppingCart.style.display = "block";
  // shoppingCartButton.classList.remove("fa-shopping-cart");
  // shoppingCartButton.classList.add("fa-times");
  // shoppingCartButton.style.fontSize = "1.9rem";
  // productNames.forEach((productName) => {
  //   productName.tabIndex = "-1";
  // });
  console.log(imgSrc, productName, price);
};

const footerOpenClose = (event) => {
  let clickedItem = event.target;
  if (clickedItem.classList.contains("fa-plus")) {
    productMenu.style.display = "grid";
    footerOpenCloseIcon.classList.remove("fa-plus");
    footerOpenCloseIcon.classList.add("fa-times");
    footerOpenCloseIcon.style.fontSize = "1.1rem";
  } else if (clickedItem.classList.contains("fa-times")) {
    productMenu.style.display = "none";
    footerOpenCloseIcon.classList.remove("fa-times");
    footerOpenCloseIcon.classList.add("fa-plus");
    footerOpenCloseIcon.style.fontSize = "1rem";
  }
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

// EVENT LISTENERS
mobileNavButton.addEventListener("click", openCloseMobileNav);
footerOpenCloseIcon.addEventListener("click", footerOpenClose);
emailSubmitButton.addEventListener("click", submitEmail);
shoppingCartButton.addEventListener("click", openCloseShoppingCart);
//shopping cart delete buttons
for (let button of shoppingCartDeleteButtons) {
  button.addEventListener("click", removeCartItem);
}
//shopping cart quantity updates
for (let individualQuantity of shoppingCartItemQuantity) {
  individualQuantity.addEventListener("click", increaseDecreaseItemQuantity);
}
//add to cart buttons
for (let button of addToCartButtons) {
  button.addEventListener("click", addToCart);
}

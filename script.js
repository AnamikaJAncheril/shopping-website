// Cart items array
let cart = [];

// Function to add item to the cart
function addToCart(item, price) {
  if (isNaN(price) || price <= 0) {
    alert("Invalid price for this product!");
    return;
  }

  cart.push({ item, price });
  updateCart();
  alert(`${item} added to cart!`);
}

// Function to remove item from the cart
function removeFromCart(index) {
  cart.splice(index, 1); // Remove the item at the specified index
  updateCart();
}

// Function to update the cart display
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Clear the current cart display
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((product, index) => {
    const li = document.createElement("li");
    li.className = "cart-item";
    li.innerHTML = `
      <span>${product.item} - $${product.price.toFixed(2)}</span>
      <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
    total += product.price;
  });

  // Update total price
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

// Add functionality to "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.parentElement.querySelector("h3").textContent;
    const price = parseFloat(button.getAttribute("data-price"));
    addToCart(product, price);
  });
});

// Functionality for placing an order
const placeOrderButton = document.querySelector(".place-order-btn");
placeOrderButton.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty! Add items to place an order.");
    return;
  }

  const total = cart.reduce((sum, product) => sum + product.price, 0);
  alert(`Order placed successfully! Total: $${total.toFixed(2)} for ${cart.length} items.`);

  // Show Thank You message
  const thankYouMessage = document.getElementById("thank-you-message");
  thankYouMessage.classList.remove("hidden");
  thankYouMessage.classList.add("visible");

  // Reset the cart
  cart = [];
  updateCart();
});

// Combined functionality: Add to Cart and Place Order
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.parentElement.querySelector("h3").textContent;
    const price = parseFloat(button.getAttribute("data-price"));
    addToCart(product, price);

    // Automatically place the order after adding to cart
    if (!isNaN(price) && price > 0) {
      placeOrderButton.click(); // Trigger the "Place Order" button click
    }
  });
});


// Initialize an empty cart
const cart = [];

// Function to add items to the cart
function addToCart(productName, productPrice) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    alert(`${productName} has been added to the cart.`);
    updateCart();
}

// Function to display cart items
function updateCart() {
    const cartPage = document.getElementById("cart-items");
    if (cartPage) {
        cartPage.innerHTML = ""; // Clear previous items

        if (cart.length === 0) {
            cartPage.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement("div");
                cartItem.className = "cart-item";
                cartItem.innerHTML = `
                    <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity}</p>
                    <button onclick="removeFromCart('${item.name}')">Remove</button>
                `;
                cartPage.appendChild(cartItem);
            });
        }
    }
}

// Function to remove items from the cart
function removeFromCart(productName) {
    const productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        alert(`${productName} has been removed from the cart.`);
        updateCart();
    }
}
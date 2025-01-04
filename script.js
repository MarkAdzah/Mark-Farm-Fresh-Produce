// script.js

// Retrieve cart data from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save the cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add a product to the cart
function addToCart(productName, productPrice) {
    // Check if product already exists in the cart
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1; // Increment quantity
        existingProduct.total = (existingProduct.quantity * existingProduct.price).toFixed(2); // Update total
    } else {
        // Add new product to the cart
        cart.push({
            name: productName,
            price: parseFloat(productPrice),
            quantity: 1,
            total: parseFloat(productPrice).toFixed(2)
        });
    }

    saveCart(); // Save cart to localStorage
    updateCartCount();
    updateCartDisplay();
}

// Function to update the cart count in the navigation bar
function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Function to update the cart display in the cart page
function updateCartDisplay() {
    const cartItemsElement = document.getElementById("cart-items");
    const cartSubtotalElement = document.getElementById("cart-subtotal");

    if (!cartItemsElement || !cartSubtotalElement) return; // Exit if not on cart page

    if (cart.length === 0) {
        cartItemsElement.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
        cartSubtotalElement.textContent = "0.00";
        return;
    }

    // Populate cart table
    cartItemsElement.innerHTML = "";
    let subtotal = 0;

    cart.forEach(item => {
        subtotal += parseFloat(item.total);
        cartItemsElement.innerHTML += `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₵${item.price.toFixed(2)}</td>
                <td>₵${item.total}</td>
                <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
            </tr>
        `;
    });

    cartSubtotalElement.textContent = subtotal.toFixed(2);
}

// Function to remove a product from the cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    saveCart(); // Save updated cart to localStorage
    updateCartCount();
    updateCartDisplay();
}

// Initialize cart display on page load
window.onload = () => {
    updateCartCount();
    updateCartDisplay();
};
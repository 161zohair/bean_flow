let cart = [];

// Function to update the cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPrice = document.getElementById('total-price');
    cartItems.innerHTML = ''; // Clear the current cart items

    let total = 0;

    // Display cart items and their prices
    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div class="cart-item">
                <p>${item.name} - Rs.${item.price}</p>
                <button class="remove-item-btn" data-index="${index}">Remove</button>
            </div>
        `;
        total += item.price;
    });

    // Update total price display
    totalPrice.textContent = `Total: Rs.${total}`;
}

// Add item to the cart
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        const itemPrice = parseInt(button.getAttribute('data-price'));

        cart.push({ name: itemName, price: itemPrice });
        updateCart();
    });
});

// Event listener for "Remove" button in the cart
document.getElementById('cart-items').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item-btn')) {
        const itemIndex = e.target.getAttribute('data-index');
        cart.splice(itemIndex, 1); // Remove item from the cart
        updateCart(); // Update cart display after removal
    }
});

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    if (cart.length > 0) {
        document.getElementById('delivery-form-section').style.display = 'block';
    } else {
        alert('Your cart is empty!');
    }
});

// Handle form submission for delivery details
document.getElementById('delivery-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const notes = document.getElementById('notes').value;

    // Show order confirmation message
    document.getElementById('order-message').textContent = `Thank you ${name}! Your order will be delivered to ${address}. Contact: ${phone}. Notes: ${notes}`;

    // Empty the cart after order
    cart = [];
    updateCart();

    // Hide the delivery form section
    document.getElementById('delivery-form-section').style.display = 'none';
});

let cart = [];

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
    document.getElementById('cart-count').textContent = cartCount;

    const cartItemsDiv = document.getElementById('cart-items');
    if (!cart.length) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        document.getElementById('cart-total').textContent = "";
        document.getElementById('checkout-btn').style.display = "none";
        document.getElementById('payment-section').style.display = "none";
        return;
    }
    cartItemsDiv.innerHTML = cart.map(item =>
        `<div>
            ${item.name} (₹${item.price}) x ${item.qty}
            <button onclick="removeFromCart('${item.name}')">Remove</button>
        </div>`
    ).join('');
    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    document.getElementById('cart-total').textContent = `Total: ₹${total}`;
    document.getElementById('checkout-btn').style.display = "inline-block";
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
}

function showPayment() {
    document.getElementById('payment-section').style.display = "block";
    document.getElementById('checkout-btn').style.display = "none";
}

function togglePaymentFields() {
    const method = document.querySelector('input[name="payment-method"]:checked').value;
    document.getElementById('card-fields').style.display = method === 'card' ? 'block' : 'none';
    document.getElementById('upi-fields').style.display = method === 'upi' ? 'block' : 'none';
}

function processPayment(event) {
    event.preventDefault();
    document.getElementById('checkout-message').textContent = "Payment successful! Thank you for your order.";
    cart = [];
    updateCartDisplay();
    document.getElementById('payment-section').style.display = "none";
    setTimeout(() => {
        document.getElementById('checkout-message').textContent = "";
    }, 4000);
}

function submitForm(event) {
    event.preventDefault();
    alert("Thank you for contacting us!");
}

window.onload = updateCartDisplay;
// Sample product dataset
const products = [
    { id: 1, name: "Wireless Headphones", price: 1999, image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smart Watch", price: 2999, image: "https://via.placeholder.com/150" },
    { id: 3, name: "Gaming Mouse", price: 899, image: "https://via.placeholder.com/150" },
    { id: 4, name: "Mechanical Keyboard", price: 2499, image: "https://via.placeholder.com/150" }
];

let cart = [];

// Elements
const productGrid = document.getElementById("product-grid");
const cartCount = document.getElementById("cart-count");
const cartModal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartItemsList = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

// Render product cards dynamically
function renderProducts() {
    productGrid.innerHTML = "";
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(div);
    });
}

// Add item to cart array
function addToCart(id) {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateCartUI();
}

// Remove item from cart array by index
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update cart interface and count
function updateCartUI() {
    cartCount.innerText = cart.length;
    cartItemsList.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button onclick="removeFromCart(${index})" style="color:red; background:none; border:none; cursor:pointer;">✖</button>
        `;
        cartItemsList.appendChild(li);
    });

    totalPriceEl.innerText = total;
}

// Modal visibility handlers
cartBtn.addEventListener("click", () => cartModal.style.display = "flex");
closeCart.addEventListener("click", () => cartModal.style.display = "none");

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Order successfully placed!");
        cart = [];
        updateCartUI();
        cartModal.style.display = "none";
    }
}

// Initial Call
renderProducts();
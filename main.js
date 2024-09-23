// public/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display featured products
    fetch('/api/products/featured')
        .then(response => response.json())
        .then(products => {
            const productList = document.getElementById('product-list');
            products.forEach(product => {
                const productCard = createProductCard(product);
                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error('Error fetching featured products:', error));

    // Search functionality
    const searchForm = document.querySelector('.search-bar form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchForm.querySelector('input').value.trim();
            if (query) {
                window.location.href = `/products?search=${encodeURIComponent(query)}`;
            }
        });
    }

    // Add to Cart functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            addToCart(productId);
        }
    });
});

/**
 * Creates a product card element
 * @param {Object} product - The product object
 * @returns {HTMLElement} - The product card element
 */
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    card.innerHTML = `
        <img src="/images/${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <a href="/products/${product._id}" class="btn btn-secondary">View Details</a>
        <button class="btn btn-add-to-cart" data-id="${product._id}">Add to Cart</button>
    `;

    return card;
}

/**
 * Adds a product to the cart via AJAX
 * @param {string} productId - The ID of the product to add
 */
function addToCart(productId) {
    fetch('/api/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Product added to cart!');
            // Optionally, update the cart icon/count
            updateCartCount(data.cartCount);
        } else {
            alert('Failed to add product to cart.');
        }
    })
    .catch(error => console.error('Error adding to cart:', error));
}

/**
 * Updates the cart count in the header
 * @param {number} count - The new cart count
 */
function updateCartCount(count) {
    const cartLink = document.querySelector('.nav ul li a[href="/cart"]');
    if (cartLink) {
        cartLink.innerHTML = `<i class="fas fa-shopping-cart"></i> Cart (${count})`;
    }
}
// main.js

const products = [
    {
        id: 1,
        name: "Lipstick",
        image: "lipstick.webp",
        price: "₹500",
        description: "Long-lasting matte lipstick."
    },
    {
        id: 2,
        name: "Face Cream",
        image: "facecream.jpg",
        price: "₹700",
        description: "Hydrating face cream for all skin types."
    },
    {
        id: 3,
        name: "Shampoo",
        image: "shampoo.webp",
        price: "₹300",
        description: "Gentle shampoo for daily use."
    },
    {
        id: 4,
        name: "Eyeliner",
        image: "eyeliner.avif",
        price: "₹400",
        description: "Waterproof eyeliner for precise application."
    }
];

// Function to display products
function displayProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" />
            <h3 class="product-title">${product.name}</h3>
            <p>${product.description}</p>
            <p class="product-price">${product.price}</p>
            <button class="btn btn-secondary">View Details</button>
            <button class="btn btn-add-to-cart">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });
}

// Call the function to display products on page load
document.addEventListener('DOMContentLoaded', displayProducts);

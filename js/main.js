// Cart Management System
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('novaprint_cart')) || [];
        this.updateCartCount();
    }

    addToCart(product) {
        const existingItem = this.cart.find(item => 
            item.id === product.id && 
            item.size === product.size && 
            item.color === product.color
        );

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            this.cart.push(product);
        }

        this.saveCart();
        this.updateCartCount();
        this.showToast('Product added to cart!', 'success');
    }

    removeFromCart(productId, size, color) {
        this.cart = this.cart.filter(item => 
            !(item.id === productId && item.size === size && item.color === color)
        );
        this.saveCart();
        this.updateCartCount();
        this.showToast('Product removed from cart', 'info');
    }

    updateQuantity(productId, size, color, quantity) {
        const item = this.cart.find(item => 
            item.id === productId && item.size === size && item.color === color
        );

        if (item) {
            if (quantity <= 0) {
                this.removeFromCart(productId, size, color);
            } else {
                item.quantity = quantity;
                this.saveCart();
            }
        }
    }

    getCart() {
        return this.cart;
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartCount();
        this.showToast('Cart cleared', 'info');
    }

    saveCart() {
        localStorage.setItem('novaprint_cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const count = this.cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = count;
        }
    }

    showToast(message, type = 'info') {
        const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
        const toast = document.createElement('div');
        toast.className = `custom-toast ${type}`;
        toast.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
}

// Initialize Cart Manager
const cartManager = new CartManager();

// Product Data
const products = [
    {
        id: 1,
        name: "Classic 3D Print T-Shirt",
        price: 29.99,
        oldPrice: 39.99,
        image: "Products/1/main-image-1.jpeg",
        images: [
            "Products/1/main-image-1.jpeg",
            "Products/1/main-image-2.jpeg",
            "Products/1/main-image-3.jpeg",
            "Products/1/main-image-4.jpeg",
            "Products/1/main-image-5.jpeg",
            "Products/1/main-image-6.jpeg"
        ],
        description: "Premium quality 3D printed t-shirt with unique design patterns.",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Gray', 'Navy'],
        category: "Classic"
    },
    {
        id: 2,
        name: "Modern Graphic 3D Tee",
        price: 34.99,
        oldPrice: 44.99,
        image: "Products/2/main-image-1.jpeg",
        images: [
            "Products/2/main-image-1.jpeg",
            "Products/2/main-image-2.jpeg",
            "Products/2/main-image-3.jpeg",
            "Products/2/main-image-4.jpeg",
            "Products/2/main-image-5.jpeg",
            "Products/2/main-image-6.jpeg"
        ],
        description: "Contemporary 3D graphic design with vibrant colors and modern aesthetics.",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Red', 'Blue'],
        category: "Modern"
    },
    {
        id: 3,
        name: "Abstract Art 3D Shirt",
        price: 39.99,
        oldPrice: 49.99,
        image: "Products/3/main-image-1.jpeg",
        images: [
            "Products/3/main-image-1.jpeg",
            "Products/3/main-image-2.jpeg",
            "Products/3/main-image-3.jpeg",
            "Products/3/main-image-4.jpeg",
            "Products/3/main-image-5.jpeg",
            "Products/3/main-image-6.jpeg"
        ],
        description: "Artistic abstract 3D patterns that make a bold statement.",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Purple', 'Green'],
        category: "Artistic"
    },
    {
        id: 4,
        name: "Hip Hop Style 3D T-Shirt",
        price: 42.99,
        oldPrice: 54.99,
        image: "Products/4/Custom Heavyweight Casual Hip Hop Style with O-Neck Solid Pattern 3D Puff Print Logo 100% Cotton Tshirt-1.jpeg",
        images: [
            "Products/4/Custom Heavyweight Casual Hip Hop Style with O-Neck Solid Pattern 3D Puff Print Logo 100% Cotton Tshirt-1.jpeg",
            "Products/4/Custom Heavyweight Casual Hip Hop Style with O-Neck Solid Pattern 3D Puff Print Logo 100% Cotton Tshirt2.jpeg",
            "Products/4/Custom Heavyweight Casual Hip Hop Style with O-Neck Solid Pattern 3D Puff Print Logo 100% Cotton Tshirt-3.jpeg",
            "Products/4/Custom Heavyweight Casual Hip Hop Style with O-Neck Solid Pattern 3D Puff Print Logo 100% Cotton Tshirt-4.jpeg",
            "Products/4/Custom Heavyweight Casual Hip Hop Style with O-Neck Solid Pattern 3D Puff Print Logo 100% Cotton Tshirt-5.jpeg",
            "Products/4/Custom Heavyweight Casual Hip Hop Style with O-Neck Solid Pattern 3D Puff Print Logo 100% Cotton Tshirt6.jpeg"
        ],
        description: "Heavyweight hip hop style with 3D puff print logo, 100% cotton comfort.",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Gray', 'Navy'],
        category: "Hip Hop"
    },
    {
        id: 5,
        name: "Y2K Streetwear 3D Tee",
        price: 36.99,
        oldPrice: 46.99,
        image: "Products/5/Streetwear Y2k 100% Cotton Custom Dtg Printer Boys Tee Shirts Oversized Drop Shoulder Refurbished Graphic Men T Shirts.jpeg",
        images: [
            "Products/5/Streetwear Y2k 100% Cotton Custom Dtg Printer Boys Tee Shirts Oversized Drop Shoulder Refurbished Graphic Men T Shirts.jpeg",
            "Products/5/Streetwear Y2k 100% Cotton Custom Dtg Printer Boys Tee Shirts Oversized Drop Shoulder Refurbished Graphic Men T Shirts2.jpeg",
            "Products/5/Streetwear Y2k 100% Cotton Custom Dtg Printer Boys Tee Shirts Oversized Drop Shoulder Refurbished Graphic Men T Shirts3.jpeg",
            "Products/5/Streetwear Y2k 100% Cotton Custom Dtg Printer Boys Tee Shirts Oversized Drop Shoulder Refurbished Graphic Men T Shirts4.jpeg",
            "Products/5/Streetwear Y2k 100% Cotton Custom Dtg Printer Boys Tee Shirts Oversized Drop Shoulder Refurbished Graphic Men T Shirts-5.jpeg",
            "Products/5/Streetwear Y2k 100% Cotton Custom Dtg Printer Boys Tee Shirts Oversized Drop Shoulder Refurbished Graphic Men T Shirts6.jpeg"
        ],
        description: "Y2K inspired streetwear with oversized drop shoulder and custom 3D graphics.",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Pink', 'Blue'],
        category: "Streetwear"
    },
    {
        id: 6,
        name: "Premium Modal 3D T-Shirt",
        price: 44.99,
        oldPrice: 59.99,
        image: "Products/6/Wholesale High Quality Mens T-shirt, Blank Camisas Modal Tshirt Printing Custom Plain T-shirt Logo Printed T Shirts.jpeg",
        images: [
            "Products/6/Wholesale High Quality Mens T-shirt, Blank Camisas Modal Tshirt Printing Custom Plain T-shirt Logo Printed T Shirts.jpeg",
            "Products/6/Wholesale High Quality Mens T-shirt, Blank Camisas Modal Tshirt Printing Custom Plain T-shirt Logo Printed T Shirts2.jpeg",
            "Products/6/Wholesale High Quality Mens T-shirt, Blank Camisas Modal Tshirt Printing Custom Plain T-shirt Logo Printed T Shirts-3.jpeg",
            "Products/6/Wholesale High Quality Mens T-shirt, Blank Camisas Modal Tshirt Printing Custom Plain T-shirt Logo Printed T Shirts-4.jpeg",
            "Products/6/Wholesale High Quality Mens T-shirt, Blank Camisas Modal Tshirt Printing Custom Plain T-shirt Logo Printed T Shirts-5.jpeg",
            "Products/6/Wholesale High Quality Mens T-shirt, Blank Camisas Modal Tshirt Printing Custom Plain T-shirt Logo Printed T Shirts-6.jpeg"
        ],
        description: "High quality modal fabric with premium 3D logo printing and superior comfort.",
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: ['Black', 'White', 'Gray', 'Navy'],
        category: "Premium"
    }
];

// Load Featured Products on Home Page
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;

    const featuredProducts = products.slice(0, 3);
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredContainer.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    col.innerHTML = `
        <div class="card product-card">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <div class="mb-3">
                    <span class="product-price">$${product.price}</span>
                    <span class="product-old-price ms-2">$${product.oldPrice}</span>
                </div>
                <div class="d-flex justify-content-between">
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline-primary">View Details</a>
                    <button class="btn btn-primary" onclick="quickAddToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Quick Add to Cart (from product card)
function quickAddToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            size: product.sizes[0], // Default size
            color: product.colors[0], // Default color
            quantity: 1
        };
        cartManager.addToCart(cartProduct);
    }
}

// Load All Products
function loadAllProducts() {
    const productsContainer = document.getElementById('products-container');
    if (!productsContainer) return;

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Load Product Detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        window.location.href = 'products.html';
        return;
    }

    // Update page title
    document.title = `${product.name} - NovaPrint Studio LLC`;

    // Load product details
    const productDetailContainer = document.getElementById('product-detail');
    if (productDetailContainer) {
        productDetailContainer.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <img id="main-image" src="${product.images[0]}" class="img-fluid product-detail-image" alt="${product.name}">
                    </div>
                    <div class="d-flex gap-2 flex-wrap">
                        ${product.images.map((img, index) => `
                            <img src="${img}" class="thumbnail-img ${index === 0 ? 'active' : ''}" 
                                 onclick="changeMainImage('${img}', this)" alt="Thumbnail ${index + 1}">
                        `).join('')}
                    </div>
                </div>
                <div class="col-md-6">
                    <h1 class="mb-3">${product.name}</h1>
                    <p class="lead">${product.description}</p>
                    <div class="mb-4">
                        <span class="product-price">$${product.price}</span>
                        <span class="product-old-price ms-2">$${product.oldPrice}</span>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Size:</label>
                        <div class="d-flex flex-wrap">
                            ${product.sizes.map(size => `
                                <button class="variant-option size-option" onclick="selectVariant(this, 'size')">${size}</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mb-3">
                        <label class="form-label">Color:</label>
                        <div class="d-flex flex-wrap">
                            ${product.colors.map(color => `
                                <button class="variant-option color-option" onclick="selectVariant(this, 'color')">${color}</button>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="mb-4">
                        <label class="form-label">Quantity:</label>
                        <div class="quantity-control">
                            <button onclick="changeQuantity(-1)">-</button>
                            <input type="number" id="quantity" value="1" min="1" max="10" class="form-control text-center" style="width: 60px;">
                            <button onclick="changeQuantity(1)">+</button>
                        </div>
                    </div>
                    
                    <div class="d-flex gap-3">
                        <button class="btn btn-primary btn-lg" onclick="addToCartFromDetail(${product.id})">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                        <button class="btn btn-outline-primary btn-lg" onclick="buyNow(${product.id})">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Select first options by default
        setTimeout(() => {
            document.querySelector('.size-option')?.click();
            document.querySelector('.color-option')?.click();
        }, 100);
    }
}

// Change Main Image
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('main-image');
    if (mainImage) {
        mainImage.src = imageSrc;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail-img').forEach(thumb => {
            thumb.classList.remove('active');
        });
        thumbnail.classList.add('active');
    }
}

// Select Variant
function selectVariant(element, type) {
    // Remove active class from siblings
    element.parentElement.querySelectorAll(`.${type}-option`).forEach(opt => {
        opt.classList.remove('selected');
    });
    
    // Add active class to clicked element
    element.classList.add('selected');
}

// Change Quantity
function changeQuantity(change) {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        let newValue = parseInt(quantityInput.value) + change;
        if (newValue >= 1 && newValue <= 10) {
            quantityInput.value = newValue;
        }
    }
}

// Add to Cart from Product Detail
function addToCartFromDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const selectedSize = document.querySelector('.size-option.selected')?.textContent;
    const selectedColor = document.querySelector('.color-option.selected')?.textContent;
    const quantity = parseInt(document.getElementById('quantity')?.value || 1);

    if (!selectedSize || !selectedColor) {
        cartManager.showToast('Please select size and color', 'error');
        return;
    }

    const cartProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity
    };

    cartManager.addToCart(cartProduct);
}

// Buy Now
function buyNow(productId) {
    addToCartFromDetail(productId);
    setTimeout(() => {
        window.location.href = 'cart.html';
    }, 500);
}

// Load Cart
function loadCart() {
    const cartContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartContainer) return;

    const cart = cartManager.getCart();
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <h4>Your cart is empty</h4>
                <p class="text-muted">Add some products to get started!</p>
                <a href="products.html" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                </div>
                <div class="col-md-4">
                    <h5>${item.name}</h5>
                    <p class="text-muted mb-0">Size: ${item.size} | Color: ${item.color}</p>
                </div>
                <div class="col-md-2">
                    <div class="quantity-control">
                        <button onclick="updateCartItemQuantity(${item.id}, '${item.size}', '${item.color}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartItemQuantity(${item.id}, '${item.size}', '${item.color}', 1)">+</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
                </div>
                <div class="col-md-2">
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id}, '${item.size}', '${item.color}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    if (cartTotal) {
        cartTotal.textContent = `$${cartManager.getCartTotal().toFixed(2)}`;
    }
}

// Update Cart Item Quantity
function updateCartItemQuantity(productId, size, color, change) {
    const cart = cartManager.getCart();
    const item = cart.find(item => 
        item.id === productId && item.size === size && item.color === color
    );
    
    if (item) {
        const newQuantity = item.quantity + change;
        cartManager.updateQuantity(productId, size, color, newQuantity);
        loadCart(); // Reload cart display
    }
}

// Remove from Cart
function removeFromCart(productId, size, color) {
    cartManager.removeFromCart(productId, size, color);
    loadCart(); // Reload cart display
}

// Newsletter Form
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            cartManager.showToast(`Thank you for subscribing with ${email}!`, 'success');
            this.reset();
        });
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Load page-specific content
    if (document.getElementById('featured-products')) {
        loadFeaturedProducts();
    }
    
    if (document.getElementById('products-container')) {
        loadAllProducts();
    }
    
    if (document.getElementById('product-detail')) {
        loadProductDetail();
    }
    
    if (document.getElementById('cart-items')) {
        loadCart();
    }
    
    // Initialize newsletter form
    initNewsletterForm();
});

// Load Related Products
function loadRelatedProducts() {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const currentProductId = parseInt(urlParams.get('id'));
    
    if (!currentProductId) return;

    // Get products excluding the current one
    const relatedProducts = products.filter(p => p.id !== currentProductId).slice(0, 3);
    
    relatedProducts.forEach(product => {
        const productCard = createProductCard(product);
        relatedContainer.appendChild(productCard);
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Load page-specific content
    if (document.getElementById('featured-products')) {
        loadFeaturedProducts();
    }
    
    if (document.getElementById('products-container')) {
        loadAllProducts();
    }
    
    if (document.getElementById('product-detail')) {
        loadProductDetail();
        loadRelatedProducts();
    }
    
    if (document.getElementById('cart-items')) {
        loadCart();
    }
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Ensure all images load properly
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2Ugbm90IGF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
        });
    });
});

// Add custom styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    img {
        object-fit: cover;
        max-width: 100%;
        height: auto;
    }
    
    .hero-image {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;
document.head.appendChild(style);

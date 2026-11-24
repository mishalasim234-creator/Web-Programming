/* =================================
   SECTION 1: PRODUCT DATA */
// Store all website products in an array
const products = [
    {
        id: 1,
        name: "Smartphone",
        price: 45000,
        category: "electronics",
        image: "images/products/phone.jpg",
        rating: 5,
        description: "A modern smartphone with excellent features."
    },
    {
        id: 2,
        name: "Headphones",
        price: 3500,
        category: "electronics",
        image: "images/products/headphones.jpg",
        rating: 4,
        description: "Comfortable headphones with clear sound."
    },
    {
        id: 3,
        name: "Sneakers",
        price: 5000,
        category: "shoes",
        image: "images/products/sneakers.jpg",
        rating: 5,
        description: "Stylish sneakers for everyday use."
    },
    {
        id: 4,
        name: "Handbag",
        price: 4000,
        category: "accessories",
        image: "images/products/handbag.jpg",
        rating: 4,
        description: "A beautiful handbag for daily use."
    },
    {
        id: 5,
        name: "Watch",
        price: 6000,
        category: "accessories",
        image: "images/products/watch.jpg",
        rating: 5,
        description: "An elegant watch with a stylish design."
    },
    {
        id: 6,
        name: "Blender",
        price: 8000,
        category: "home appliances",
        image: "images/products/blender.jpg",
        rating: 4,
        description: "A useful blender for your kitchen."
    }
];
/* =================================
   SECTION 2: NAVIGATION DRAWER
================================= */
// Open and close the navigation drawer
function toggleDrawer() {

    const drawer = document.querySelector(".drawer");
    const overlay = document.querySelector(".drawer-overlay");
    drawer.classList.toggle("active");
    overlay.classList.toggle("active");
}
// Close the navigation drawer
function closeDrawer() {
    const drawer = document.querySelector(".drawer");
    const overlay = document.querySelector(".drawer-overlay");
    drawer.classList.remove("active");
    overlay.classList.remove("active");
}

/* SECTION 3: IMAGE SLIDESHOW */
let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
// Function to show slides
function showSlide() {
    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Move to first slide after last slide
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    // Show current slide
    slides[slideIndex].style.display = "block";
}
// Next slide
function nextSlide() {
    slideIndex++;
    showSlide();
}
// Previous slide
function previousSlide() {
    slideIndex--;
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    showSlide();
}
// Start slideshow
showSlide();
// Automatically change slide every 4 seconds
setInterval(nextSlide, 4000);

/* =================================
   SECTION 4: PRODUCT SEARCH */
function searchProducts() {
    // Get the search text
    let searchText = document.getElementById("searchInput").value;
    // Get all product cards
    let productCards = document.getElementsByClassName("product-card");
    // Check each product
    for (let i = 0; i < productCards.length; i++) {
        let productName = productCards[i].getElementsByTagName("h3")[0].innerText;
        // Compare product name with search text
        if (productName.toLowerCase().includes(searchText.toLowerCase())) {

            productCards[i].style.display = "block";
        } else {

            productCards[i].style.display = "none";
        }
    }
}

/* =================================
   SECTION 5: ADD TO CART */
// Empty array to store cart products
let cart = [];
// Add product to cart
function addToCart(productId) {
    // Find the selected product
    let selectedProduct = products.find(function(product) {
        return product.id === productId;
    });
    // Add product to cart
    cart.push(selectedProduct);
    // Update cart display
    displayCart();
    // Show message
    alert("Product added to cart!");
}
/* =================================
   SECTION 6: DISPLAY CART ITEMS */
function displayCart() {
    // Get cart container
    let cartItems = document.getElementById("cart-items");
    // Clear previous cart content
    cartItems.innerHTML = "";
    let total = 0;
    // Display each product
    for (let i = 0; i < cart.length; i++) {
        let product = cart[i];
        // Calculate total price
        total = total + product.price;
        // Create cart item
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${product.image}" width="70">
                <div>
                    <h3>${product.name}</h3>
                    <p>Rs. ${product.price}</p>
                </div>
                <button onclick="removeFromCart(${i})">
                    Remove
                </button>
            </div>
        `;
    }
    // Display total price
    document.getElementById("cart-total").innerText =
        "Total: Rs. " + total;
    // Update cart count
    document.getElementById("cart-count").innerText = cart.length;
}
/* =================================
   SECTION 7: REMOVE FROM CART */
function removeFromCart(index) {
    // Remove selected product from cart
    cart.splice(index, 1);
    // Update cart display
    displayCart();
    // Show message
    alert("Product removed from cart!");
}
/* =================================
   SECTION 8: PRODUCT DETAILS */
function showProductDetails(productId) {
    // Find selected product
    let product = products.find(function(item) {
        return item.id === productId;
    });
    // Display product details
    alert(
        "Product Name: " + product.name +
        "\nPrice: Rs. " + product.price +
        "\nRating: " + product.rating + " Stars" +
        "\nDescription: " + product.description
    );
}
/* =================================
  

/* =================================
   SECTION 9: WISHLIST
================================= */

// Store wishlist products
let wishlistItems = [];

// Add product to wishlist
function addToWishlist(id) {

    // Find selected product using its ID
    let product = products.find(function(item) {
        return item.id === id;
    });

    // Check if product exists
    if (!product) {
        alert("Product not found!");
        return;
    }

    // Check if product is already added
    let alreadyAdded = wishlistItems.some(function(item) {
        return item.id === id;
    });

    if (alreadyAdded) {
        alert("This product is already in your Wishlist!");
        return;
    }

    // Add product to wishlist
    wishlistItems.push(product);

    // Update wishlist display
    displayWishlist();

    alert(product.name + " added to Wishlist!");
}

// Open wishlist section
function showWishlist() {

    let wishlistSection = document.getElementById("wishlist");

    wishlistSection.style.display = "block";

    displayWishlist();

    wishlistSection.scrollIntoView({
        behavior: "smooth"
    });
}

// Display wishlist products
function displayWishlist() {

    let container = document.getElementById("wishlist-items");

    if (wishlistItems.length === 0) {
        container.innerHTML = "<p>Your Wishlist is empty.</p>";
        return;
    }

    container.innerHTML = wishlistItems.map(function(product) {

        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Rs. ${product.price}</p>

                <button onclick="removeFromWishlist(${product.id})">
                    Remove
                </button>
            </div>
        `;

    }).join("");
}

// Remove product from wishlist
function removeFromWishlist(id) {

    wishlistItems = wishlistItems.filter(function(product) {
        return product.id !== id;
    });

    displayWishlist();

    alert("Product removed from Wishlist!");
}


/* =================================
   SECTION 10: CONTACT FORM */
function submitContactForm(event) {
    // Stop page from refreshing
    event.preventDefault();
    // Get form values
    let name = document.getElementById("contactName").value;
    let email = document.getElementById("contactEmail").value;
    let message = document.getElementById("contactMessage").value;
    // Check empty fields
    if (name === "" || email === "" || message === "") {
        alert("Please fill all the fields!");
    } else {
        alert("Your message has been submitted successfully!");
        // Clear the form
        document.getElementById("contactForm").reset();
    }
}
/* =================================
   SECTION 11: CHECKOUT */
function checkout() {
    // Check whether cart is empty
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
    } else {
        alert("Thank you for shopping with ShopEase!");
        // Empty the cart
        cart = [];
        // Update cart display
        displayCart();
    }
}
/* =================================
   SECTION 12: CATEGORY FILTER */
function filterCategory(categoryName) {
    // Get all product cards
    let productCards = document.getElementsByClassName("product-card");
    // Check every product
    for (let i = 0; i < productCards.length; i++) {
        let productName = productCards[i]
            .getElementsByTagName("h3")[0].innerText;
        // Match category using product information
        let product = products[i];
        if (product && product.category === categoryName.toLowerCase()) {
            productCards[i].style.display = "block";
        } else {
            productCards[i].style.display = "none";
        }
    }
}
/* =================================
   SECTION 13: SHOW ALL PRODUCTS */
function showAllProducts() {
    // Get all product cards
    let productCards = document.getElementsByClassName("product-card");
    // Show every product
    for (let i = 0; i < productCards.length; i++) {
        productCards[i].style.display = "block";
    }
}
/* =================================
   SECTION 14: CLEAR SEARCH */
function clearSearch() {
    // Empty the search box
    document.getElementById("searchInput").value = "";
    // Show all products again
    showAllProducts();
}
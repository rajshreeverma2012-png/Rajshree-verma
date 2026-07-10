const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {

    let current = 0;

    setInterval(() => {

        slides[current].classList.remove("active");

        current = (current + 1) % slides.length;

        slides[current].classList.add("active");

    }, 3000);

}

function toggleMenu(){

    document.getElementById("navbar").classList.toggle("active");

}

// Show button when scrolling
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    const btn = document.getElementById("topBtn");

    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
}

// Scroll back to top
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {
    button.addEventListener("click", () => {
        const answer = button.nextElementSibling;

        if (answer.style.display === "block") {
            answer.style.display = "none";
        } else {
            answer.style.display = "block";
        }
    });
});

window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        setTimeout(function () {
            preloader.style.display = "none";
        }, 2000);
    }
});

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {

    const item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}

function loadCart() {

    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
        <div class="cart-item">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

<button onclick="decreaseQuantity(${index})">−</button>

<span>${item.quantity}</span>

<button onclick="increaseQuantity(${index})">+</button>

<button class="remove-btn" onclick="removeItem(${index})">
Remove
</button>

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}
        </div>
        `;
    });

    document.getElementById("total").innerText =
        "Total: ₹" + total;
}

function increaseQuantity(index){

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

function decreaseQuantity(index){

    if(cart[index].quantity > 1){

        cart[index].quantity--;

    }else{

        cart.splice(index,1);

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

loadCart();

const checkoutForm = document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function(e){

        e.preventDefault();

        alert("Thank you! Your Elevanta order has been placed successfully.");

        localStorage.removeItem("cart");

        window.location.href = "index.html";

    });

}
function payNow() {

    var options = {

        key: "YOUR_RAZORPAY_KEY_ID",

        amount: 10000,

        currency: "INR",

        name: "Elevanta",

        description: "Mineral Water Order",

        handler: function (response) {

            alert("Payment Successful!\nPayment ID: " + response.razorpay_payment_id);

        }

    };

    var rzp = new Razorpay(options);

    rzp.open();

}

function sendWhatsAppOrder() {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    let message = "🛒 *New Elevanta Order*%0A%0A";

    message += "*Customer:* " + name + "%0A";
    message += "*Phone:* " + phone + "%0A";
    message += "*Address:* " + address + "%0A%0A";

    message += "*Products:*%0A";

    let total = 0;

    cart.forEach(item => {
        message += "- " + item.name + " x " + item.quantity +
        " = ₹" + (item.price * item.quantity) + "%0A";

        total += item.price * item.quantity;
    });

    message += "%0A*Total:* ₹" + total;

    const whatsappNumber = "91XXXXXXXXXX"; // Replace with your WhatsApp number

    window.open(
        `https://wa.me/${whatsappNumber}?text=${message}`,
        "_blank"
    );
}



function searchProducts() {

    const input = document.getElementById("searchInput").value.toLowerCase();

    const products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        const name = product.querySelector("h3").textContent.toLowerCase();

        if (name.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}

function addWishlist(product){

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert(product + " added to Wishlist!");

}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};
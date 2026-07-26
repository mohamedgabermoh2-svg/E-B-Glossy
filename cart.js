let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];


updateCartCount();


let container =
document.getElementById(
"cart-items"
);

if(container){

    renderCart();

}



/* ================= UPDATE COUNT ================= */

function updateCartCount(){

    let counter =
    document.getElementById(
    "cart-count"
    );

    if(counter){

        let total = 0;

        cart.forEach(item=>{

            total += item.quantity;

        });

        counter.innerText =
        total;
    }
}



/* ================= RENDER CART ================= */

function renderCart(){

    container.innerHTML = "";

    if(cart.length === 0){

        container.innerHTML =

        `
        <div class="empty-cart">

            <h2>
                Your cart is empty 🥲
            </h2>

            <p>
                Add some beautiful products first ✨
            </p>

        </div>
        `;

        return;
    }

    let total = 0;

    cart.forEach((item,index)=>{

        total +=
        item.price * item.quantity;

        container.innerHTML +=

        `
        <div class="cart-item">

            <div class="cart-left">

                <img
                src="${item.image}"
                class="cart-image">

                <div class="cart-info">

                    <h3>${item.name}</h3>



                    <p>

                        Quantity :
                        ${item.quantity}

                    </p>

                    <p>

                        ${item.price}
                        EGP each

                    </p>

                    <h4 class="total-price">

                        ${
                            item.price *
                            item.quantity
                        }
                        EGP

                    </h4>

                </div>

            </div>

            <button
            class="remove-btn"
            onclick="removeItem(${index})">

                Remove ❌

            </button>

        </div>
        `;
    });

    container.innerHTML +=

    `
    <div class="cart-total">

        <h2>

            Total :
            ${total} EGP

        </h2>

    </div>
    `;
}let totalItems = 0;

cart.forEach(item=>{

    totalItems += item.quantity;

});


/* ================= REMOVE ================= */

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    renderCart();

    showMessage(
        "Item removed 🥲"
    );

}



/* ================= ADD ================= */

function increase(btn){

    let qty =
    btn.parentElement.querySelector(".qty");

    qty.innerText =
    Number(qty.innerText)+1;
}

function decrease(btn){

    let qty =
    btn.parentElement.querySelector(".qty");

    if(Number(qty.innerText)>1){

        qty.innerText =
        Number(qty.innerText)-1;
    }

}function addToCart(
name,
image,
price,
btn,
shade = ""
){

    if(name === "Body Splash"){

        name = "Body Splash - " + bodySplashVariant;

        if(bodySplashVariant === "Musk Vanilla"){

            image = "images/bodysplashmuskvanilla.jpeg";

        }else{

            image = "images/bodysplashsweetcandy.jpeg";

        }

    }

    let quantity = Number(

        btn.parentElement
        .querySelector(".qty")
        .innerText

    );

   // Handle Lip Gloss Shades
if(name === "Lip Gloss" && shade){

    name = name + " - " + shade;

}
    let existing = cart.find(

        item =>
        item.name === name &&


        item.image === image &&

        item.price === price);

    if(existing){

        existing.quantity += quantity;

    }

    else{

        cart.push({

            name:name,

            image: getVariantImage(name, image),

            price:price,

            quantity:quantity,
            

        });

    }

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    showMessage(

        `${name} x${quantity}
added to cart ✨
(${price*quantity} EGP)`

    );

}function getVariantImage(name, image){

    if(name.includes("Body Splash")){

        if(name.includes("Musk Vanilla")){
            return "images/bodysplashmuskvanilla.jpeg";
        }

        if(name.includes("Sweet Candy")){
            return "images/bodysplashsweetcandy.jpeg";
        }

    }

    return image;

}



/* ================= WHATSAPP ================= */

function orderWhatsApp(){

    if(cart.length===0){

        showMessage(
            "Your cart is empty 🥲"
        );

        return;
    }

     document.getElementById("customer-popup").style.display = "flex";
     
}
function closeCustomerPopup(){

    document.getElementById("customer-popup").style.display = "none";

}function sendOrderWhatsApp(){

    let customerName =
    document.getElementById("customer-name").value.trim();

    let customerPhone =
    document.getElementById("customer-phone").value.trim();

    let customerAddress =
    document.getElementById("customer-address").value.trim();

    let customerNotes =
    document.getElementById("customer-notes").value.trim();

    let valid = true;

document
.getElementById("customer-name")
.classList.remove("input-error");

document
.getElementById("customer-phone")
.classList.remove("input-error");

document
.getElementById("customer-address")
.classList.remove("input-error");

if(customerName===""){

    document
    .getElementById("customer-name")
    .classList.add("input-error");

    valid = false;

}

if(customerPhone===""){

    document
    .getElementById("customer-phone")
    .classList.add("input-error");

    valid = false;

}

if(customerAddress===""){

    document
    .getElementById("customer-address")
    .classList.add("input-error");

    valid = false;

}

if(!valid){

    showMessage(
    "Please complete the required fields ❤️"
    );

    return;

}

    let text =

`❤️ Hello E&B Glossy ❤️

━━━━━━━━━━━━━━

👤 Name:
${customerName}

📱 Phone:
${customerPhone}

📍 Address:
${customerAddress}

📝 Notes:
${customerNotes || "None"}

━━━━━━━━━━━━━━

🛍 Order

`;

    let total = 0;

    cart.forEach(item=>{

        let itemTotal =
        item.price *
        item.quantity;

        total += itemTotal;

        text +=

`✨ ${item.name}

• Quantity: ${item.quantity}

• Price: ${item.price} EGP

• Subtotal: ${itemTotal} EGP

━━━━━━━━━━━━━━

`;

    });

    text +=

`💰 Total:
${total} EGP

Thank you 🤍🩷`;

    let url =

    "https://wa.me/201068909087?text="

    + encodeURIComponent(text);

    window.open(
        url,
        "_blank"
    );

}


/* ================= MESSAGE ================= */

function showMessage(message){

    let toast =

    document.getElementById(
    "toast"
    );

    toast.innerText =
    message;

    toast.classList.add(
    "show-toast"
    );



    setTimeout(()=>{

        toast.classList.remove(
        "show-toast"
        );

    },2000);

}/* ================= WISHLIST ================= */

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];

function toggleWishlist(name,image,price,btn){

    let index =
    wishlist.findIndex(item => item.name === name);

    if(index > -1){

        wishlist.splice(index,1);

        btn.classList.remove("active");

        btn.innerHTML =
        '<i class="fa-regular fa-heart"></i>';

        showMessage("Removed from Wishlist 🤍");

    }else{

        wishlist.push({

            name:name,
            image:image,
            price:price

        });

        btn.classList.add("active");

        btn.innerHTML =
        '<i class="fa-solid fa-heart"></i>';

        showMessage("Saved to Wishlist ❤️");

    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}

window.addEventListener("DOMContentLoaded",()=>{

    document
    .querySelectorAll(".wishlist-btn")
    .forEach(btn=>{

        let name = btn.dataset.name;

        if(

            wishlist.some(item=>item.name===name)

        ){

            btn.classList.add("active");

            btn.innerHTML =
            '<i class="fa-solid fa-heart"></i>';

        }

    });

});/* ================= WISHLIST PAGE ================= */

let wishlistContainer =
document.getElementById("wishlist-items");

if(wishlistContainer){

renderWishlist();

}

function renderWishlist(){

wishlistContainer.innerHTML="";

if(wishlist.length===0){

wishlistContainer.innerHTML=

`

<div class="empty-cart">

<h2>

Your Wishlist is Empty ❤️

</h2>

<p>

Save your favorite products first ✨

</p>

</div>

`;

return;

}

wishlist.forEach((item,index)=>{

wishlistContainer.innerHTML+=

`

<div class="cart-item">

<div class="cart-left">

<img
src="${item.image}"
class="cart-image">

<div class="cart-info">

<h3>

${item.name}

</h3>

<h4 class="total-price">

${item.price} EGP

</h4>

</div>

</div>

<div>

<button
class="cart-btn"
onclick="addWishlistToCart(${index})">

Add To Cart 🛒

</button>

<br><br>

<button
class="remove-btn"
onclick="removeWishlist(${index})">

Remove ❌

</button>

</div>

</div>

`;

});

}function removeWishlist(index){

wishlist.splice(index,1);

localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);

renderWishlist();

showMessage(

"Removed from Wishlist 🤍"

);

}
function addWishlistToCart(index){

let item = wishlist[index];

let existing = cart.find(

p => p.name === item.name

);

if(existing){

    existing.quantity++;

}else{

    cart.push({

        name:item.name,

        image:item.image,

        price:item.price,

        quantity:1

    });

}

localStorage.setItem(

    "cart",

    JSON.stringify(cart)

);

updateCartCount();

showMessage(

`${item.name} x1
added to cart ✨
(${item.price} EGP)`

);

}


/* ================= REVIEWS SLIDER ================= */

let reviews = [

    "reviews/review1.jpeg",
    "reviews/review2.jpeg",
    "reviews/review3.jpeg",
    "reviews/review4.jpeg",
    "reviews/review5.jpeg",
    "reviews/review6.jpeg",
    "reviews/review7.jpeg",
    "reviews/review8.jpeg",
    "reviews/review9.jpeg",
    "reviews/review10.jpeg",
    "reviews/review11.jpeg",
    "reviews/review12.jpeg",

];

let currentReview = 0;

function showReview(){

    let img = document.getElementById("review-image");

    if(img){

        img.src = reviews[currentReview];

    }

}

function nextReview(){

    currentReview++;

    if(currentReview >= reviews.length){

        currentReview = 0;

    }

    showReview();

}

function prevReview(){

    currentReview--;

    if(currentReview < 0){

        currentReview = reviews.length - 1;

    }

    showReview();

}
showReview();

function shareWebsite(){

    if(navigator.share){

        navigator.share({

            title:"E&B Glossy",

            text:"Check out E&B Glossy 💖",

            url:window.location.origin

        });

    }

    else{

        navigator.clipboard.writeText(window.location.origin);

        showMessage("Website link copied ✨");

    }

}/* ================= PAGE TRANSITION ================= */

document.querySelectorAll("a").forEach(link=>{

    let href = link.getAttribute("href");

    if(

        href &&
        !href.startsWith("http") &&
        !href.startsWith("#")

    ){

        link.addEventListener("click",function(e){

            e.preventDefault();

            document.body.classList.add("fade-out");

            setTimeout(()=>{

                window.location.href = href;

            },350);

        });

    }

});/* ================= INTRO LOADER ================= */

window.addEventListener("load",()=>{

    let loader = document.getElementById("intro-loader");

    if(!loader) return;

    if(sessionStorage.getItem("introPlayed")){

        loader.style.display="none";

        return;

    }

    sessionStorage.setItem("introPlayed","true");

    setTimeout(()=>{

        loader.style.display="none";

    },1800);

});/* ================= PRODUCT POPUP ================= */

let bodySplashVariant = "Musk Vanilla";

function openProduct(name,image,price,description){

    document.getElementById("popup-name").innerText = name;

    document.getElementById("popup-price").innerText = price + " EGP";

    document.getElementById("popup-image").src = image;

    document.getElementById("popup-description").innerText = description;

    if(name==="Body Splash"){

    document.getElementById("variant-box").style.display="block";

    document.getElementById("popup-image").src =
    "images/bodysplashmuskvanilla.jpeg";

    document.getElementById("popup-description").innerText =
    "Fresh vanilla fragrance for a delightful experience.";

    document.querySelectorAll(".popup-thumb")
    
.forEach(img => img.classList.remove("active"));


document.querySelectorAll(".popup-thumb")[0]
.classList.add("active");

}

else{

    document.getElementById("variant-box").style.display="none";

} let glossGallery = document.getElementById("popup-gloss-gallery");

glossGallery.style.display = "none";

glossGallery.innerHTML = "";
if(name === "Lip Gloss"){
   if(name === "Lip Gloss"){

    document.getElementById("popup-image").style.width = "630px";
    document.getElementById("popup-image").style.height = "530px";

    // باقي كود الـ gallery

}
else{

    document.getElementById("popup-image").style.width = "350px";
    document.getElementById("popup-image").style.height = "350px";

}

    glossGallery.style.display = "flex";

    glossGallery.innerHTML = `

    <div class="popup-thumb-box">

        <img
        src="images/lipgloscherryswatch.jpeg"
        class="popup-thumb active"
        onclick="changeGlossShade(
        'Cherry',
        'images/lipgloss.jpeg',
        'Cherry shade with glossy shine.',
        this
        )">

        <span>Cherry</span>

    </div>

    <div class="popup-thumb-box">

        <img
        src="images/lipglosnudeswatch.jpeg"
        class="popup-thumb"
        onclick="changeGlossShade(
        'Nude',
        'images/lipgloss.jpeg',
        'Natural nude glossy finish.',
        this
        )">

        <span>Nude</span>

    </div>

    <div class="popup-thumb-box">

        <img
        src="images/lipglosrosepinkswatch.jpeg"
        class="popup-thumb"
        onclick="changeGlossShade(
        'Rose Pink',
        'images/lipgloss.jpeg',
        'Soft rose pink glossy shine.',
        this
        )">

        <span>Pink</span>

    </div>

    <div class="popup-thumb-box">

        <img
        src="images/lipglosshotredswatch.jpeg"
        class="popup-thumb"
        onclick="changeGlossShade(
        'Hot Red',
        'images/lipgloss.jpeg',
        'Bold hot red glossy finish.',
        this
        )">

        <span>Hot Red</span>

    </div>

    `;

}

document.getElementById("product-popup").style.display="flex";

} 
function closeProduct(){

    document.getElementById("product-popup").style.display="none";

}function changeVariant(name,image,description,element){

    document.getElementById("popup-image").src = image;

    document.getElementById("popup-description").innerText = description;

    document.querySelectorAll(".popup-thumb")
    .forEach(img=>img.classList.remove("active"));

    element.classList.add("active");

}function selectBodyVariant(name, element){

    bodySplashVariant = name;

    document.querySelectorAll(".body-option")
    .forEach(btn => btn.classList.remove("active"));

    element.classList.add("active");

}let selectedShade = "Cherry";
let selectedShadeImage = "images/lipgloscherryswatch.jpeg";

function selectShade(element){

    document
    .querySelectorAll(".shade-option")
    .forEach(item=>item.classList.remove("active"));

    element.classList.add("active");

    selectedShade = element.dataset.shade;

    selectedShadeImage = element.dataset.image;

}function changeGlossShade(name,image,description,element){

    document.getElementById("popup-image").src = image;

    document.getElementById("popup-description").innerText = description;

    document.querySelectorAll(".popup-thumb")
    .forEach(img=>img.classList.remove("active"));

    element.classList.add("active");

}

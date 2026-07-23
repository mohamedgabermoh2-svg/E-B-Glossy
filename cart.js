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

){

    let quantity = Number(

        btn.parentElement
        .querySelector(".qty")
        .innerText

    );

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

            image:image,

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

}



/* ================= WHATSAPP ================= */

function orderWhatsApp(){

    if(cart.length===0){

        showMessage(
            "Your cart is empty 🥲"
        );

        return;
    }

    let text =

`❤️ Hello E&B Glossy ❤️

I would like to order:

`;

let total = 0;

cart.forEach(item=>{

    let itemTotal =
    item.price *
    item.quantity;

    total += itemTotal;

    text +=

`🛍 ${item.name}

Quantity : ${item.quantity}
Price : ${item.price} EGP
Subtotal : ${itemTotal} EGP

`;

});

text +=

`━━━━━━━━━━
💰 Total : ${total} EGP

Thank you ❤️`;



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
let item=wishlist[index];

let existing=

cart.find(

p=>p.name===item.name

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

"Added To Cart 🛒"

);


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

        counter.innerText =
        cart.length;

    }

}



/* ================= RENDER CART ================= */

function renderCart(){

    container.innerHTML="";

    if(cart.length===0){

        container.innerHTML=

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



    cart.forEach((item,index)=>{

        container.innerHTML +=

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

            <p>

                Beauty Product ✨

            </p>

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

}



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

function addToCart(name,image){

    cart.push({

        name:name,

        image:image

    });

    localStorage.setItem(

        "cart",

        JSON.stringify(cart)

    );

    updateCartCount();

    showMessage(

        name +
        " added to cart ✨"

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

`Hello E&B Glossy ✨

I would like to order:

`;

    cart.forEach(item=>{

        text +=
        `• ${item.name}
`;

    });

    text +=
`
Thank you 🤍`;



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

}
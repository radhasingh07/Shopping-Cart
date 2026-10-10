// ===========================
// Product Data
// ===========================

const products = [

{
id:1,
name:"Wireless Headphones",
category:"Electronics",
price:2499,
image:"https://picsum.photos/300?random=1",
rating:4.8
},

{
id:2,
name:"Smart Watch",
category:"Electronics",
price:3999,
image:"https://picsum.photos/300?random=2",
rating:4.7
},

{
id:3,
name:"Casual T-Shirt",
category:"Fashion",
price:799,
image:"https://picsum.photos/300?random=3",
rating:4.5
},

{
id:4,
name:"Programming Book",
category:"Books",
price:699,
image:"https://picsum.photos/300?random=4",
rating:4.9
},

{
id:5,
name:"Coffee Mug",
category:"Home",
price:399,
image:"https://picsum.photos/300?random=5",
rating:4.4
},

{
id:6,
name:"Bluetooth Speaker",
category:"Electronics",
price:1899,
image:"https://picsum.photos/300?random=6",
rating:4.6
}

];

// ===========================
// Elements
// ===========================

const productsContainer=document.getElementById("products");

const cartItems=document.getElementById("cartItems");

const productCount=document.getElementById("productCount");

const cartCount=document.getElementById("cartCount");

const wishlistCount=document.getElementById("wishlistCount");

const totalPrice=document.getElementById("totalPrice");

// ===========================
// Variables
// ===========================

let cart=[];

let wishlist=[];

// ===========================
// Display Products
// ===========================

function displayProducts(){

productsContainer.innerHTML="";

products.forEach(product=>{

const card=document.createElement("div");

card.className="product";

card.innerHTML=`

<img src="${product.image}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<p>⭐ ${product.rating}</p>

<div class="price">

₹${product.price}

</div>

<button class="addCart">

🛒 Add to Cart

</button>

<button class="wishlist">

❤️ Wishlist

</button>

`;

productsContainer.appendChild(card);

// Add to Cart

card.querySelector(".addCart")

.addEventListener("click",()=>{

addToCart(product);

});

// Wishlist

card.querySelector(".wishlist")

.addEventListener("click",()=>{

addToWishlist(product);

});

});

productCount.textContent=products.length;

}

// ===========================
// Wishlist
// ===========================

function addToWishlist(product){

if(

wishlist.find(item=>item.id===product.id)

){

alert("Already in wishlist!");

return;

}

wishlist.push(product);

wishlistCount.textContent=

wishlist.length;

}

// ===========================
// Initialize
// ===========================

displayProducts();
// ===========================
// Add to Cart
// ===========================

function addToCart(product){

const existing = cart.find(item => item.id === product.id);

if(existing){

existing.quantity++;

}

else{

cart.push({

...product,

quantity:1

});

}

updateCart();

}

// ===========================
// Update Cart
// ===========================

function updateCart(){

cartItems.innerHTML="";

if(cart.length===0){

cartItems.innerHTML="<p>Your cart is empty.</p>";

calculateTotal();

return;

}

cart.forEach(item=>{

const div=document.createElement("div");

div.className="cart-item";

div.innerHTML=`

<div>

<h4>${item.name}</h4>

<p>

₹${item.price} × ${item.quantity}

</p>

</div>

<div>

<button class="minus">

➖

</button>

<button class="plus">

➕

</button>

<button class="remove">

🗑

</button>

</div>

`;

cartItems.appendChild(div);

// Increase

div.querySelector(".plus")

.addEventListener("click",()=>{

item.quantity++;

updateCart();

});

// Decrease

div.querySelector(".minus")

.addEventListener("click",()=>{

item.quantity--;

if(item.quantity<=0){

cart=cart.filter(

p=>p.id!==item.id

);

}

updateCart();

});

// Remove

div.querySelector(".remove")

.addEventListener("click",()=>{

cart=cart.filter(

p=>p.id!==item.id

);

updateCart();

});

});

cartCount.textContent=

cart.reduce(

(sum,item)=>sum+item.quantity,

0

);

calculateTotal();

}

// ===========================
// Calculate Price
// ===========================

function calculateTotal(){

const subtotal=

cart.reduce(

(sum,item)=>

sum+(item.price*item.quantity),

0

);

const tax=

subtotal*0.05;

const shipping=

cart.length>0

?

50

:

0;

const grand=

subtotal+tax+shipping;

document.getElementById(

"subtotal"

).textContent=

`₹${subtotal.toFixed(2)}`;

document.getElementById(

"tax"

).textContent=

`₹${tax.toFixed(2)}`;

document.getElementById(

"shipping"

).textContent=

`₹${shipping.toFixed(2)}`;

document.getElementById(

"grandTotal"

).textContent=

`₹${grand.toFixed(2)}`;

totalPrice.textContent=

`₹${grand.toFixed(2)}`;

}

// ===========================
// Checkout
// ===========================

document.getElementById("checkout")

.addEventListener("click",()=>{

if(cart.length===0){

alert("Your cart is empty!");

return;

}

alert("🎉 Order placed successfully!");

cart=[];

updateCart();

});

// ===========================
// Initialize Cart
// ===========================

updateCart();
// ===========================
// Search & Category Elements
// ===========================

const searchInput = document.getElementById("search");

const categorySelect = document.getElementById("category");

// ===========================
// Render Products
// ===========================

function renderProducts(list){

productsContainer.innerHTML="";

list.forEach(product=>{

const card=document.createElement("div");

card.className="product";

card.innerHTML=`

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<p>⭐ ${product.rating}</p>

<div class="price">

₹${product.price}

</div>

<button class="addCart">

🛒 Add to Cart

</button>

<button class="wishlist">

❤️ Wishlist

</button>

`;

productsContainer.appendChild(card);

card.querySelector(".addCart")

.addEventListener("click",()=>{

addToCart(product);

});

card.querySelector(".wishlist")

.addEventListener("click",()=>{

addToWishlist(product);

});

});

productCount.textContent=list.length;

}

// ===========================
// Live Search
// ===========================

searchInput.addEventListener("input",filterProducts);

// ===========================
// Category Filter
// ===========================

categorySelect.addEventListener("change",filterProducts);

// ===========================
// Filter Function
// ===========================

function filterProducts(){

const search=

searchInput.value.toLowerCase();

const category=

categorySelect.value;

const filtered=products.filter(product=>{

const matchName=

product.name

.toLowerCase()

.includes(search);

const matchCategory=

category==="all" ||

product.category===category;

return matchName && matchCategory;

});

renderProducts(filtered);

}

// ===========================
// Local Storage
// ===========================

function saveData(){

localStorage.setItem(

"shoppingCart",

JSON.stringify(cart)

);

localStorage.setItem(

"wishlist",

JSON.stringify(wishlist)

);

}

function loadData(){

const savedCart=

JSON.parse(

localStorage.getItem(

"shoppingCart"

)

);

const savedWishlist=

JSON.parse(

localStorage.getItem(

"wishlist"

)

);

if(savedCart){

cart=savedCart;

}

if(savedWishlist){

wishlist=savedWishlist;

wishlistCount.textContent=

wishlist.length;

}

updateCart();

}

// ===========================
// Improve Cart Functions
// ===========================

const oldAddCart=addToCart;

addToCart=function(product){

oldAddCart(product);

saveData();

};

const oldWishlist=addToWishlist;

addToWishlist=function(product){

oldWishlist(product);

saveData();

};

const oldUpdate=updateCart;

updateCart=function(){

oldUpdate();

saveData();

};

// ===========================
// Initialize
// ===========================

loadData();

renderProducts(products);
// ===========================
// Dark Mode
// ===========================

let darkMode=false;

const darkBtn=document.createElement("button");

darkBtn.textContent="🌙 Dark Mode";

darkBtn.style.marginLeft="10px";

darkBtn.style.padding="12px 18px";

darkBtn.style.border="none";

darkBtn.style.borderRadius="10px";

darkBtn.style.cursor="pointer";

darkBtn.style.background="#111827";

darkBtn.style.color="white";

document.querySelector(".controls")

.appendChild(darkBtn);

darkBtn.addEventListener("click",()=>{

darkMode=!darkMode;

if(darkMode){

document.body.style.background="#111827";

document.querySelector(".container")

.style.background="#1f2937";

darkBtn.textContent="☀ Light Mode";

}

else{

document.body.style.background="linear-gradient(135deg,#0f172a,#2563eb,#38bdf8,#7dd3fc)";

document.querySelector(".container")

.style.background="rgba(255,255,255,.12)";

darkBtn.textContent="🌙 Dark Mode";

}

});

// ===========================
// Toast Notification
// ===========================

const toast=document.createElement("div");

toast.style.position="fixed";

toast.style.bottom="30px";

toast.style.right="30px";

toast.style.background="#22c55e";

toast.style.color="white";

toast.style.padding="15px 20px";

toast.style.borderRadius="10px";

toast.style.display="none";

toast.style.zIndex="999";

document.body.appendChild(toast);

function showToast(message){

toast.textContent=message;

toast.style.display="block";

setTimeout(()=>{

toast.style.display="none";

},2000);

}

// ===========================
// Improve Add To Cart
// ===========================

const oldAdd=addToCart;

addToCart=function(product){

oldAdd(product);

showToast(product.name+" added to cart!");

};

// ===========================
// Improve Wishlist
// ===========================

const oldWish=addToWishlist;

addToWishlist=function(product){

if(wishlist.find(item=>item.id===product.id)){

showToast("Already in Wishlist");

return;

}

oldWish(product);

showToast(product.name+" added to wishlist!");

};

// ===========================
// Checkout Animation
// ===========================

const checkout=document.getElementById("checkout");

checkout.addEventListener("click",()=>{

if(cart.length===0){

showToast("Cart is Empty!");

return;

}

checkout.disabled=true;

checkout.textContent="Processing...";

setTimeout(()=>{

showToast("Order Placed Successfully 🎉");

cart=[];

updateCart();

checkout.disabled=false;

checkout.textContent="Proceed to Checkout";

},2000);

});

// ===========================
// Wishlist Dashboard
// ===========================

function updateDashboard(){

productCount.textContent=

products.length;

wishlistCount.textContent=

wishlist.length;

cartCount.textContent=

cart.reduce(

(sum,item)=>sum+item.quantity,

0

);

}

const oldCartUpdate=updateCart;

updateCart=function(){

oldCartUpdate();

updateDashboard();

saveData();

};

updateDashboard();

// ===========================
// Loading Animation
// ===========================

window.addEventListener("load",()=>{

document.body.style.opacity="0";

setTimeout(()=>{

document.body.style.transition="1s";

document.body.style.opacity="1";

},100);

});

// ===========================
// Keyboard Shortcuts
// ===========================

document.addEventListener("keydown",(event)=>{

// Ctrl + F

if(event.ctrlKey && event.key==="f"){

event.preventDefault();

searchInput.focus();

}

// Escape

if(event.key==="Escape"){

searchInput.value="";

categorySelect.value="all";

renderProducts(products);

}

});

// ===========================
// Initialize
// ===========================

updateDashboard();

renderProducts(products);

updateCart();
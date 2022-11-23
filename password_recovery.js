const password = document.querySelector('#password');
const email = document.querySelector('#email');
const form = document.querySelector('form');
const fa_eye = document.querySelector('.fa-eye');
const  fa_eye_slash = document.querySelector('.fa-eye-slash');
const  ul_overlay = document.querySelector('.ul_overlay');
const  passwordAlert = document.querySelector('.passwordAlert');
const  emailAlert = document.querySelector('.emailAlert');
const  fa_cart_shopping = document.querySelector('.fa-cart-shopping');
const  cart_container = document.querySelector('.cart_container');
const  cart_container_overlay = document.querySelector('.cart_container_overlay');
const  remove_cart = document.querySelector('.remove_cart');
const  login_buy_alert = document.querySelector('.login_buy_alert');
const  fa_magnifying_glass = document.querySelector('.fa-magnifying-glass');
const  fa_user = document.querySelector('.fa-user');
const  messageContent = document.querySelector('.message .messageContent');


let cart = document.querySelector('.cart_container .cart');
let total_price_items = document.querySelector('.total_price_items');
let num_of_p_found = document.querySelector('.num_of_p_found')
let in_cart_items_number = document.querySelector('#in_cart_items_number');

let goBack_to_top = document.querySelector('.goBack_to_top');
let v_bar = document.querySelector('.v_bar');


// ! ####################################################### vertivcal scoll bar
window.addEventListener('scroll', () => {
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollheight = document.documentElement.scrollTop ;

    v_bar.style.width = `${(scrollheight / height) * 100}%`
})


// ! ##################################################### display fo back to top arrow
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        goBack_to_top.style.display = 'block';
    }else {
        goBack_to_top.style.display = 'none';
    }
})

goBack_to_top.onclick = () => {
    window.scrollTo(0,0);
}
// ! ################################## show nav bar
document.querySelector('.fa-bars').onclick = () => {
    nav_bar.classList.toggle('show_nav_bar');
    ul_overlay.classList.toggle('show_ul_overlay');
}

document.querySelector('.fa-circle-xmark').onclick = () => {
    nav_bar.classList.remove('show_nav_bar');
    ul_overlay.classList.remove('show_ul_overlay');
};

// ! ################################ show cart
fa_cart_shopping.addEventListener('click', () => {
    cart_container.classList.toggle('show_cart');
    cart_container_overlay.classList.toggle('show_cart');
})

remove_cart.addEventListener('click', () => {
    cart_container.classList.remove('show_cart');
    cart_container_overlay.classList.toggle('show_cart');
})

document.addEventListener('click', (e) => {
    if (e.target.className == 'cart_container_overlay show_cart') {
        cart_container.classList.remove('show_cart');
        cart_container_overlay.classList.toggle('show_cart');
    }
})


// ! ########################################### validate eamil and password

form.addEventListener('submit', (e) => {
    let emailRegex = /\w+@\w+.(net|org|com|ca|uk|ma)/gi
    if (email.value === '') {
        emailAlert.textContent = 'Email field is empty';
        e.preventDefault();
    }else if (!email.value.match(emailRegex)) {
        emailAlert.textContent = 'Make sure to enter a valid email address';
        e.preventDefault();
    }
    else if (password.value === '') {
        passwordAlert.textContent = 'Password field is ampty';
        e.preventDefault();
    }else if (password.value.length <= 8) {
        passwordAlert.textContent = 'Make sure to enter 8 or more character';
        e.preventDefault();
    }
})


// ! ###################### display and remove disavailability for users to search products
fa_magnifying_glass.addEventListener('click', () => {
    messageContent.textContent = 'You can not purshase products while you are in login section';
    login_buy_alert.classList.add('display_buy_alert');
})

document.addEventListener('click', (e) => {
    if (e.target.className == 'login_buy_alert display_buy_alert') {
        login_buy_alert.classList.remove('display_buy_alert');
    }
})

fa_user.addEventListener('click', function (){
    messageContent.textContent = 'You are already in login section';
    login_buy_alert.classList.add('display_buy_alert');
})










// ! ###################################################### add products to cart
let cartArray = JSON.parse(localStorage.getItem('cart')) || []

function add_products_toCart_from_all_json(id) {    
    fetch('all.json')
    .then( res => res.json())
    .then( data => {
        if ( cartArray.some( ele => ele.pId === id)) {
            alert('product already exists')
        }else {
            let item = data.find( (ele) => ele.pId === id);
            cartArray.push({
                ...item,
                number_of_units: 1
            });
        }
        updateCart()
    })
    displayCartOnclick()
}

function add_products_to_cart(id) {    
    fetch('mix.json')
    .then( res => res.json())
    .then( data => {
        if ( cartArray.some( ele => ele.pId === id)) {
            alert('product already exists')
        }else {
            let item = data.find( (ele) => ele.pId === id);
            cartArray.push({
                ...item,
                number_of_units: 1
            });
        }
        updateCart()
    })
    displayCartOnclick()
}

function updateCart() {
    saveProducts();
    totalPriceItems()
    localStorage.setItem('cart', JSON.stringify(cartArray))
}

function saveProducts() {
    let items = cartArray.map( (ele) => {
        return `
        <div class="product">
            <img src=${ele.imgSrc} alt="">
            <div class="pPrice">${ele.pPrice}</div>
            <div class="qauntity_wrapper">
                <div class="inc operation" onclick="changeUnits('inc', ${ele.pId})">-</div>
                <div class="numOfItems">${ele.number_of_units}</div>
                <div class="dec operation" onclick="changeUnits('dec', ${ele.pId})">+</div>
            </div>
            <i class="fa-solid fa-trash" onclick="deleteProduct(${ele.pId})"></i>
        </div>
        `
    }).join('')
    cart.innerHTML = items;
    totalPriceItems()
}
saveProducts()


function deleteProduct(id) {
    cartArray = cartArray.filter(ele => ele.pId !== id)
    updateCart()
}

function changeUnits(action, id) {
    cartArray = cartArray.map( (ele) => {
        let number_of_units = ele.number_of_units

        if (ele.pId === id) {
            if (action === 'dec' && number_of_units < ele.inStock) {
                number_of_units++
            }else if (action === 'inc' && number_of_units > 1) {
                number_of_units--
            }
        }
        return {
            ...ele,
            number_of_units: number_of_units
        }
    });
    updateCart()
}

function totalPriceItems() {
    let returnTotalArray = cartArray.map( (item) => {
        return item.pPrice * item.number_of_units 
    })
    
    let totalPrice = returnTotalArray.reduce( (a, b) => {
        return a + b
    }, 0);

    let total_items_array = cartArray.map( (ele) => ele.number_of_units);

    let total_items = total_items_array.reduce( (a, b) => {
        return a + b
    }, 0)
    total_price_items.innerHTML = `Total price ${totalPrice} / ${total_items} products in cart`;
    in_cart_items_number.textContent =  total_items;
}


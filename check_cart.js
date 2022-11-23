let fa_cart_shopping = document.querySelector('.fa-cart-shopping');
let remove_cart = document.querySelector('.remove_cart');
let cart_container = document.querySelector('.cart_container');
let cart_container_overlay = document.querySelector('.cart_container_overlay');
let goBack_to_top = document.querySelector('.goBack_to_top');
let v_bar = document.querySelector('.v_bar');
let nav_bar =  document.querySelector('header ul');
let ul_overlay = document.querySelector('.ul_overlay');
let suggestions = document.querySelector('.suggestions');
let searched_products = document.querySelector('.searched_products');
let Search = document.querySelector('.Search');
let searched_products_conatiner = document.querySelector('.searched_products_conatiner');
let cart = document.querySelector('.cart_container .cart');
let total_price_items = document.querySelector('.total_price_items');
let check_total_items = document.querySelector('.check_total_items');
let check_total_price = document.querySelector('.check_total_price');
let check_sub_total_price = document.querySelector('.check_sub_total_price');







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


// ! ################################ show cart
fa_cart_shopping.addEventListener('click', () => {
    cart_container.classList.toggle('show_cart');
    cart_container_overlay.classList.toggle('show_cart');
})

remove_cart.addEventListener('click', () => {
    cart_container.classList.remove('show_cart');
    cart_container_overlay.classList.toggle('show_cart');
})

document.querySelector('.fa-magnifying-glass').addEventListener('click', () => {
    document.querySelector('.searchBar').style.top = '0';
});


// ! ################################## show nav bar
document.querySelector('.fa-bars').onclick = () => {
    nav_bar.classList.toggle('show_nav_bar');
    ul_overlay.classList.toggle('show_ul_overlay');
}

document.querySelector('.fa-circle-xmark').onclick = () => {
    nav_bar.classList.remove('show_nav_bar');
    ul_overlay.classList.remove('show_ul_overlay');
};


// ! ################################################### show search bar
document.querySelector('.fa-xmark').addEventListener('click', () => {
    document.querySelector('.searchBar').style.top = '-100%';
    searched_products_conatiner.classList.remove('dispay_searched_products');
    suggestions.style.display = 'none';
})

Search.addEventListener('input', () => {
    if (Search.value !== '') {
        searched_products_conatiner.classList.add('dispay_searched_products');
        suggestions.style.display = 'block';
    }else {
        searched_products_conatiner.classList.remove('dispay_searched_products');
        suggestions.style.display = 'none';
    }
})



// ! ################################################### show search bar
document.querySelector('.fa-xmark').addEventListener('click', () => {
    document.querySelector('.searchBar').style.top = '-100%';
    searched_products_conatiner.classList.remove('dispay_searched_products');
    suggestions.style.display = 'none';
})

Search.addEventListener('input', () => {
    if (Search.value !== '') {
        searched_products_conatiner.classList.add('dispay_searched_products');
        suggestions.style.display = 'block';
    }else {
        searched_products_conatiner.classList.remove('dispay_searched_products');
        suggestions.style.display = 'none';
    }
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
            <div class="pPrice">${ele.pPrice}$</div>
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
saveProducts();

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
    total_price_items.innerHTML = `Total price <strong>${totalPrice}$</strong>  /<strong> ${total_items}</strong> products in cart`;
    in_cart_items_number.textContent = total_items

    check_total_price.textContent = `${totalPrice}$`
    check_sub_total_price.textContent = `${totalPrice}$`

    if (total_items <= 1) { 
        check_total_items.textContent = `${total_items} item shipping`;
    }else {
        check_total_items.textContent = `${total_items} items shipping`;
    }
}


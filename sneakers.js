const fa_bars = document.querySelector('.fa-bars');
const fa_circle_xmark = document.querySelector('.fa-circle-xmark');
const ul_overlay = document.querySelector('.ul_overlay');
const nav_bar = document.querySelector('#nav_bar');
const fa_cart_shopping = document.querySelector('.fa-cart-shopping');
const cart_container = document.querySelector('.cart_container');
const cart_container_overlay = document.querySelector('.cart_container_overlay');
const remove_cart = document.querySelector('.remove_cart');
const products = document.querySelector('.seneakers_product .products');
const Search = document.querySelector('.Search');
const searched_products_conatiner = document.querySelector('.searched_products_conatiner');
const suggestions = document.querySelector('.suggestions');
const searched_products = document.querySelector('.searched_products');
const num_of_p_found = document.querySelector('.num_of_p_found');
let total_price_items = document.querySelector('.total_price_items');
let in_cart_items_number = document.querySelector('#in_cart_items_number');
let cart = document.querySelector('.cart_container .cart');
let filter_btn = document.querySelector('.filter button');
let filter_bar = document.querySelector('.filter_bar');
let remove_filter_bar = document.querySelector('.filter_bar .fa-times');
let dropdown = document.querySelector('.dropdown');
let relevance = document.querySelector('.relevance');
let select = document.querySelector('.select');
let num_of_products_found_in_filter = document.querySelector('.num_of_products_found_in_filter');
let colorBtns = document.querySelectorAll('.colors button');
let range = document.getElementById('range');
let rangeLabel = document.querySelector('.rangeLabel');
let styleBtns = document.querySelectorAll('.style button');
let sizesBtns = document.querySelectorAll('.sizes button');
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


fa_bars.onclick = () => {
    ul_overlay.classList.toggle('show_ul_overlay');
    nav_bar.classList.toggle('show_nav_bar');
} 

fa_circle_xmark.onclick = () => {
    nav_bar.classList.remove('show_nav_bar');
    ul_overlay.classList.remove('show_ul_overlay');
} 

// ! ################################ show and remove cart
fa_cart_shopping.addEventListener('click', () => {
    cart_container.classList.toggle('show_cart');
    cart_container_overlay.classList.toggle('show_cart');
})
remove_cart.addEventListener('click', () => {
    cart_container.classList.remove('show_cart');
    cart_container_overlay.classList.toggle('show_cart');
})

// ! ################################################### show search bar
document.querySelector('.fa-magnifying-glass').addEventListener('click', () => {
    document.querySelector('.searchBar').style.top = '0';
})

// ! ################################################### show search bar
document.querySelector('.searchBar .fa-xmark').addEventListener('click', () => {
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

// ! ############################## display filter bar 
filter_btn.addEventListener('click', () => {
    filter_bar.classList.toggle('display_filter_bar')
});

remove_filter_bar.addEventListener('click', () => {
    filter_bar.classList.remove('display_filter_bar');
})



// !############################################################### home.html products 
fetch('sneakers.json')
.then( res => res.json())
.then( data => {
    select.addEventListener('input', () => {
        let sortProducts = data.sort((pre, post) => {
            if (select.value === 'from_a_to_z') {
                if (pre.pName < post.pName) {
                    return -1
                }
            }else if (select.value === 'from_z_to_a') {
                if (pre.pName > post.pName) {
                    return -1
                }
            }else if (select.value === 'low_to_high') {
                if (pre.pPrice < post.pPrice) {
                    return -1
                }
            }else if (select.value === 'high_to_low') {
                if (pre.pPrice > post.pPrice) {
                    return -1
                }
            }
        })
        displayHomeProducts(sortProducts);
        num_of_products_found_in_filter.textContent = `${sortProducts.length} products found`;
    })
    filterByColors(data);
    filterByPrice(data);
    filterByStyle(data);
    filterBySize(data);
    displayHomeProducts(data);
})


// ? filter products by color
function filterByColors(data) {
    colorBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let targetFilterBtn = e.currentTarget.dataset.color
            let filterProductsByColor = data.filter( (item) => {
                return item.color === targetFilterBtn
            });
            num_of_products_found_in_filter.textContent = `${filterProductsByColor.length} products found`;
            displayHomeProducts(filterProductsByColor);
        })
    })
}

// ? filter products by price
function filterByPrice(data) {
    range.oninput = () => {
        rangeLabel.textContent = `Min = 30$ - Max = ${range.value}$`;
        let filterProductsByPrice = data.filter( (item) => {
            return item.pPrice <= range.value
        })
        displayHomeProducts(filterProductsByPrice);
        num_of_products_found_in_filter.textContent = `${filterProductsByPrice.length} products found`;
    }
}
filterByPrice();

// ? filter products by style
function filterByStyle(data) {
    styleBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            let targetFilterBtn = e.currentTarget.dataset.style.toLowerCase()
            console.log(targetFilterBtn)
            let filterProductsByStyle = data.filter( (item) => {
                return item.style === targetFilterBtn
            });
            num_of_products_found_in_filter.textContent = `${filterProductsByStyle.length} products found`;
            displayHomeProducts(filterProductsByStyle);
        })
    })
}

// ? filter products by size 

function filterBySize(data) {
    sizesBtns.forEach( (btn) => {
        btn.addEventListener('click', (e) => {
            let targetBtn = +e.currentTarget.textContent
            let result = data.map( (ele) => {
                return ele
            });
            let filter = result.filter((ele) => {
                return ele.sizesAvailable <= targetBtn
            })
            console.log(filter);
            displayHomeProducts(filter);
        })
    })
}

// ? display products
function displayHomeProducts(data) {
    let productItems = data.map( (item) => {
        return `
        <div class="product">
            <div class="discount">-67</div>
            <div class="tooltip_wrapper">
                <i class="fa-regular fa-heart" onclick="displayWishListAlert()"></i>
            </div>
            <img src=${item.imgSrc} onclick="previewProducts(${item.pId})" alt="">
            <div class="info">
                <div class="price_name">
                    <div class="pName">${item.pName}</div>
                    <div class="pPrice">${item.pPrice}</div>
                </div>
                <i class="fa-solid fa-lock" onclick="add_products_to_cart_from_sneakers(${item.pId})"></i>
            </div>
        </div>
    
        `
    }).join('')
    products.innerHTML = productItems
    displayTooltip(document.querySelectorAll('.products .tooltip_wrapper'))
}

function displayTooltip(ele) {
    let div = document.createElement('div')
    ele.forEach( (item) => {
        item.addEventListener('mouseover', (e) => {
            let targetHeart = e.currentTarget;
            div.className = 'wishlistTooltip';
            div.textContent = 'Add to wishlist';
            div.style.display = 'block'
            targetHeart.append(div);
        })
    })
    ele.forEach( (item) => {
        item.addEventListener('mouseleave', (e) => {
            div.style.display = 'none'
        })
    })
}







// !  ################################### display All Products.json
function displayAllProducts(data){
    let searchedItems = data.map( (item) => {
        return `
            <div class="product_item">
                <img src=${item.imgSrc} onclick="previewProducts(${item.pId})" alt="">
                <div class="pName">${item.pName}</div>
                <div class="pPrice">${item.pPrice}$</div>
                <i class="fa-solid fa-lock" onclick="add_products_toCart_from_all_json(${item.pId})"></i>
            </div>
            `
    }).join('')
    searched_products.innerHTML = searchedItems;
}

// ! fetch, search, and filter all products 
Search.addEventListener('input', () => {
    fetch('all.json')
    .then( res => res.json())
    .then( (data) => {
        let filteredProducts = data.filter( (item) => {
            return item.pName.toLowerCase().match(Search.value.toLowerCase())
        })
        
        let a = filteredProducts.map( ele => {
            return `<p onclick="add_suggestion_to_input('${ele.pName}')">${ele.pName}</p>`;
        }).join('')
        suggestions.innerHTML = a

        displayAllProducts(filteredProducts);
        num_of_p_found.textContent = `${filteredProducts.length} results found`;
    })
    displayCartOnclick()
})

function add_suggestion_to_input(pName) {
    Search.value = pName;
    suggestions.style.display = 'none';
}


// ! ###################################################### add products to cart
let cartArray = JSON.parse(localStorage.getItem('cart')) || []

function add_products_toCart_from_all_json(id) {    
    fetch('sneakers.json')
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

function add_products_to_cart_from_sneakers(id) {    
    fetch('sneakers.json')
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
    total_price_items.innerHTML = `Total price ${totalPrice}$ / ${total_items} products in cart`;
    in_cart_items_number.textContent =  total_items
}

function displayCartOnclick() {
    cart_container.classList.toggle('show_cart')
    setTimeout(() => {
        cart_container.classList.remove('show_cart')
    }, 1000);

}

// ! ######################### wishLis tAlert
let removeWishListAlert = document.querySelector('.wishListAlert .fa-times');
let wishListAlert = document.querySelector('.wishListAlert');
function displayWishListAlert() {
    wishListAlert.classList.add('show_sign_in_alert');
}

removeWishListAlert.onclick = () => {
    wishListAlert.classList.remove('show_sign_in_alert');
}








let product_preview_model_cont = document.querySelector('.product_preview_model_cont');

function previewProducts(id) {
    fetch('all.json')
    .then( res => res.json() )
    .then( (data) => {
        let targetProduct = data.find( (item) => item.pId === id);
        product_preview_model_cont.classList.add('show_product_prview_model');

        product_preview_model_cont.innerHTML = `
        <div class="product_preview_model">
        <i class="fa fa-times" onclick="removeModel()"></i> 
        <div class="product_preview_model_sub_cont">
            <i class="fa-regular fa-heart"></i>
            <div class="left">
                <img src=${targetProduct.imgSrc} onclick="portrayImage()" class="bigImage" alt="">
                <button class="goFullScreen" onclick="openFullscreen()">Go full screen mode</button>
            </div>
            <div class="right right_scollbar">
                <i class="fa-solid fa-chevron-down" onclick="rightSideScroll()"></i>
                <h3 class="product_name">${targetProduct.pName} </h3>
                <div class="product_relation">${targetProduct.category} ${targetProduct.pName} </div>
                <h4 class="product_price">${targetProduct.pPrice}$</h4>
                <img src=${targetProduct.imgSrc} class="smallImage" alt="">
                <div class="sizes">
                    <button type="button" title="37">37</button>
                    <button type="button" title="38">38</button>
                    <button type="button" title="39">39</button>
                    <button type="button" title="40">40</button>
                    <button type="button" title="41">41</button>
                    <button type="button" title="42">42</button>
                    <button type="button" title="43">43</button>
                    <button type="button" title="44">44</button>
                    <button type="button" title="45">45</button>
                    <button type="button" title="46">46</button>
                    <button type="button" title="47">47</button>
                </div>
                <div class="basket">
                    <button class="previewAddToCart" onclick="addPreviewProductToCart(${targetProduct.pId})">Add to cart</button>
                </div>
                <div class="description accordion">
                    <h6>Description</h6>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi temporibus fugiat consequatur a iste quo possimus officiis, ullam maiores nulla ea nostrum quae, neque reprehenderit accusantium! Quibusdam in accusamus quos!</p>
                </div>
                <div class="product_details accordion">
                    <h6>Product details</h6>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea nulla doloremque perspiciatis quidem voluptatum delectus suscipit dolorum facilis adipisci doloribus.</p>
                </div>
                <div class="reviewing accordion">
                    <h6>Reviewing</h6>
                    <p>reviewing</p>
                </div>
                <div class="cleaning accordion">
                    <h6>Cleaning</h6>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quia.</p>
                </div>
            </div>
        </div>
        <!-- ! ##################################### foooter  -->
        <!-- ? subscribe_section -->
        <div class="subscribe_section">
            <div class="left">
                <h3>Want to get 15% off discount?</h3>
                <h5>Subscribe to our newsletter and get it</h5>
            </div>
            <div class="right">
                <form>
                    <input type="text" placeholder="Enter your email address">
                    <input type="submit" value="Subscribe">
                    <div class="terms_accpetance">
                        <input type="checkbox">
                        <span>I ACCEPT THE CONDITIONS OF TREATMENT AND USE OF MY DATA</span>
                    </div>
                </form>
            </div>
        </div>
    
        <!-- ? footer  -->
    
        <footer>
            <div>
                <h5>REDOX</h5>
                <p>About us</p>
                <p>Sustainability and commitment</p>
                <p>Ordering for companies</p>
                <p>Design process</p>
                <p>Blog</p>
                <p>Partnerships</p>
            </div>
            <div>
                <h5>Information</h5>
                <p>Help center</p>
                <p>Legal notice and privacy policy</p>
            </div>
            <div>
                <h5>Buy guide</h5>
                <p>Before buying</p>
                <p>Shipping</p>
                <p>Returns</p>
                <p>Choose your size</p>
                <p>Frequently asked questions</p>
            </div>
            <div>
                <h5>Contact us</h5>
                <p><i class="fa-solid fa-phone"></i><span>+212 615149968</span></p>
                <p><i class="fa-solid fa-envelope"></i><span>ridaelkouri@gmail.com</span></p>
                <p>Monday to Suturday, from 09h to 18h.</p>
                <p>Choose your size</p>
                <p>© Copyright MASCARO DIGITAL PROJECTS S.L. 2022. All rights reserved.</p>
            </div>
        </footer>
    
        <!-- ? follow us -->
        <div class="follow_us">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-twitter"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-linkedin"></i>
        </div>
    
    </div>
        `
        accordionDropDown()
    });
}


function addPreviewProductToCart(id) {
    fetch('all.json')
    .then( res => res.json() )
    .then( (data) => {
      if ( cartArray.some( item => item.pId === id)) {
            alert('product already exists')
        }else {
            let item = data.find( (item) => item.pId === id);
            cartArray.push({
                ...item,
                number_of_units: 1
            });
        }
        updateCart();
    });
    displayCartOnclick()
}


function removeModel() {
    product_preview_model_cont.classList.remove('show_product_prview_model');
}

function openFullscreen() {
    let goFullScreen = document.querySelector('.goFullScreen');
    if (goFullScreen.textContent === 'Go full screen mode') {
        if (document.documentElement.requestFullscreen()) {
            document.documentElement.requestFullscreen();
            goFullScreen.textContent = 'Exit full screen mode';
        }
    }else if (goFullScreen.textContent === 'Exit full screen mode') {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            goFullScreen.textContent = 'Go full screen mode'
        }
    }
}

const portrait = document.querySelector('.portrait');
function portrayImage() {
    const portraitImage = document.querySelector('.portrait img');  
    const bigImage = document.querySelector('.bigImage');  
    portraitImage.src = bigImage.src
    portrait.classList.add('showImagePrortait');
}

const removePortrait = document.querySelector('.portrait .fa-times');
removePortrait.onclick = () => {
    portrait.classList.remove('showImagePrortait');
}

let imageWrapper = document.querySelector('.img_wrapper')
let zoomedImage = document.querySelector('.img_wrapper img')
function zoomPortraitImage() {
    let x, y, width, height;

    imageWrapper.addEventListener('mouseenter', () => {
        const size = imageWrapper.getBoundingClientRect();
        x = size.x;
        y = size.y;
        width = size.width;
        height = size.height;
    });

    imageWrapper.addEventListener('mousemove', (e) => {
        const horizontal = (e.clientX  - x) / width * 100
        const vertical = (e.clientY  - y) / height * 100
        imageWrapper.style.setProperty('--x', horizontal + '%')
        imageWrapper.style.setProperty('--y', vertical + '%')
    })
}
zoomPortraitImage()

function rightSideScroll() {
    let rightside = document.querySelector('.right_scollbar');
    let fa_chevron_down = document.querySelector('.fa-chevron-down');
    rightside.scrollBy(0, 400);
    if (!fa_chevron_down.classList.contains('rotate_arrow')) {
        fa_chevron_down.classList.add('rotate_arrow');
    }else {
        fa_chevron_down.classList.remove('rotate_arrow');
        rightside.scrollBy(0, -400);
    }
}

function accordionDropDown() {
    document.querySelectorAll('.accordion').forEach( (accordion) => {
        accordion.addEventListener('click', (e) => {
            e.currentTarget.classList.toggle('accordion_toggle')
        })
    })
}


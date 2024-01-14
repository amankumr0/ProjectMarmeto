let cart = {
    products: []
};

let myProduct = {}

fetch("./product.json")
    .then(data => data.json())
    .then(data => {
        myProduct = data.products;
        let str = ``;
        data.products.forEach(each => {
            str += `<div class="single-product">
                <div class="image-div">
                    <img class="product-image" src="${each.image}" alt="chair1">
                </div>
                <div class="product-des">
                    <div class="titlt-price">
                        <p class="product-title">${each.title}</p>
                        <div class="price-sec">
                            <p class="price paisa">$${each.price}</p>
                            ${(each.compare_at_price) ? `<p class="compared-price paisa">
                                $ ${each.compare_at_price}
                            </p>`: ''}
                        </div>
                    </div>
                    <i class='bx bx-cart-alt cart-icon' data-xvalue= ${each.id} onClick="addCart(this);"></i>
                </div>
            </div>`
        })
        document.querySelector(".product").innerHTML = str;
    });

function addCart(ref) {
    myProduct.forEach(data => {
        if (data.id == ref.dataset.xvalue) {
            if (cart.products.length == 0) {
                cart.products.push({ ...data, quantity: 1 })
            } else {
                let flag = false
                cart.products.forEach((product, index) => {
                    if (product.id == ref.dataset.xvalue && product.quantity) {
                        flag = true
                        cart.products[index].quantity += 1;
                    }
                })
                if (!flag) {
                    cart.products.push({ ...data, quantity: 1 })
                }
            }

        }
    })
    console.log(cart)
    cartAdd();
}

function cartAdd(val = null) {
    let product = [];
    if (typeof val == "number") {
        cart.products.forEach(pro => {
            if (pro.price <= val) {
                product.push(pro)
            }
        })
    }
    else {
        product = (val) ? (val == "ASC" ? cart.products.sort((a, b) => a.price - b.price) : cart.products.sort((a, b) => b.price - a.price)) : cart.products
    }
    let price = 0, tot_cart_item = 0;

    let str = ``;
    product.forEach(each => {
        price += each.price * each.quantity;
        tot_cart_item += each.quantity;

        str += `<div class="single-product">
                <div class="image-div">
                    <img class="product-image" src="${each.image}" alt="chair1">
                </div>
                <div class="product-des">
                    <div class="titlt-price">
                        <p class="product-title">${each.title}</p>
                        <div class="price-sec">
                            <p class="price paisa">$ ${each.price * each.quantity}</p>
                            <p class="compared-price paisa">
                                $ ${each.compare_at_price}
                            </p>
                        </div>
                    </div>
                    <span class="quantity">${each.quantity}</span>
                     <p class="cross" data-yvalue= ${each.id} onClick="removeCart(this);">X
                    </p>
                </div>
            </div>`
    })
    document.querySelector(".cart-item").innerHTML = str
    document.querySelector(".price-avg").textContent = `$${parseFloat(price / tot_cart_item).toFixed(2)}`
    document.querySelector(".price-total").textContent = `$${price}`
}

function removeCart(ref) {
    let arr = []
    cart.products.map(data => {
        if (data.id == ref.dataset.yvalue) {
            if (data.quantity > 1) {
                arr.push({ ...data, quantity: data.quantity - 1 })
            }
        } else {
            arr.push(data)
        }
    })
    console.log(arr)
    cart.products = arr;
    document.querySelector(".cart-item").innerHTML = ''
    cartAdd();
}

function clearCart() {
    cart.products = []
    document.querySelector(".cart-item").innerHTML = "";
    document.querySelector(".price-avg").textContent = `$0.00`
    document.querySelector(".price-total").textContent = `$0.00`
}


document.querySelector('input[name="filter-bar"]').addEventListener("keypress",
    function (e) {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault()
        }
    })

document.querySelector('input[name="filter-bar"]').addEventListener("click", function (e) {
    e.target.value = ""
})

document.querySelector("#sort-by").addEventListener("change", (e) => {
    console.log(e.target.value)
    cartAdd(e.target.value)
})

document.querySelector(".filter-form").addEventListener('submit', (e) => {
    e.preventDefault();
    const value = document.querySelector('input[name="filter-bar"]').value;
    cartAdd(Number(value))
    document.querySelector('input[name="filter-bar"]').value = ""
})











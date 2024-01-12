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
                        <p class="product-title">${each.title}</h>
                        <div class="price-sec">
                            <p class="price paisa">$ ${each.price}</p>
                            <p class="compared-price paisa">
                                $ ${each.compare_at_price}
                            </p>
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
            // console.log(data)
            if (cart.products.length == 0) {
                // console.log({ ...data, quantity: 1 })
                cart.products.push({ ...data, quantity: 1 })
                console.log(cart)
            } else {
                let flag = false
                cart.products.forEach((product, index) => {
                    if (product.id == ref.dataset.xvalue && product.quantity) {
                        flag = true
                        console.log(ref.dataset.xvalue)
                        cart.products[index].quantity += 1;
                    }
                })
                if (!flag) {
                    cart.products.push({ ...data, quantity: 1 })
                    console.log(cart)
                }
            }

        }
    })
    console.log(cart)
    cartAdd();
}

function cartAdd() {
    let str = ``;
    cart.products.forEach(each => {

        str += `<div class="single-product">
                <div class="image-div">
                    <img class="product-image" src="${each.image}" alt="chair1">
                </div>
                <div class="product-des">
                    <div class="titlt-price">
                        <p class="product-title">${each.title}</p>
                        <div class="price-sec">
                            <p class="price paisa">$ ${each.price}</p>
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

        document.querySelector(".cart-item").innerHTML = str
    })
}

function removeCart(ref) {
    console.log(ref)
    console.log(ref.dataset.yvalue)
    console.log(cart.products)
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








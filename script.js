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
    console.log(myProduct)
    console.log(ref.dataset.xvalue)
    myProduct.forEach(data => {
        if (data.id == ref.dataset.xvalue) {
            cart.products.push(data)
        }
    })
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
                        <p class="product-title">${each.title}</h>
                        <div class="price-sec">
                            <p class="price paisa">$ ${each.price}</p>
                            <p class="compared-price paisa">
                                $ ${each.compare_at_price}
                            </p>
                        </div>
                    </div>
                     <p class="cross" data-yvalue= ${each.id} onClick="removeCart(this);">X
                    </p>
                </div>
            </div>`

        document.querySelector(".cart-item").innerHTML = str
    })
}

function removeCart(ref) {
    console.log(ref.dataset.yvalue)
    console.log(cart.products)
    let arr = []
    arr = cart.products.map(data => {
        if (data.id != ref.dataset.xvalue) {
            arr.push(data)
        }
    })
    console.log(arr)
    cart.products = arr;
    document.querySelector(".cart-item").innerHTML = ''
    cartAdd();
}








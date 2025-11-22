    //--API--
import axios from 'axios';
const apiPath = "wenwow";
const apiUid = "VZEWsarcR3goDSuLLZoha2K4EDj2";
const baseUrl= "https://livejs-api.hexschool.io";
const getProduct =`${baseUrl}/api/livejs/v1/customer/${apiPath}/products`;
const getCart =`${baseUrl}/api/livejs/v1/customer/${apiPath}/carts`;
const postCart =`${baseUrl}/api/livejs/v1/customer/${apiPath}/carts`;
const deleteCart =`${baseUrl}/api/livejs/v1/customer/${apiPath}/carts`;
    //--DATA--
let productData =[];
let cartData =[];

    //--html DOM--
const productList = document.querySelector('#productList');
const productFilter = document.querySelector('#productFilter');
const cratList = document.querySelector('#cratList');
const cartTotalPrice = document.querySelector('#cartTotalPrice');
let cartTotalPriceData =0;
const btnAddProduct = document.querySelectorAll('#btnAddProduct');
const btnClearCart = document.querySelector('#btnClearCart');
const btnOrderSubmit = document.querySelector('#btnOrderSubmit');


function init() {
    getProductData();
    getCartData();
}
init();


function getProductData(){
    axios.get(getProduct)
    .then(res =>{
        productData = res.data.products;
        renderProduct(productData);
        
    })
    // 💡 建議加上 .catch() 來處理錯誤
    .catch(err => {
        console.error("API 請求失敗:", err);
    })
    .finally(function () {
    // always executed
    });
}
function getCartData(){
    axios.get(getCart)
    .then(res =>{
        cartData = res.data.carts;
        cartTotalPriceData = res.data.finalTotal;
        renderCart(cartData);
    })
    // 💡 建議加上 .catch() 來處理錯誤
    .catch(err => {
        console.error("API 請求失敗:", err);
    })
    .finally(function () {
    // always executed
    });
}


    //渲染商品列表
function renderProduct(data) {
    let txt= '';
    data.forEach(item => {
        txt +=`
        <li class="card position-relative pe-4">
            <div class="badge p-lg py-2 px-5 mt-3 me-3 rounded-0 position-absolute end-0 bg-black">新品</div>
            <img class="caed-img-top" src="${item.images}" alt="${item.title}">
            <button type="button" id="btnAddProduct" class="btn main-btn mb-3" data-id="${item.id}">加入購物車
            </button>
            <div class="card-body">
            <h3 class="card-title p-lg mb-2">
                ${item.title}
            </h3>
            <p class="p-lg text-decoration-line-through">NT$${item.origin_price}</p>
            <p class="lb-lg">NT$${item.price}</p>
            </div>
        </li>
        `;
    });
    productList.innerHTML = txt;
}
    //篩選商品列表
productFilter.addEventListener('change',e =>{
    let option = e.target.value;
    let dataFiltered = productData.filter(item => item.category === option);
    if (option === "全部") {
        renderProduct(productData);
    } else {
        renderProduct(dataFiltered);
    }
})
    //加入購物車
function postCartData(id) {
        const postData ={
            "data": {
                "productId": id,
                "quantity": 1
            }
        };
    axios.post(postCart, postData)
    .then(res =>{
        console.log(res.data.carts);
        cartData =res.data.carts;
        cartTotalPriceData =res.data.finalTotal;
        renderCart(cartData);
    })
    .catch(err => {
        console.error("API 請求失敗:", err);
    })
    .finally(function () {
    // always executed
    });
}
productList.addEventListener('click', e=>{
    let productId =e.target.dataset.id;
    if (e.target.nodeName !== 'BUTTON') {
        return;
    }else{
        postCartData(productId);
    }
})

    //渲染購物車列表
function renderCart(data){
    cratList.innerHTML ='';
    let txt ='';
    data.forEach(item =>{
        let totalPrice =item.price * item.quantity;
        txt +=`
            <tr class="p-lg align-middle ">
                <th scope="row" class="text-center py-5">
                <img src="${item.product.images}" alt="${item.product.title}" class="card-img me-4">
                ${item.product.title}
                </th>
                <td class="text-center">NT$${item.product.price}</td>
                <td class="text-center">${item.quantity}</td>
                <td class="text-center">NT$${item.product.price}</td>
                <td>
                <button type="button" id="btnRemoveProduct" class="btn p-0">
                    <i class="bi bi-x-lg lb-lg p-2" data-id="${item.id}"></i>
                </button>
                </td>
            </tr>
        `;
    })
    
    cratList.innerHTML += txt;
    let transTotal = cartTotalPriceData.toLocaleString('zh-TW', {
        minimumFractionDigits: 0, // 不顯示小數點
    });
    cartTotalPrice.textContent = `NT$${transTotal}`;
    if (!data.length) {
        btnOrderSubmit.setAttribute('disabled',true);
    }else{
        btnOrderSubmit.removeAttribute('disabled');
    }
}
    //刪除單一商品
function deleteSingleCart(id){
    axios.delete(`${deleteCart}/${id}`)
    .then (res =>{
        cartData = res.data.carts;
        cartTotalPriceData =res.data.finalTotal;
        renderCart(cartData);
        
    })
    .catch(err => {
        console.error("API 請求失敗:", err);
    })
    .finally(function () {
    // always executed
    });
};

cratList.addEventListener('click', e =>{
    let cartId = e.target.dataset.id;
    if (cartId) {
        deleteSingleCart(cartId);
    }else{
        return;
    }
    
});
    //清空購物車
function clearCartData(){
    axios.delete(deleteCart)
    .then (res =>{
        cartData = res.data.carts;
        cartTotalPriceData =res.data.finalTotal;
        renderCart(cartData);
        console.log(cartData);
        
    })
    .catch(err => {
        console.error("API 請求失敗:", err);
    })
    .finally(function () {
    // always executed
    });
};
btnClearCart.addEventListener('click', e =>{
    clearCartData();
    console.log('clear!');
    
});
    //購物車DATA控制
function handleCart(cartData) {
    cartData = res.data.carts;
    cartTotalPriceData =res.data.finalTotal;
    renderCart(cartData);
    
}

// -------表單驗證區------
// - 購物車不能空空
// - 確認各input有填寫
// - 送出表單
// - 清空表單

const postOrder =`${baseUrl}/api/livejs/v1/customer/${apiPath}/orders`;
    //---form DOM---
const orderForm = document.querySelector('#orderForm');
const orderCustomer = document.querySelector('#orderCustomer');
const orderPhone = document.querySelector('#orderPhone');
const orderMail = document.querySelector('#orderMail');
const orderAdress = document.querySelector('#orderAdress');
const orderPay = document.querySelector('#orderPay');
   
    // ------驗證邏輯-----
    // 1.input.value去除留白後不得為空
    // 2.設定一個布林變數"isError"來判斷有無value，如果為空，則為true
    // 3.再來判斷每個input，最終isError為false代表通過
    // inputDOM.nextElementSibling：用來找input下一行的兄弟標籤(span)
    // 用classList.{remove / add}('d-none')控制span警語開關

btnOrderSubmit.addEventListener('click' , e =>{
    e.preventDefault();
        //取出並整理表單的值
    const name =orderCustomer.value.trim();
    const tel =orderPhone.value.trim();
    const email =orderMail.value.trim();
    const address =orderAdress.value.trim();
        //驗證用的變數
    let isError= false ;
    const errorName =orderCustomer.nextElementSibling;
    const errorPhone =orderPhone.nextElementSibling;
    const errorMail =orderMail.nextElementSibling;
    const errorAdress =orderAdress.nextElementSibling;
        //當值為空時，name = 0 = falsy。if遇到turely值才會給過，所以用 ! 反轉
    if (!name) {  
        isError= true;
        errorName.classList.remove('d-none');
    }else {
        errorName.classList.add('d-none'); 
    }
    if (!tel) {  
        isError= true;
        errorPhone.classList.remove('d-none');
    }else {
        errorPhone.classList.add('d-none'); 
    }
    if (!email) {  
        isError= true;
        errorMail.classList.remove('d-none');
    }else {
        errorMail.classList.add('d-none'); 
    }
    if (!address) {  
        isError= true;
        errorAdress.classList.remove('d-none');
    }else {
        errorAdress.classList.add('d-none'); 
    }
    if (!isError) { //isError = false = 給過。反轉讓IF通過
        const formData ={
            "data": {
                "user": {
                    name,
                    tel,
                    email,
                    address,
                    "payment": orderPay.value
                }
            }
        }
        submitOrder(formData);
    }
})
    // 訂單++ POST
function submitOrder(formData){
    axios.post(postOrder , formData)
    .then(res =>{
        console.log(res);
        orderForm.reset();  //送出表單後清空
        getCartData();      //重整訂單列表
        alert('訂單已送出');
    })
    .catch(err => {
        console.error("API 請求失敗:", err);
    })
    .finally(function () {
    // always executed
    });
}

import axios from "axios";

console.log('!!');
const evaluate01 = document.querySelector('#evaluate01');
const evaluate02 = document.querySelector('#evaluate02');
const evaluateData01 =[
    {
        name: '王六角',
        avatarImg: '../assets/images/avatar/g.png',
        product: 'Jodan 雙人床架',
        productImg: '../assets/images/product-mini/g.png',
        content: 'CP值很高。',
    },
    {
        name: 'Leaf',
        avatarImg: '../assets/images/avatar/e.png',
        product: 'Antony 雙人床架',
        productImg: '../assets/images/product-mini/a.png',
        content: 'CP值很高。',
    },
    {
        name: '美濃鄧子琪',
        avatarImg: '../assets/images/avatar/a.png',
        product: 'Charles 系列儲物組合',
        productImg: '../assets/images/product-mini/l.png',
        content: '廚房必備美用品',
    },
    {
        name: '想吃麥當勞早餐',
        avatarImg: '../assets/images/avatar/h.png',
        product: 'Jodan 雙人床架',
        productImg: '../assets/images/product-mini/h.png',
        content: 'CP值很高。',
    },

];
const evaluateData02 =[
    {
        name: '小杰',
        avatarImg: '../assets/images/avatar/c.png',
        product: 'Louvre 雙人床架',
        productImg: '../assets/images/product-mini/c.png',
        content: 'CP值很高。',
    },
    {
        name: '江八角',
        avatarImg: '../assets/images/avatar/j.png',
        product: 'Antony 雙人床架',
        productImg: '../assets/images/product-mini/x.png',
        content: 'CP值很高。',
    },
    {
        name: 'juni讚神',
        avatarImg: '../assets/images/avatar/h.png',
        product: 'Antony 床邊桌',
        productImg: '../assets/images/product-mini/k.png',
        content: '讚的～',
    },
    {
        name: '小Joy',
        avatarImg: '../assets/images/avatar/i.png',
        product: 'Jodan 雙人床架',
        productImg: '../assets/images/product-mini/z.png',
        content: '已購買小孩很愛',
    },

];
function renderEvaluateData01(){
    let txt='';
    evaluateData01.forEach(item =>{
        txt +=`
        <li class="col">
            <div class="card p-0 rounded-0">
                <div class="d-flex">
                    <div class="">
                    <img class="evaluate-goods" src="${item.productImg}" alt="">
                    </div>
                    <div class="card-body ps-3 pt-3">
                    <div class="d-flex ailgn-items-center mb-2">
                        <img src="${item.avatarImg}" alt="custumer" class="img-fluid  me-3" style="width: 40px;">
                        <div class="d-flex flex-column">
                        <span>${item.name}</span>
                        <span class="p-sm text-success">${item.product}</span>
                        </div>
                    </div>
                    <p>
                        ${item.content}。
                    </p>
                    </div>
                </div>
            </div>
        </li>

        `;
    
    })
    evaluate01.innerHTML =txt;
}
function renderEvaluateData02(){
    let txt='';
    evaluateData02.forEach(item =>{
        txt +=`
        <li class="col">
            <div class="card p-0 rounded-0">
                <div class="d-flex">
                    <div class="">
                    <img class="evaluate-goods" src="${item.productImg}" alt="">
                    </div>
                    <div class="card-body ps-3 pt-3">
                    <div class="d-flex ailgn-items-center mb-2">
                        <img src="${item.avatarImg}" alt="custumer" class="img-fluid  me-3" style="width: 40px;">
                        <div class="d-flex flex-column">
                        <span>${item.name}</span>
                        <span class="p-sm text-success">${item.product}</span>
                        </div>
                    </div>
                    <p>
                        ${item.content}
                    </p>
                    </div>
                </div>
            </div>
        </li>

        `;
    
    })
    evaluate02.innerHTML =txt;
}

renderEvaluateData01();
renderEvaluateData02();
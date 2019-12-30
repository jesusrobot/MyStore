let productsContainer = document.getElementById('productsContainer');
let from = document.getElementById('form');
let divisa = 'mxn';

main();

function main (e) {
    // document.getElementById('form').addEventListener('keyup', finder);
    document.addEventListener('DOMContentLoaded', chargeData);
    document.addEventListener('DOMContentLoaded', chargeDataCategory);
    document.getElementById('tabs').addEventListener('click', categorySelected);
    productsContainer.addEventListener('click', sellProduct);
    document.getElementById('changeBadge').addEventListener('click', resultScreenActions);
    document.getElementById('ticketContainer').addEventListener('click', rooter);
    document.getElementById('trash').addEventListener('click', openPopTrash);
    document.getElementById('closePopupDelete').addEventListener('click', closePopTrash);
    document.getElementById('actionDelete').addEventListener('click', actionTrash);
    document.getElementById('save').addEventListener('click', openPopSave);
    document.getElementById('closePopupSave').addEventListener('click', closePopSave);
    document.getElementById('actionSave').addEventListener('click', actionSave)
    document.getElementById('closePopupAlert2').addEventListener('click', closePopAlert);
    document.getElementById('closePopupAlert3').addEventListener('click', closePopAlert3);
    document.getElementById('flashSell-hide').addEventListener('click', openPopFlashSell);
    document.getElementById('flashSell').addEventListener('click', openPopFlashSell);
    document.getElementById('closePopupFlash').addEventListener('click', closePopFlashSell);
    document.getElementById('actionFlashSell').addEventListener('click', actionFlashSell);
    document.getElementById('discount-hide').addEventListener('click', openPopDiscount);
    document.getElementById('discount').addEventListener('click', openPopDiscount);
    document.getElementById('closePopupDiscount').addEventListener('click', closePopupDiscount);
    document.getElementById('actionDiscount').addEventListener('click', actionDiscount);
    document.getElementById('descuentoPop').addEventListener('keyup', updateValueFijo);
    document.getElementById('descuentoPop').addEventListener('keydown', resetValueFijo);

}

function  rooter(e) {
    if(e.target.parentElement.parentElement.parentElement.classList.contains('registred')){
        document.getElementById('ticketContainer').addEventListener('click', productTicketActions);
    } 
    if(e.target.parentElement.parentElement.parentElement.classList.contains('unregistred')){
        document.getElementById('quantityUnregistred').addEventListener('click', productTicketActionsUnregistred);
    }
}

function closePopAlert() {
    document.getElementById('alertOverlay2').style.visibility = 'hidden';
    document.getElementById('alertPop2').style.opacity = '0';
    document.getElementById('alertPop2').style.transform = 'scale(.75)'; 
}

function closePopAlert3() {
    document.getElementById('errOverlay').style.visibility = 'hidden';
    document.getElementById('errPop').style.opacity = '0';
    document.getElementById('errPop').style.transform = 'scale(.75)'; 

    document.getElementById('saveOverlay').style.visibility = 'visible';
    document.getElementById('savePop').style.opacity = '1';
    document.getElementById('savePop').style.transform = 'scale(1)'; 


}

function openPopTrash() {
    document.getElementById('deleteOverlay').style.visibility = 'visible';
    document.getElementById('deletePop').style.opacity = '1';
    document.getElementById('deletePop').style.transform = 'scale(1)'; 
}

function closePopTrash() {
    document.getElementById('deleteOverlay').style.visibility = 'hidden';
    document.getElementById('deletePop').style.opacity = '0';
    document.getElementById('deletePop').style.transform = 'scale(.75)';
}

function actionTrash() {
    let ticketContainer = document.getElementById('ticketContainer');

    while (ticketContainer.firstChild) {
        ticketContainer.removeChild(ticketContainer.firstChild);
    }    

    let showResultClear = document.getElementById('result').innerText = '0.00';
        

    closePopTrash();
}

function openPopSave() {
    document.getElementById('checkbox-1').checked = true;

    document.getElementById('saveOverlay').style.visibility = 'visible';
    document.getElementById('savePop').style.opacity = '1';
    document.getElementById('savePop').style.transform = 'scale(1)'; 

    if(divisa === 'mxn') {
        document.getElementById('priceIn').placeholder = 'Ingreso en mxn';
    } else {
        document.getElementById('priceIn').placeholder = 'Ingreso en usd';
    }
}

function closePopSave() {
    document.getElementById('saveOverlay').style.visibility = 'hidden';
    document.getElementById('savePop').style.opacity = '0';
    document.getElementById('savePop').style.transform = 'scale(.75)'; 
    document.getElementById('priceIn').value = '';
}

function openPopFlashSell() {
    document.getElementById('flashOverlay').style.visibility = 'visible';
    document.getElementById('flashPop').style.opacity = '1';
    document.getElementById('flashPop').style.transform = 'scale(1)'; 
}

function closePopFlashSell() {
    document.getElementById('flashOverlay').style.visibility = 'hidden';
    document.getElementById('flashPop').style.opacity = '0';
    document.getElementById('flashPop').style.transform = 'scale(.75)'; 
    document.getElementById('nameNon').value = '';
    document.getElementById('priceBuyNon').value = '';
}

function openPopDiscount() {
    document.getElementById('divisaNew').innerText = divisa;
    let total = document.getElementById('result').textContent;
    document.getElementById('before').innerHTML = `<del>$${total} <span class="divisa-sub">${divisa}</span></del>`;
    
    if(total <= 0) {
        document.getElementById('porcentaje').disabled = true;
        document.getElementById('fijo').disabled = true; 
    }

    document.getElementById('priceNew').innerText = total;    
    document.getElementById('descuentoOverlay').style.visibility = 'visible';
    document.getElementById('descuentoPop').style.opacity = '1';
    document.getElementById('descuentoPop').style.transform = 'scale(1)'; 
}

function closePopupDiscount() {
    document.getElementById('descuentoOverlay').style.visibility = 'hidden';
    document.getElementById('descuentoPop').style.opacity = '0';
    document.getElementById('descuentoPop').style.transform = 'scale(.75)'; 
    document.getElementById('fijo').value = '';
    document.getElementById('porcentaje').value = '';
    document.getElementById('porcentaje').disabled = false;
    document.getElementById('fijo').disabled = false; 
}

function chargeData() {
    let products = getLSProducts();

    products.forEach((product, index) => {
        const buttonProduct = document.createElement('div');
        buttonProduct.style.display = 'block';
        buttonProduct.id = product.id;
        buttonProduct.setAttribute('data-category', product.category)

        buttonProduct.className = 'product-button';

        buttonProduct.innerHTML = `
            <div class="sub-content">
                <p class="name">${product.name}</p>
            </div>
            <div class="principal-content">
                <p>$${product.priceSell}</p>
            </div>
            <div class="status-content">
                <p ></p>
                <p class="unity" id="unity">${product.unity}: ${product.quantity}</p>
            </div>
        `;

        document.getElementById('productsContainer').appendChild(buttonProduct);
        stockIndicator(product.stockNow,product.stock, product.id)
    });
}

function getLSProducts() {

    let array;

    if(localStorage.getItem('products') === null){
        array = [];
    } else {
        array = JSON.parse(localStorage.getItem('products'));
    }

    return array;
}

function getLSVentas() {

    let array;

    if(localStorage.getItem('ventas') === null){
        array = [];
    } else {
        array = JSON.parse(localStorage.getItem('ventas'));
    }

    return array;
}

function chargeDataCategory() {

    if(localStorage.getItem('category1') === null){
        localStorage.setItem('category1', 'Categoria 1')
    }
    if(localStorage.getItem('category2') === null){
        localStorage.setItem('category2', 'Categoria 2')
    }
    if(localStorage.getItem('category3') === null){
        localStorage.setItem('category3', 'Categoria 3')
    }
    if(localStorage.getItem('category4') === null){
        localStorage.setItem('category4', 'Categoria 4')
    }

    document.getElementById('C1').innerText = localStorage.getItem('category1');
    document.getElementById('C2').innerText = localStorage.getItem('category2');
    document.getElementById('C3').innerText = localStorage.getItem('category3');
    document.getElementById('C4').innerText = localStorage.getItem('category4');
}

function stockIndicator(stockNow, stock, id) {
    let stockContainer = document.getElementsByClassName('main-app')[0].children[1].children[1].children[id].children[2].children[0];;
    // let stockContainer = document.getElementById('productsContainer').querySelector(`${id}`);

    
    if(Number(stockNow) >= 0 && Number(stockNow) <= (Number(stock)/3).toFixed(0)) {
        stockContainer.className = 'indicator-3';
    } 
    else if( Number(stockNow) >= (Number(stock)/3).toFixed(0) && Number(stockNow) <= (Number(stock)/2).toFixed(0)) {
        stockContainer.className = 'indicator-2'
    } 
    if(Number(stockNow) >= (Number(stock)/2).toFixed(0) && Number(stockNow) <= stock){
        stockContainer.className = 'indicator-1'
    }
}

function stockIndicatorDOM(stockNow, stock, id) {
    let stockContainer = document.getElementsByClassName('main-app')[0].children[1].children[1].children[id].children[2].children[0];
    // let stockContainer = document.querySelector(`#productsContainer #${id}`);
    // let stockContainer = document.getElementById('productsContainer').querySelector(`div #${id}`);
    
    if(Number(stockNow) >= 0 && Number(stockNow) <= (Number(stock)/3).toFixed(0)) {
        stockContainer.classList.add('indicator-3');
        stockContainer.classList.remove('indicator-22', 'indicator-11');
        stockContainer.classList.remove('indicator-2', 'indicator-1');

    } 
    else if( Number(stockNow) >= (Number(stock)/3).toFixed(0) && Number(stockNow) <= (Number(stock)/2).toFixed(0)) {
        stockContainer.classList.add('indicator-2')
        stockContainer.classList.remove('indicator-3', 'indicator-1');
        stockContainer.classList.remove('indicator-33', 'indicator-11');

    } 
    if(Number(stockNow) > (Number(stock)/2).toFixed(0) && Number(stockNow) <= stock){
        stockContainer.classList.add('indicator-1');
        stockContainer.classList.remove('indicator-2', 'indicator-3');
        stockContainer.classList.remove('indicator-22', 'indicator-33');

    }
}

function stockIndicatorDOMTicket(stockNow, stock, id) {
    let stockContainer = document.getElementById('main-app').children[1].children[1].children[id].children[2].children[0];
    
    if(Number(stockNow) >= 0 && Number(stockNow) <= (Number(stock)/3).toFixed(0)) {
        stockContainer.classList.add('indicator-3');
        stockContainer.classList.remove('indicator-22', 'indicator-11');
        stockContainer.classList.remove('indicator-2', 'indicator-1');
        
    } 
    if( Number(stockNow) >= (Number(stock)/3).toFixed(0) && Number(stockNow) <= (Number(stock)/2).toFixed(0)) {
        stockContainer.classList.add('indicator-2')
        stockContainer.classList.remove('indicator-3', 'indicator-1');
        stockContainer.classList.remove('indicator-33', 'indicator-11');

    } 
    if(Number(stockNow) > (Number(stock)/2).toFixed(0) && Number(stockNow) <= stock){
        stockContainer.classList.add('indicator-1');
        stockContainer.classList.remove('indicator-2', 'indicator-3');
        stockContainer.classList.remove('indicator-22', 'indicator-33');

    }
}

function stockIndicatorDOMTicket2(stockNow, stock, id) {
    let stockContainer = document.getElementById('main-app').children[1].children[1].children[id].children[2].children[0];
    
    if(Number(stockNow) >= 0 && Number(stockNow) <= (Number(stock)/3).toFixed(0)) {
        stockContainer.classList.add('indicator-33');
        stockContainer.classList.remove('indicator-2', 'indicator-1', 'indicator-3');
        stockContainer.classList.remove('indicator-22', 'indicator-11');
        
    } 
    if( Number(stockNow) >= (Number(stock)/3).toFixed(0) && Number(stockNow) <= (Number(stock)/2).toFixed(0)) {
        stockContainer.classList.add('indicator-22')
        stockContainer.classList.remove('indicator-3', 'indicator-1', 'indicator-2');
        stockContainer.classList.remove('indicator-33', 'indicator-11');
        
    } 
    if(Number(stockNow) > (Number(stock)/2).toFixed(0) && Number(stockNow) <= stock){
        stockContainer.classList.add('indicator-11');
        stockContainer.classList.remove('indicator-22', 'indicator-33');
        stockContainer.classList.remove('indicator-2', 'indicator-3', 'indicator-1');

    }
}

function stockIndicatorFinder(stockNow, stock, id) {
    let stockContainer = document.getElementById('main-app').children[1].children[1].children[id].children[2].children[0];    
    // let stockContainer = document.getElementById('main-app').children[1].children[1].querySelector(`#${id}`);

    
    if(Number(stockNow) >= 0 && Number(stockNow) <= (Number(stock)/3).toFixed(0)) {
        stockContainer.className = 'indicator-3';
    } 
    else if( Number(stockNow) >= (Number(stock)/3).toFixed(0) && Number(stockNow) <= (Number(stock)/2).toFixed(0)) {
        stockContainer.className = 'indicator-2'
    } 
    if(Number(stockNow) >= (Number(stock)/2).toFixed(0) && Number(stockNow) <= stock){
        stockContainer.className = 'indicator-1'
    }
}

function categorySelected(e) {
    let products = Array.from(e.target.parentElement.parentElement.children[1].children);
        
    if(e.target.id === 'all'){
        document.getElementById('all').classList.add('select-tab');
        document.getElementById('C1').classList.remove('select-tab');
        document.getElementById('C2').classList.remove('select-tab');
        document.getElementById('C3').classList.remove('select-tab');
        document.getElementById('C4').classList.remove('select-tab');


        products.forEach((product, index) => {
        
            if(product.getAttribute('data-category') === 'C1'){
                product.style.display = 'block';
                
            }
            if(product.getAttribute('data-category') === 'C2'){
                product.style.display = 'block';
                
            }
            if(product.getAttribute('data-category') === 'C3'){
                product.style.display = 'block'
                
            }
            if(product.getAttribute('data-category') === 'C4'){
                product.style.display = 'block';
                
            }       
        }); 

        categorySelectedDelete = 'all'
    }

    if(e.target.id === 'C1') {
        document.getElementById('all').classList.remove('select-tab');
        document.getElementById('C1').classList.add('select-tab');
        document.getElementById('C2').classList.remove('select-tab');
        document.getElementById('C3').classList.remove('select-tab');
        document.getElementById('C4').classList.remove('select-tab');

        products.forEach((product, index) => {
        
            if(product.getAttribute('data-category') === 'C1'){
                product.style.display = 'block';
                
            }
            if(product.getAttribute('data-category') === 'C2'){
                product.style.display = 'none';
                
            }
            if(product.getAttribute('data-category') === 'C3'){
                product.style.display = 'none';
                
            }
            if(product.getAttribute('data-category') === 'C4'){
                product.style.display = 'none';
                
            }       
        });  
        categorySelectedDelete = 'C1';        
    } 
    if(e.target.id === 'C2') {
        document.getElementById('all').classList.remove('select-tab');
        document.getElementById('C1').classList.remove('select-tab');
        document.getElementById('C2').classList.add('select-tab');
        document.getElementById('C3').classList.remove('select-tab');
        document.getElementById('C4').classList.remove('select-tab');

        products.forEach((product, index) => {
        
            if(product.getAttribute('data-category') === 'C1'){
                product.style.display = 'none';
                
            }
            if(product.getAttribute('data-category') === 'C2'){
                product.style.display = 'block';
                
            }
            if(product.getAttribute('data-category') === 'C3'){
                product.style.display = 'none';
                
            }
            if(product.getAttribute('data-category') === 'C4'){
                product.style.display = 'none';
                
            }       
        });      
        categorySelectedDelete = 'C2'
    } 
    if(e.target.id === 'C3') {
        document.getElementById('all').classList.remove('select-tab');
        document.getElementById('C1').classList.remove('select-tab');
        document.getElementById('C2').classList.remove('select-tab');
        document.getElementById('C3').classList.add('select-tab');
        document.getElementById('C4').classList.remove('select-tab');

        products.forEach((product, index) => {
        
            if(product.getAttribute('data-category') === 'C1'){
                product.style.display = 'none';
                
            }
            if(product.getAttribute('data-category') === 'C2'){
                product.style.display = 'none';
                
            }
            if(product.getAttribute('data-category') === 'C3'){
                product.style.display = 'block';
                
            }
            if(product.getAttribute('data-category') === 'C4'){
                product.style.display = 'none';
                
            }       
        });         
        categorySelectedDelete = 'C3'
    } 
    if(e.target.id === 'C4') {
        document.getElementById('all').classList.remove('select-tab');
        document.getElementById('C1').classList.remove('select-tab');
        document.getElementById('C2').classList.remove('select-tab');
        document.getElementById('C3').classList.remove('select-tab');
        document.getElementById('C4').classList.add('select-tab');


        products.forEach((product, index) => {
        
            if(product.getAttribute('data-category') === 'C1'){
                product.style.display = 'none';
                
            }
            if(product.getAttribute('data-category') === 'C2'){
                product.style.display = 'none';
                
            }
            if(product.getAttribute('data-category') === 'C3'){
                product.style.display = 'none';
                
            }
            if(product.getAttribute('data-category') === 'C4'){
                product.style.display = 'block';
                
            }       
        });
        categorySelectedDelete = 'C4'
    } 
}

function sellProduct(e) {
    if(e.target.parentElement.parentElement.classList.contains('product-button'))  {     
        // OBTENIENDO DATA DEL DOM
        let elementSelected = e.target.parentElement.parentElement;
        let elementSelectedId = Number(elementSelected.id); 
        // PRODUCTO SELECCIONADO
        let products = getLSProducts();
        
        let productData = products[elementSelectedId];  

        if(productData.stockNow !== 0) {
            // CONSTRUYENDO EL TAMPLATE
            const cardProduct = document.createElement('article');
            cardProduct.className = 'product-ticket-container registred';
            cardProduct.id = elementSelectedId;
            cardProduct.innerHTML = `
                <div class="col name-container"><p>${productData.name}</p></div>
                <div class="col unity-container">
                    <div>${productData.unity}: ${productData.quantity}</div>
                </div>
                <div class="col price-container">
                    $<p>${productData.priceSell}</p>
                </div>
                <div class="col quantity-container" id="quantity">
                    <button id="plus" class="plus"><img src="assets/img/mas.svg" class="icon"></button>
                    <p class="quantity" id="quantity"></p>
                    <button id="substract" class="substract"><img src="assets/img/menos.svg" class="icon"></button>
                </div>
            `;
            // INSERTANDO EN EL TICKET CONTAINER
            let ticketContainer = document.getElementById('ticketContainer');
            let itemsFromTicketContainer =  Array.from(ticketContainer.children);
            let idsFromItems = [];       
            
            if(itemsFromTicketContainer.length === 0) {
                ticketContainer.appendChild(cardProduct);
            } else{
                itemsFromTicketContainer.forEach((item) => {
                    idsFromItems.push(Number(item.id));                
                });
                if(idsFromItems.includes(elementSelectedId) !== true) {
                    ticketContainer.appendChild(cardProduct);
                }
            }

            // CONTADOR
            let itemsFromTicketContainer2 =  Array.from(ticketContainer.children);
            let stockMax = productData.stockNow;

            itemsFromTicketContainer2.forEach((itemTicket,index ) => {

                if(itemTicket.id == elementSelectedId) {
                    let stockNow = Number(itemTicket.children[3].children[1].textContent);

                    if(stockNow < stockMax) {
                        let buttonId = e.target.parentElement.parentElement.id;
                        let cardId = itemTicket.id;

                        if(buttonId == cardId) {
                            let newStockNow = stockNow + 1;
                            itemTicket.children[3].children[1].innerText = newStockNow;
                            let stockNowDOM = Number(productData.stockNow) - newStockNow;
                            stockIndicatorDOM(stockNowDOM, productData.stock, buttonId);
                            console.log(buttonId);
                            // show result
                            if(divisa == 'mxn') {
                                let priceProductTXT = e.target.parentElement.parentElement.children[1].children[0].textContent;
                                let priceProduct = Number(priceProductTXT.substring(1));
                                let showResult = document.getElementById('result');
                                let total = Number(showResult.textContent);   
                                let sum =          total + priceProduct;    
                                showResult.innerText = sum.toFixed(2);  
                            } 
                            if(divisa== 'usd') {
                                let priceProductTXT = e.target.parentElement.parentElement.children[1].children[0].textContent;
                            let priceProduct = (Number(priceProductTXT.substring(1)))/18;
                            let showResult = document.getElementById('result');
                            let total = Number(showResult.textContent);   
                            let sum =          total + priceProduct;    
                            showResult.innerText = sum.toFixed(2);  
                            }

                        }

                    }

                }
            });
        } else {
            document.getElementById('alertOverlay2').style.visibility = 'visible';
            document.getElementById('alertPop2').style.opacity = '1';
            document.getElementById('alertPop2').style.transform = 'scale(1)'; 
        }
    }  
}

function resultScreenActions(e) {
    if(e.target.id === 'toMxn') {
        let thisButton = e.target;
        let otherButton = document.getElementById('toUsd');
        otherButton.classList.remove('active');
        thisButton.classList.add('active');
        
        let total = Number(document.getElementById('result').textContent);

        let convert = total*18;

        document.getElementById('result').innerText = convert.toFixed(2);
        
        thisButton.disabled = true;
        otherButton.disabled = false;
        divisa = 'mxn';
    } 

    if(e.target.id === 'toUsd') {
        let thisButton = e.target;
        let otherButton = document.getElementById('toMxn');
        otherButton.classList.remove('active');
        thisButton.classList.add('active');
        
        let total = Number(document.getElementById('result').textContent);

        let convert = ((total/18).toFixed(2));

        document.getElementById('result').innerText = convert;

        thisButton.disabled = true
        otherButton.disabled = false;
        divisa = 'usd';

    } 

}

function productTicketActions(e) {
    // console.log(e.target.parentElement.parentElement.parentElement.classList.contains('registred'));
    
    let element= e.target.parentElement.parentElement.parentElement;
    let elementId = element.id;
    let products = getLSProducts();
    let stockNow = Number(element.children[3].children[1].textContent);
    let stockMax = Number(products[elementId].stockNow);

    if(stockNow < stockMax) {
        if(e.target.parentElement.classList.contains('plus')) {
            let newStockDOM = stockNow + 1;
            element.children[3].children[1].innerText = newStockDOM;
            let showResult = document.getElementById('result');

            if(divisa == 'mxn') {
                let price = Number(element.children[2].children[0].textContent);
                let total = price + Number(showResult.textContent);
                showResult.innerText = total.toFixed(2);
            } 
            if(divisa == "usd") {
                let price = (Number(element.children[2].children[0].textContent))/18;
                let total = price + Number(showResult.textContent);
                showResult.innerText = total.toFixed(2);
            }
            
            
            
            stockNow =  Number(products[elementId].stockNow) - Number(element.children[3].children[1].textContent);
            stockMax = Number(products[elementId].stock);
            elementId = element.id;

            stockIndicatorDOMTicket(stockNow, stockMax, elementId)
            
            
        } 
    }
    if(e.target.parentElement.classList.contains('substract')) {
        if(stockNow > 0) {
            let newStockDOM = stockNow - 1;
            element.children[3].children[1].innerText = newStockDOM;
            let showResult = document.getElementById('result');
            

            if(divisa == 'mxn') {
                let price = Number(element.children[2].children[0].textContent);
                let total =  Number(showResult.textContent) - price;
                showResult.innerText = total.toFixed(2);
            } 
            if(divisa == "usd") {
                let price = (Number(element.children[2].children[0].textContent))/18;
                let total = Number(showResult.textContent) - price;
                showResult.innerText = total.toFixed(2);
            }

            stockNow =  Number(products[elementId].stockNow) - Number(element.children[3].children[1].textContent);
            stockMax = Number(products[elementId].stock);
            elementId = element.id;

            stockIndicatorDOMTicket2(stockNow, stockMax, elementId)
            
            
        }
        stockNow = Number(element.children[3].children[1].textContent);
        if(stockNow == 0) {
            element.remove();
            // stockIndicatorDOMTicket2(stockNow, stockMax, elementId);
        }
        let ticketContainer = document.getElementById('ticketContainer');
        let itemsFromTicketContainer =  Array.from(ticketContainer.children);
        let showResult = document.getElementById('result');

        if (itemsFromTicketContainer.length == 0) {
            showResult.innerText = '0.00';
        }
        
    }
    
} 

function actionSave() {
    let products = getLSProducts();
    let ventas = getLSVentas();
    let ticketContainer = document.getElementById('ticketContainer');
    let productsSell = Array.from(ticketContainer.children);
    let total = Number(document.getElementById('result').textContent);
    let venta;
    let ingreso = Number(document.getElementById('priceIn').value);
    console.log(ingreso >= total);
    console.log(ingreso);
    console.log(total);
    
    
   if(ingreso >= total){
        if(productsSell.length !== 0 ){
            venta = {
                timeOfSale: Date(),
                year: new Date().getFullYear(),
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                month: new Date().getMonth(),
                day: new Date().getDate(),
                total: total,
                divisa: divisa,
                moneyIn: ingreso 
            };

            productsSell.forEach((product,index) => {
                let name = product.children[0].children[0].textContent;
                let price = product.children[2].children[0].textContent;
                let quantity = product.children[3].children[1].textContent;
                let statusRegistro;
                // venta[`producto${index}`] =  {name, price,  quantity};

                if(product.classList.contains('registred')){
                    statusRegistro = 'registred';
                    products[product.id].stockNow = products[product.id].stockNow - quantity;
                } 
                if(product.classList.contains('unregistred')){
                    statusRegistro = 'unregistred';
                } 
                venta[`producto${index}`] =  {name, price,  quantity, statusRegistro};


            });

            ventas.unshift(venta);

            localStorage.setItem('ventas', JSON.stringify(ventas));

            localStorage.setItem('products', JSON.stringify(products));

            actionTrash();
            toPrint(venta);
        }               

   } else {
      
        document.getElementById('saveOverlay').style.visibility = 'hidden';
        document.getElementById('savePop').style.opacity = '0';
        document.getElementById('savePop').style.transform = 'scale(.75)'; 

        document.getElementById('errOverlay').style.visibility = 'visible';
        document.getElementById('errPop').style.opacity = '1';
        document.getElementById('errPop').style.transform = 'scale(1)'; 

        document.getElementById('saldo').innerText =  (total - ingreso).toFixed(2);
        document.getElementById('divisarr').innerText = divisa

   }
   closePopSave();

}

function finder(e) {
    e.preventDefault();
    let getLS = getLSProducts()
    let finderValue = document.querySelector('#finder').value;

    document.getElementById('all').classList.add('select-tab');
    document.getElementById('C1').classList.remove('select-tab');
    document.getElementById('C2').classList.remove('select-tab');
    document.getElementById('C3').classList.remove('select-tab');
    document.getElementById('C4').classList.remove('select-tab'); 


    let response = getLS.filter(element => element.name.indexOf(finderValue.toUpperCase()) !== -1);
    
    if (response) {
        document.getElementById('productsContainer').innerHTML = '';
        response.forEach((product, index) => {
            const buttonProduct = document.createElement('div');
            buttonProduct.style.display = 'block';
            buttonProduct.id = product.id;
            buttonProduct.setAttribute('data-category', product.category)
    
            buttonProduct.className = 'product-button';
    
            buttonProduct.innerHTML = `
                <div class="sub-content">
                    <p class="name">${product.name}</p>
                </div>
                <div class="principal-content">
                    <p>$${product.priceSell}</p>
                </div>
                <div class="status-content">
                    <p ></p>
                    <p class="unity" id="unity">${product.unity}: ${product.quantity}</p>
                </div>
            `;
            console.log('product.id ' + product.id);
            console.log('index ' + index);
            
            document.getElementById('productsContainer').appendChild(buttonProduct);
            stockIndicatorFinder(product.stockNow,product.stock, product.id)
        });

    } 
    if(response == false){
        document.getElementById('productsContainer').innerHTML = '';
        
        let mensaje = document.createElement('p');
        
        mensaje.innerText = `"${finderValue}" no encontrado`;
        
        mensaje.classList.add('mensaje');

        document.getElementById('productsContainer').appendChild(mensaje)
    }
    
}

function productTicketActionsUnregistred(e) {
    let element= e.target.parentElement.parentElement.parentElement;
    let elementId = element.id;
    let products = getLSProducts();
    let stockNow = Number(element.children[3].children[1].textContent);
    console.log(stockNow);
    
    if(stockNow >= 1) {
        if(e.target.parentElement.classList.contains('plus')) {
            let newStockDOM = stockNow + 1;
            element.children[3].children[1].innerText = newStockDOM;
            let showResult = document.getElementById('result');

            if(divisa == 'mxn') {
                let price = Number(element.children[2].children[0].textContent);
                let total = price + Number(showResult.textContent);
                showResult.innerText = total.toFixed(2);
            } 
            if(divisa == "usd") {
                let price = (Number(element.children[2].children[0].textContent))/18;
                let total = price + Number(showResult.textContent);
                showResult.innerText = total.toFixed(2);
            }
        } 
    }
    if(e.target.parentElement.classList.contains('substract')) {
        if(stockNow > 0) {
            let newStockDOM = stockNow - 1;
            element.children[3].children[1].innerText = newStockDOM;
            let showResult = document.getElementById('result');
            

            if(divisa == 'mxn') {
                let price = Number(element.children[2].children[0].textContent);
                let total =  Number(showResult.textContent) - price;
                showResult.innerText = total.toFixed(2);
            } 
            if(divisa == "usd") {
                let price = (Number(element.children[2].children[0].textContent))/18;
                let total = Number(showResult.textContent) - price;
                showResult.innerText = total.toFixed(2);
            }
            
        }
        stockNow = Number(element.children[3].children[1].textContent);
        if(stockNow == 0) {
            element.remove();
            // stockIndicatorDOMTicket2(stockNow, stockMax, elementId);
        }
        let ticketContainer = document.getElementById('ticketContainer');
        let itemsFromTicketContainer =  Array.from(ticketContainer.children);
        let showResult = document.getElementById('result');

        if (itemsFromTicketContainer.length == 0) {
            showResult.innerText = '0.00';
        }
        
    }
}

function actionFlashSell() {
    let price = document.getElementById('priceBuyNon').value;
    // let quantity = document.getElementById('nameProductNon').value;
    let name = document.getElementById('nameNon').value;
    let id = ((Array.from(document.getElementById('productsContainer').children)).length);
    
    // CONSTRUYENDO EL TAMPLATE
    const cardProduct = document.createElement('article');
    cardProduct.className = 'product-ticket-container unregistred';
    cardProduct.id = id;
    cardProduct.innerHTML = `
        <div class="col name-container"><p>${name.toUpperCase()}</p></div>
        <div class="col unity-container">
            <div>Pieza: 1</div>
        </div>
        <div class="col price-container">
            $<p>${price}</p>
        </div>
        <div class="col quantity-container" id="quantityUnregistred">
            <button id="plus-no-registrado" class="plus"><img src="assets/img/mas.svg" class="icon"></button>
            <p class="quantity" id="quantity-no-registrado">1</p>
            <button id="substract-no-registrado" class="substract"><img src="assets/img/menos.svg" class="icon"></button>
        </div>
    `;
 
    if(price !== '' && name !== '') {
        console.log(price);
        
        // INSERTANDO EN EL TICKET CONTAINER
        ticketContainer.appendChild(cardProduct);
        // AGREGANDO EL PRECIO AL SHOWRESULT
        if(divisa == 'mxn') {
            let priceProductTXT = price;
            let priceProduct = Number(priceProductTXT);
            let showResult = document.getElementById('result');
            let total = Number(showResult.textContent);   
            let sum =          total + priceProduct;    
            showResult.innerText = sum.toFixed(2);  
        } 
        if(divisa== 'u e.target.parentElement.parentElement.children[1].children[0].textContentsd') {
            let priceProductTXT = price;
            let priceProduct = (Number(priceProductTXT)/18);
            let showResult = document.getElementById('result');
            let total = Number(showResult.textContent);   
            let sum =          total + priceProduct;    
            showResult.innerText = sum.toFixed(2);  
        }
    }
    


    
    // CERRANDO EL POPUP
    closePopFlashSell();


    
}

function updateValueFijo(e) {
    
    let porcentaje ;

    let totalOld = Number(document.getElementById('result').textContent); 
    console.log(totalOld>0);
    
   if (totalOld > 0) {
       if(e.target.id === 'fijo') {
       
           if(Number(e.target.value) <= totalOld) {
            let value = e.target.value;
            let totalOld = document.getElementById('result').textContent;               
            let newTotal = Number(totalOld) - Number(value);
            document.getElementById('priceNew').innerText = newTotal.toFixed(2);  
            // update porcent
            porcentaje = Math.round((value/(totalOld/100)).toFixed(2));
            document.getElementById('porcentaje').value = porcentaje; 
           }
             
       } else {
           console.log(e.target.id);
           if(e.target.value <= 100){
            let value = e.target.value;
            let totalOld = document.getElementById('result').textContent;               
            let newTotal = Number(totalOld) - ((totalOld/100)*value);
            document.getElementById('priceNew').innerText = newTotal.toFixed(2);  
        
            // update fijo
            porcentaje = Math.round(Number((totalOld/100)*value)).toFixed(2);
            document.getElementById('fijo').value = porcentaje;
           }
       }
   } 

    
    
}

function resetValueFijo(e) { 

    let totalOld = Number(document.getElementById('result').textContent); 
    if (totalOld > 0) {
        if(e.target.id === 'fijo'){
            let total = Number(document.getElementById('result').textContent);
            document.getElementById('priceNew').innerText = total.toFixed(2);  
            document.getElementById('porcentaje').value = '';
            
        } else{
            let total = Number(document.getElementById('result').textContent);
            document.getElementById('priceNew').innerText = total.toFixed(2);  
            document.getElementById('fijo').value = '';
        }  
    }
    

   
}

function actionDiscount(value) {   
    console.log( document.getElementById('priceNew').textContent);
    
    document.getElementById('result').innerText = document.getElementById('priceNew').textContent;
    closePopupDiscount();
}

function toPrint(venta) {
    const status = document.getElementById('checkbox-1').checked;

    if(status === true) {
        localStorage.setItem('ticket', JSON.stringify(venta));
        window.location.href = '/print.html';
    }    
}
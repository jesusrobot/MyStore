let tableBody = document.getElementById('table-body');
let elementSelected;
let categorySelectedDelete = 'all';

main();

function main() {
    document.addEventListener('DOMContentLoaded', chargeData);
    document.addEventListener('DOMContentLoaded', chargeDataCategory);
    document.getElementById('tabs').addEventListener('click', categorySelected);   
    document.getElementById('trash').addEventListener('click', openDelete) 
    document.getElementById('closePopupDelete').addEventListener('click', closePopupDelete);
    document.getElementById('actionDelete').addEventListener('click',actionDelete);
    tableBody.addEventListener('click', chooseElement);
    document.getElementById('closePopupAlert').addEventListener('click', closePopupAlert);
    document.getElementById('update').addEventListener('click', openUpdate);
    document.getElementById('closePopupUpdate').addEventListener('click', closePopupUpdate);
    document.getElementById('actionUpdate').addEventListener('click', actionUpdate);
}

function openDelete() {
    if(elementSelected === undefined) {
        document.getElementById('alertOverlay').style.visibility = 'visible';
        document.getElementById('alertPop').style.opacity = '1';
        document.getElementById('alertPop').style.transform = 'scale(1)';
    } else{
        document.getElementById('deleteOverlay').style.visibility = 'visible';
        document.getElementById('deletePop').style.opacity = '1';
        document.getElementById('deletePop').style.transform = 'scale(1)'; 
    }
    
}

function closePopupDelete() {
    document.getElementById('deleteOverlay').style.visibility = 'hidden';
    document.getElementById('deletePop').style.opacity = '0';
    document.getElementById('deletePop').style.transform = 'scale(.75)';
}

function closePopupAlert() {
    document.getElementById('alertOverlay').style.visibility = 'hidden';
    document.getElementById('alertPop').style.opacity = '0';
    document.getElementById('alertPop').style.transform = 'scale(.75)';

}

function openUpdate() {
    if(elementSelected === undefined) {
        document.getElementById('alertOverlay').style.visibility = 'visible';
        document.getElementById('alertPop').style.opacity = '1';
        document.getElementById('alertPop').style.transform = 'scale(1)';
    } else{
        document.getElementById('updateOverlay').style.visibility = 'visible';
        document.getElementById('updatePop').style.opacity = '1';
        document.getElementById('updatePop').style.transform = 'scale(1)'; 
        chargeDataToForm();
    }
}

function closePopupUpdate() {
    document.getElementById('updateOverlay').style.visibility = 'hidden';
    document.getElementById('updatePop').style.opacity = '0';
    document.getElementById('updatePop').style.transform = 'scale(.75)';
}

function chargeData() {
    let products = getLSProducts();

    products.forEach((product, index) => {
        const tableRow = document.createElement('div');
        tableRow.className = 'table-row';
        tableRow.id = `row-${index}`;
        tableRow.innerHTML = `
            <div class="col">${product.name}</div>
            <div class="col">${product.provider}</div>
            <div class="col">$${product.priceBuy}</div>
            <div class="col">$${product.priceSell}</div>
            <div class="col">${product.unity}: ${product.quantity}</div>
            <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
            <div class="col">${product.stock - product.stockNow}</div>
            <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
            <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
            <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
        `;
        tableBody.appendChild(tableRow);
        stockIndicator(product.stockNow,product.stock, index);
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

function stockIndicator(stockNow, stock, id) {
    let stockContainer = document.getElementById(`row-${id}`).children[5].children[0];

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

function categorySelected(e) {
    let products = getLSProducts();

    if(e.target.id === 'all'){
        document.getElementById('all').classList.add('select-tab');
        document.getElementById('C1').classList.remove('select-tab');
        document.getElementById('C2').classList.remove('select-tab');
        document.getElementById('C3').classList.remove('select-tab');
        document.getElementById('C4').classList.remove('select-tab');

        tableBody.innerHTML = '';

        chargeData();
        categorySelectedDelete = 'all'
    }

    if(e.target.id === 'C1') {
        document.getElementById('all').classList.remove('select-tab');
        document.getElementById('C1').classList.add('select-tab');
        document.getElementById('C2').classList.remove('select-tab');
        document.getElementById('C3').classList.remove('select-tab');
        document.getElementById('C4').classList.remove('select-tab');

        tableBody.innerHTML = '';

        products.forEach((product, index) => {
            if(product.category === e.target.id){
                const tableRow = document.createElement('div');
                tableRow.className = 'table-row';
                tableRow.id = `row-${index}`;
                tableRow.innerHTML = `
                    <div class="col">${product.name}</div>
                    <div class="col">${product.provider}</div>
                    <div class="col">$${product.priceBuy}</div>
                    <div class="col">$${product.priceSell}</div>
                    <div class="col">${product.unity}: ${product.quantity}</div>
                    <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                    <div class="col">${product.stock - product.stockNow}</div>
                    <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                `;
                tableBody.appendChild(tableRow);
                stockIndicator(product.stockNow,product.stock, index);   
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

        tableBody.innerHTML = '';

        products.forEach((product, index) => {
            if(product.category === e.target.id){
                const tableRow = document.createElement('div');
                tableRow.className = 'table-row';
                tableRow.id = `row-${index}`;
                tableRow.innerHTML = `
                    <div class="col">${product.name}</div>
                    <div class="col">${product.provider}</div>
                    <div class="col">$${product.priceBuy}</div>
                    <div class="col">$${product.priceSell}</div>
                    <div class="col">${product.unity}: ${product.quantity}</div>
                    <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                    <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                `;
                tableBody.appendChild(tableRow);
                stockIndicator(product.stockNow,product.stock, index);   
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

        tableBody.innerHTML = '';

        products.forEach((product, index) => {
            if(product.category === e.target.id){
                const tableRow = document.createElement('div');
                tableRow.className = 'table-row';
                tableRow.id = `row-${index}`;
                tableRow.innerHTML = `
                    <div class="col">${product.name}</div>
                    <div class="col">${product.provider}</div>
                    <div class="col">$${product.priceBuy}</div>
                    <div class="col">$${product.priceSell}</div>
                    <div class="col">${product.unity}: ${product.quantity}</div>
                    <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                    <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                `;
                tableBody.appendChild(tableRow);
                stockIndicator(product.stockNow,product.stock, index);   
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

        tableBody.innerHTML = '';

        products.forEach((product, index) => {
            if(product.category === e.target.id){
                const tableRow = document.createElement('div');
                tableRow.className = 'table-row';
                tableRow.id = `row-${index}`;
                tableRow.innerHTML = `
                    <div class="col">${product.name}</div>
                    <div class="col">${product.provider}</div>
                    <div class="col">$${product.priceBuy}</div>
                    <div class="col">$${product.priceSell}</div>
                    <div class="col">${product.unity}: ${product.quantity}</div>
                    <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                    <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                `;
                tableBody.appendChild(tableRow);
                stockIndicator(product.stockNow,product.stock, index);  
            }
        }); 
        categorySelectedDelete = 'C4'
    } 
}

function chooseElement(e){
    let idAndMore = e.target.parentElement.id;
    elementSelected = Number(idAndMore.substring(4));
}

function actionDelete() {
    if(elementSelected !== undefined) {
        let products = getLSProducts();  
        products.splice(elementSelected, 1);
        localStorage.setItem('products', JSON.stringify(products));
        tableBody.innerHTML = '';

        if(categorySelectedDelete === 'C1' || categorySelectedDelete === 'C2' || categorySelectedDelete === 'C3' || categorySelectedDelete === 'C4') {
            products.forEach((product, index) => {
                if(index === elementSelected){
                    let categoryS = product.category;
    
                    if(categoryS === 'C1') {
                        products.forEach((product, index) => {
                            if(product.category === categoryS){
                                const tableRow = document.createElement('div');
                                tableRow.className = 'table-row';
                                tableRow.id = `row-${index}`;
                                tableRow.innerHTML = `
                                    <div class="col">${product.name}</div>
                                    <div class="col">${product.provider}</div>
                                    <div class="col">$${product.priceBuy}</div>
                                    <div class="col">$${product.priceSell}</div>
                                    <div class="col">${product.unity}: ${product.quantity}</div>
                                    <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                                    <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                                `;
                                tableBody.appendChild(tableRow);
                                stockIndicator(product.stockNow,product.stock, index);   
                            }
                        });           
                    } 
                    else if(categoryS === 'C2') {
                        products.forEach((product, index) => {
                            if(product.category === 'C2'){
                                const tableRow = document.createElement('div');
                                tableRow.className = 'table-row';
                                tableRow.id = `row-${index}`;
                                tableRow.innerHTML = `
                                    <div class="col">${product.name}</div>
                                    <div class="col">${product.provider}</div>
                                    <div class="col">$${product.priceBuy}</div>
                                    <div class="col">$${product.priceSell}</div>
                                    <div class="col">${product.unity}: ${product.quantity}</div>
                                    <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                                    <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                                `;
                                tableBody.appendChild(tableRow);
                                stockIndicator(product.stockNow,product.stock, index);   
                            }
                        });           
                    } 
                    else if(categoryS === 'C3') {
                        products.forEach((product, index) => {
                            if(product.category === 'C3'){
                                const tableRow = document.createElement('div');
                                tableRow.className = 'table-row';
                                tableRow.id = `row-${index}`;
                                tableRow.innerHTML = `
                                    <div class="col">${product.name}</div>
                                    <div class="col">${product.provider}</div>
                                    <div class="col">$${product.priceBuy}</div>
                                    <div class="col">$${product.priceSell}</div>
                                    <div class="col">${product.unity}: ${product.quantity}</div>
                                    <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                                    <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                                `;
                                tableBody.appendChild(tableRow);
                                stockIndicator(product.stockNow,product.stock, index);   
                            }
                        });           
                    } 
                    else if(categoryS === 'C4') {
                        products.forEach((product, index) => {
                            if(product.category === 'C4'){
                                const tableRow = document.createElement('div');
                                tableRow.className = 'table-row';
                                tableRow.id = `row-${index}`;
                                tableRow.innerHTML = `
                                    <div class="col">${product.name}</div>
                                    <div class="col">${product.provider}</div>
                                    <div class="col">$${product.priceBuy}</div>
                                    <div class="col">$${product.priceSell}</div>
                                    <div class="col">${product.unity}: ${product.quantity}</div>
                                    <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                                    <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                                    <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                                `;
                                tableBody.appendChild(tableRow);
                                stockIndicator(product.stockNow,product.stock, index);   
                            }
                        });           
                    } 
                }
            });
        } 
        if (categorySelectedDelete === 'all') {
            chargeData();
        }
        elementSelected = undefined;
        closePopupDelete();
    }
}

function unitySelected(index) {
    let position;
    
    if(index== 'Kilogramo') {
        position = 0;
    } else if(index == 'Gramo') {
        position = 1;
    } else if (index == 'Litro') {
        position = 2;
    } else if (index == 'Mililitro') {
        position = 3;
    } else if (index == 'm3') {
        position = 4;
    } else if (index == 'Pieza') {
        position = 5;
    } else if (index == 'Talla') {
        position = 6;
    } else if (index == 'Numero') {
        position = 7;
    }

    return position;
}

function chargeDataToForm() {
    let products = getLSProducts();
    products.forEach((product, index) => {
        if(index === elementSelected) {
            let name = document.getElementById('name').value = product.name;
            let provider = document.getElementById('provider').value = product.provider;
            let priceBuy = document.getElementById('priceBuy').value = product.priceBuy;
            let priceSell = document.getElementById('priceSell').value = product.priceSell;
            let stock = document.getElementById('stock').value = 0; 
            const unity = document.getElementById('unity').selectedIndex = unitySelected(product.unity);
            const quantity = document.getElementById('quantity').value = product.quantity;
            
        }
    })
}

function actionUpdate() {
    let products = getLSProducts();

    products.forEach((product, index) => {
        if(elementSelected == index) {
            const name = document.getElementById('name').value;
            const priceBuy = document.getElementById('priceBuy').value;
            const priceSell = document.getElementById('priceSell').value;
            const stock = document.getElementById('stock').value;
            const provider = document.getElementById('provider').value;

            const unity = document.getElementById('unity');
            const unitySelected = unity.options[unity.selectedIndex].value;
            const quantity = document.getElementById('quantity').value;

            product.name = name;
            product.priceBuy = priceBuy;
            product.priceSell = priceSell;
            product.stockNow += Number(stock);
            product.stock += Number(stock);
            product.provider = provider;
            product.unity = unitySelected;
            product.quantity = quantity;

        }
    });
    localStorage.setItem('products', JSON.stringify(products));

    tableBody.innerHTML = '';

    if(categorySelectedDelete === 'C1' || categorySelectedDelete === 'C2' || categorySelectedDelete === 'C3' || categorySelectedDelete === 'C4') {
        products.forEach((product, index) => {
            if(index === elementSelected){
                let categoryS = product.category;

                if(categoryS === 'C1') {
                    products.forEach((product, index) => {
                        if(product.category === categoryS){
                            const tableRow = document.createElement('div');
                            tableRow.className = 'table-row';
                            tableRow.id = `row-${index}`;
                            tableRow.innerHTML = `
                                <div class="col">${product.name}</div>
                                <div class="col">${product.provider}</div>
                                <div class="col">$${product.priceBuy}</div>
                                <div class="col">$${product.priceSell}</div>
                                <div class="col">${product.unity}: ${product.quantity}</div>
                                <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                                <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                                <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                                <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                            `;
                            tableBody.appendChild(tableRow);
                            stockIndicator(product.stockNow,product.stock, index);   
                        }
                    });           
                } 
                else if(categoryS === 'C2') {
                    products.forEach((product, index) => {
                        if(product.category === 'C2'){
                            const tableRow = document.createElement('div');
                            tableRow.className = 'table-row';
                            tableRow.id = `row-${index}`;
                            tableRow.innerHTML = `
                                <div class="col">${product.name}</div>
                                <div class="col">${product.provider}</div>
                                <div class="col">$${product.priceBuy}</div>
                                <div class="col">$${product.priceSell}</div>
                                <div class="col">${product.unity}: ${product.quantity}</div>
                                <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                                <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                                <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                                <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                            `;
                            tableBody.appendChild(tableRow);
                            stockIndicator(product.stockNow,product.stock, index);   
                        }
                    });           
                } 
                else if(categoryS === 'C3') {
                    products.forEach((product, index) => {
                        if(product.category === 'C3'){
                            const tableRow = document.createElement('div');
                            tableRow.className = 'table-row';
                            tableRow.id = `row-${index}`;
                            tableRow.innerHTML = `
                                <div class="col">${product.name}</div>
                                <div class="col">${product.provider}</div>
                                <div class="col">$${product.priceBuy}</div>
                                <div class="col">$${product.priceSell}</div>
                                <div class="col">${product.unity}: ${product.quantity}</div>
                                <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                                <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                                <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                                <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                            `;
                            tableBody.appendChild(tableRow);
                            stockIndicator(product.stockNow,product.stock, index);   
                        }
                    });           
                } 
                else if(categoryS === 'C4') {
                    products.forEach((product, index) => {
                        if(product.category === 'C4'){
                            const tableRow = document.createElement('div');
                            tableRow.className = 'table-row';
                            tableRow.id = `row-${index}`;
                            tableRow.innerHTML = `
                                <div class="col">${product.name}</div>
                                <div class="col">${product.provider}</div>
                                <div class="col">$${product.priceBuy}</div>
                                <div class="col">$${product.priceSell}</div>
                                <div class="col">${product.unity}: ${product.quantity}</div>
                                <div class="col"><span id="indicatorStock">${product.stockNow}/${product.stock}</span></div>
                                <div class="col">-$${(product.stock - product.stockNow) * product.priceBuy}</div>
                                <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy)}</div>
                                <div class="col">+$${((product.stock - product.stockNow) * product.priceSell) - ((product.stock - product.stockNow) * product.priceBuy) + ((product.stock - product.stockNow) *  product.priceBuy)}</div>
                            `;
                            tableBody.appendChild(tableRow);
                            stockIndicator(product.stockNow,product.stock, index);   
                        }
                    });           
                } 
            }
        });
    } 
    if (categorySelectedDelete === 'all') {
        chargeData();
    }
    closePopupUpdate();
}




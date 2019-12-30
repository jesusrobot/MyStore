
main();
function main() {
    document.addEventListener('DOMContentLoaded',  chargeData);
    document.getElementById('save') .addEventListener('click', getData);  
    document.getElementById('trash').addEventListener('click', resetForm);
    document.getElementById('closePopupAlert').addEventListener('click', closePopupAlert); 
    document.getElementById('closePopupSave').addEventListener('click', closePopupSave);
    document.getElementById('actionSave').addEventListener('click', actionSave);
    document.getElementById('closePopupDelete').addEventListener('click', closePopupDelete);
    document.getElementById('actionDelete').addEventListener('click', actionDelete);
}

function resetForm() {
    document.getElementById('deleteOverlay').style.visibility = 'visible';
    document.getElementById('deletePop').style.opacity = '1';
    document.getElementById('deletePop').style.transform = 'scale(1)'; 
}

function closePopupAlert() {
    document.getElementById('alertOverlay').style.visibility = 'hidden';
    document.getElementById('alertPop').style.opacity = '0';
    document.getElementById('alertPop').style.transform = 'scale(.75)';

}
function closePopupSave() {
    document.getElementById('saveOverlay').style.visibility = 'hidden';
    document.getElementById('savePop').style.opacity = '0';
    document.getElementById('savePop').style.transform = 'scale(.75)'; 
}
function closePopupDelete() {
    document.getElementById('deleteOverlay').style.visibility = 'hidden';
    document.getElementById('deletePop').style.opacity = '0';
    document.getElementById('deletePop').style.transform = 'scale(.75)'; 
}

function getData() {
    const name = document.getElementById('name').value;
    const priceBuy = document.getElementById('buy').value;
    const priceSell = document.getElementById('sell').value;
    const stock = document.getElementById('stock').value;
    const provider = document.getElementById('provider').value;

    const unity = document.getElementById('unity');
    const unitySelected = unity.options[unity.selectedIndex].value;
    const quantity = document.getElementById('quantity').value;

    const category = document.getElementById('category');
    document.getElementById('trash')
    const categorySelected = category.options[category.selectedIndex].value;
    const categoryName = document.getElementById('categoryName').value;

    if(name !== '' && priceBuy !== '' && priceSell !== '' && stock !== '' && provider !== '' && quantity !== '') {
        document.getElementById('saveOverlay').style.visibility = 'visible';
        document.getElementById('savePop').style.opacity = '1';
        document.getElementById('savePop').style.transform = 'scale(1)'; 
        
    } else {
        document.getElementById('alertOverlay').style.visibility = 'visible';
        document.getElementById('alertPop').style.opacity = '1';
        document.getElementById('alertPop').style.transform = 'scale(1)'; 
    }
    
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

// function getLSCategories() {
//     let array; 

//     if(localStorage.getItem('categories') === null){
//         array = [];
//     } else {
//         array = JSON.parse(localStorage.getItem('categories'));
//     }

//     return array;
// }

function position() {
    let position;
    if(localStorage.getItem('products') === null){
        position = 0;
    }
    if(localStorage.getItem('products') !== null){
        position = JSON.parse(localStorage.getItem('products')).length;
    }

    return position;

}

function actionSave() {
    const name = document.getElementById('name').value;
    const priceBuy = document.getElementById('buy').value;
    const priceSell = document.getElementById('sell').value;
    const stock = document.getElementById('stock').value;
    const provider = document.getElementById('provider').value;

    const unity = document.getElementById('unity');
    const unitySelected = unity.options[unity.selectedIndex].value;
    const quantity = document.getElementById('quantity').value;

    const category = document.getElementById('category');
    const categorySelected = category.options[category.selectedIndex].value;
    const categoryName = document.getElementById('categoryName').value;

    const product = {
        name: name.toUpperCase(),
        priceBuy: Number(priceBuy),
        priceSell: Number(priceSell), 
        stock: Number(stock),
        stockNow: Number(stock),
        provider: provider,
        unity: unitySelected, 
        quantity: Number(quantity),
        category: categorySelected,
        categoryName: categoryName,
        year: new Date().getFullYear(),
        numDay: new Date().getDate(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        day: new Date().getDay(),
        id: position()
    }

    if(product.categoryName !== '') {
        nameCategory(product.category, product.categoryName);
    }
    let products = getLSProducts();

    products.push(product);

    localStorage.setItem('products', JSON.stringify(products));
    actionDelete();
    closePopupSave();
}

function actionDelete() {
    const name = document.getElementById('name').value = '';
    const priceBuy = document.getElementById('buy').value = '';
    const priceSell = document.getElementById('sell').value = '';
    const stock = document.getElementById('stock').value = '';
    const provider = document.getElementById('provider').value = '';

    const unity = document.getElementById('unity').options.selectedIndex = 0;
    const quantity = document.getElementById('quantity').value = '';

    const category = document.getElementById('category').options.selectedIndex = 0;
    const categoryName = document.getElementById('categoryName').value = '';
    
    closePopupDelete();
}

function nameCategory(category, name) {
    // es un buen codigo pero no sirve para esto :(
    // let categories = getLSCategories();
    
    // if(categories == '') {
    //     categories.push(name);
    //     localStorage.setItem('categories', JSON.stringify(categories));
    // } else {
    //     if(categories.includes(name) === false) {
    //         categories.push(name);
    //         localStorage.setItem('categories', JSON.stringify(categories));
    //     }
        

    // }
    
    if(category === 'C1'){
        localStorage.setItem('category1', name);
    } else if (category === 'C2') {
        localStorage.setItem('category2', name);
    } else if(category === 'C3') {
        localStorage.setItem('category3', name);
    } else if(category === 'C4') {
        localStorage.setItem('category4', name);
    }
    chargeData()
    

}

function chargeData() {

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
    

    document.getElementById('cat1').innerText = localStorage.getItem('category1');
    document.getElementById('cat2').innerText = localStorage.getItem('category2');
    document.getElementById('cat3').innerText = localStorage.getItem('category3');
    document.getElementById('cat4').innerText = localStorage.getItem('category4');
}
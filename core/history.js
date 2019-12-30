// es una estatuaria belleza de pelo rubio. 
// Se parece menos a una mujer
// terrestre que a una criatura de cierta raza superior y
// divina
// a D.
main();

function main() {
    document.addEventListener('DOMContentLoaded', chargeData) 
}

function chargeData() {
    let ventas = getLSVentas();
    let templete = '';

    ventas.forEach((venta , index)=> {
        let sellContainer = document.createElement('article');
        sellContainer.setAttribute('uk-accordion', 'multiple: true');
        sellContainer.setAttribute('month', venta.month);
        sellContainer.setAttribute('year', venta.year);
        sellContainer.id = `element-${index}`;
        sellContainer.setAttribute('dateM', venta.month);
        sellContainer.setAttribute('dateY', venta.year);
        sellContainer.innerHTML = `
            <li class="uk-open">
                        <div class="uk-accordion-title resolve">
                            <div class="header">
                                <div class="date">
                                    <div class="day">${venta.day}</div>
                                    <div class="mont">${month(venta.month)}</div>
                                    <div class="year">${venta.year}</div>
                                </div>
                                <div class="desciption-sell">
                                    <p>Venta #${index+1}</p>
                                </div>
                                <div class="total"><p>$${venta.total} <span class="divisa">${venta.divisa}</span></p></div>
                            </div>
                        </div>
                        <div class="uk-accordion-content ">
                            <div class="content" id='products'>
                                ${printProducts(venta)}
                            </div>   
                        </div>
            </li>
        `;
        document.getElementById('history').appendChild(sellContainer)

    });
    
    
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

function month(m) {
    let month = '';
    
    if(m === 0){
        month = 'ENE'
    } else if(m === 1) {
        month = 'FEB'
    }else if(m === 2) {
        month = 'MAR'
    }else if(m === 3) {
        month = 'ABR'
    }else if(m === 4) {
        month = 'MAY'
    }else if(m === 5) {
        month = 'JUN'
    }else if(m === 6) {
        month = 'JUL'
    }else if(m === 7) {
        month = 'AGO'
    }else if(m === 8) {
        month = 'SEP'
    }else if(m === 9) {
        month = 'OCT'
    }else if(m === 10) {
        month = 'NOV'
    }else if(m === 11) {
        month = 'DIC'
    }

    return month;
}

function printProducts(venta) {
    let values = Object.values(venta);
    let products = values.filter(product => typeof product === 'object');
    
    let templete = '<p class="remove">init</p>'
    products.forEach((product) => {
       if(product.statusRegistro === 'registred'){
            templete += `
            <div class="row">
                <div class="name">
                    <p>${product.quantity}<span class="x">x</span>${product.name}</p>
                </div>
                <div class="price">
                    <p>$${product.price}</p>
                </div>
            </div>
            `;
       } else {
        templete += `
        <div class="row">
            <div class="name">
                <p>${product.quantity}<span class="x">x</span>${product.name} <span class="unregistred"> (no registrado)</span></p>
            </div>
            <div class="price">
                <p>$${product.price}</p>
            </div>
        </div>
    `;
       }
       
    });
   
    return templete

}

function timeline(venta) {
    // console.log(venta.month);
    // console.log(venta.year);
    // console.log(venta);
    let ventas = getLSVentas();
    // ventas.push(venta)
    console.log(ven);
    // ventas.filter(venta=> )
}
timeline();
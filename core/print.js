main();
// let ticket = getLSTicket();



function main() {
    document.addEventListener('DOMContentLoaded', chargeData);
    // document.addEventListener('DOMContentLoaded',  printArticle(ticket))
    document.getElementById('print').addEventListener('click', () => {
        //  window.open('', 'PRINT', 'height=400,width=600')
        window.print();
    })
}

function getLSTicket() {
    let array;

    if(localStorage.getItem('ticket') === null){
        array = [];
    } else {
        array = JSON.parse(localStorage.getItem('ticket'));
    }
    
    return array;
}

function chargeData() {
    let ticket = getLSTicket();
    
    let templete = `
        <article class="ticket">
                <header>
                    <div class="top">
                        <div class="logo">MyStore</div>
                        <div class="aside">
                            <div class="direction">Impulse Softworks Company</div>
                            <div class="website">www.mystore.com</div>
                        </div>
                    </div>
                    <div class="middle">
                        <div class="direction">Palo alto California</div>
                        <div class="phone">626 108 91 14</div>
                    </div>
                </header>
                <section class="products">
                    <div class="info-table">
                        <div class="col cant">Cant.</div>
                        <div class="col name">Nombre</div>
                        <div class="col price">Precio</div>
                        <div class="col total-product">Total</div>
                    </div>
                    <div id="insert" class="insert">
                       ${printArticle(ticket)}
                    </div>
                    <div class="total">
                        
                                <div>
                                    <p class="total-title">Total</p>
                                    <div class="total-sell">$${ticket.total}</div>
                                </div>
                                <div>
                                    <p class="total-title">Pago con</p>
                                    <div class="total-sell">$${ticket.moneyIn}</div>
                                </div>
                                <div>
                                    <p class="total-title">Su cambio</p>
                                    <div class="total-sell">$${(ticket.moneyIn)-(ticket.total)}</div>
                                </div>
                        
                    </div>
                </section>
                <footer>
                    <p class="gratitude">Muchas gracias por su visita!</p>
                    <div class="date">${ticket.day} de ${ticket.month} del ${ticket.year}</div>
                </footer>
            </article>
    `;
    console.log(ticket.moneyIn);
    

    document.getElementById('insertTicket').innerHTML = templete    
    
}


function printArticle(venta) {
    let ticket = getLSTicket();
    if(ticket.divisa === 'mxn') {
        let values = Object.values(venta);
        let products = values.filter(product => typeof product === 'object');
        
        let templete = '';
        products.forEach((product) => {
        
            templete += `
            <div class="item-ticket">
            <div class="col cant-item">${product.quantity}</div>
            <div class="col description-item">${(product.name)}</div>
            <div class="col price-item">$${product.price}</div>
            <div class="col total-item">$${(product.price) * (product.quantity)}</div>
            </div>
        `;
        
        
        });
        // templete += '  </div>';
        console.log(templete);

        return templete
    } else {
        let values = Object.values(venta);
        let products = values.filter(product => typeof product === 'object');
        
        let templete = '';
        products.forEach((product) => {
        
            templete += `
            <div class="item-ticket">
            <div class="col cant-item">${(product.quantity)}</div>
            <div class="col description-item">${(product.name)}</div>
            <div class="col price-item">$${((product.price)/18).toFixed(1)}</div>
            <div class="col total-item">$${(((product.price)/18) * (product.quantity)).toFixed(1)}</div>
            </div>
        `;
        
        
        });
        // templete += '  </div>';
        console.log(templete);

        return templete
    }
    
    // document.getElementById('insert').innerHTML = templete;

}
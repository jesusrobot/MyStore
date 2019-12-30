let btn = document.getElementById('pop');
let overlay = document.getElementById('overlay');
let pop = document.getElementById('popup');
let cerrar = document.getElementById('cerrar');

btn.addEventListener('click', ()=> {
    overlay.classList.add('active');
    pop.classList.add('active');
});
cerrar.addEventListener('click', ()=> {
    overlay.classList.remove('active');
    pop.classList.remove('active');
});
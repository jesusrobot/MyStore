const back = document.getElementById('back');
back.addEventListener('click', (e) => {
    e.preventDefault();
    window.history.back();
});
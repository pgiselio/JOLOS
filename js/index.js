const btnHambuguer = document.getElementById('botao-ham');
const menuHambuguer = document.querySelector('.menu');
const elementos = document.querySelectorAll('.menu li a');

btnHambuguer.addEventListener('click', () => {
    btnHambuguer.classList.toggle('active');
    menuHambuguer.classList.toggle('active');
});

elementos.forEach(link => {
    link.addEventListener('click', () => {
        btnHambuguer.classList.remove('active');
        menuHambuguer.classList.remove('active');
    })
})

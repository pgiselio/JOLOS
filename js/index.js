const btnHambuguer = document.getElementById('botao-ham');
const menuHambuguer = document.querySelector('.menu');
const elementos = document.querySelectorAll('.menu li a');
const accessBt = document.querySelector('.access-bt');
const accessMenu = document.querySelector('.acesso-mobile');

btnHambuguer.addEventListener('click', () => {
    btnHambuguer.classList.toggle('active');
    menuHambuguer.classList.toggle('active');
    accessMenu.classList.remove('active');
    accessBt.classList.remove('active');
});

accessBt.addEventListener('click', () => {
    accessMenu.classList.toggle('active');
    accessBt.classList.toggle('active');
    btnHambuguer.classList.remove('active');
    menuHambuguer.classList.remove('active');
});

elementos.forEach(link => {
    link.addEventListener('click', () => {
        btnHambuguer.classList.remove('active');
        menuHambuguer.classList.remove('active');
    })
})



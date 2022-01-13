const btnCollpseSidemenu = document.getElementById('btn-collapse-sidemenu');
const btnHam = document.querySelector('.botao-ham');
const mainContent = document.querySelector('.main');
const bodyDOM = document.getElementsByTagName("body")[0];

btnCollpseSidemenu.addEventListener('click', () =>{
    bodyDOM.classList.toggle('expand-sidemenu');
    btnHam.classList.toggle('active');
});

mainContent.addEventListener('click', () =>{
    bodyDOM.classList.remove('expand-sidemenu');
    btnHam.classList.remove('active'); 
});

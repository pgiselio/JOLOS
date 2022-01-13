const btnCollpseSidemenu = document.getElementById('btn-collapse-sidemenu');
const btnHam = document.querySelector('.botao-ham');
const bodyDOM = document.getElementsByTagName("body")[0];

btnCollpseSidemenu.addEventListener('click', () =>{
    bodyDOM.classList.toggle('expand-sidemenu');
    btnHam.classList.toggle('active');
});

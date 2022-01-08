const btnCollpseSidemenu = document.getElementById('btn-collapse-sidemenu');
const sideMenu = document.querySelector('.side-bar');

btnCollpseSidemenu.addEventListener('click', () =>{
    btnCollpseSidemenu.classList.toggle('active');
    sideMenu.classList.toggle('active');
});
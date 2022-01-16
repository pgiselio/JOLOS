const btnCollpseSidemenu = document.getElementById('btn-collapse-sidemenu');
const btnHam = document.querySelector('.botao-ham');
const bodyDOM = document.getElementsByTagName("body")[0];

btnCollpseSidemenu.addEventListener('click', () => {
    bodyDOM.classList.add('transbar');
    bodyDOM.classList.toggle('expand-sidemenu');
    btnHam.classList.toggle('active');
    setTimeout(() => {
        bodyDOM.classList.remove('transbar');
    }, 600);
    if (bodyDOM.classList.contains('expand-sidemenu')) {
        localStorage.setItem('sidebar-collapsed', 'collapsed');
    } else {
        localStorage.setItem('sidebar-collapsed', '');
    }
});

if (!localStorage.getItem('sidebar-collapsed')) {
    populateStorage();
} else {
    checkSidebarState();
}

function populateStorage() {
    localStorage.setItem('sidebar-collapsed', '');
}
function checkSidebarState() {
    const mq = window.matchMedia("(min-width: 766px)");

    if (mq.matches) {
        if (localStorage.getItem('sidebar-collapsed') == ('collapsed')) {
            bodyDOM.classList.toggle('expand-sidemenu');
            btnHam.classList.toggle('active');
        }
    } 
    
}


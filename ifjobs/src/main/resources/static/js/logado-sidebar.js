const btnCollpseSidemenu = document.getElementById('btn-collapse-sidemenu');
const btnHam = document.querySelector('.botao-ham');
const bodyDOM = document.getElementsByTagName("body")[0];

bodyDOM.classList.add("remove-transbar");

btnCollpseSidemenu.addEventListener('click', () => {
    bodyDOM.classList.toggle('toggle-sidemenu');
    btnHam.classList.toggle('active');
    if (bodyDOM.classList.contains('toggle-sidemenu')) {
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
    if (mq.matches && localStorage.getItem('sidebar-collapsed') == ('collapsed')) {
        bodyDOM.classList.add('toggle-sidemenu');
        btnHam.classList.add('active');
    }  
}

setTimeout(() => {
    bodyDOM.classList.remove("remove-transbar");
}, 600);  

const candidatosChk = document.querySelectorAll('.candidato .candidato-list-check');
const checkAll = document.getElementById('candidato-checkall');

checkAll.addEventListener('change', () => {
    if(checkAll.checked){
        candidatosChk.forEach(candidato => {
            candidato.checked = true;
        });
    }else{
        candidatosChk.forEach(candidato => {
            candidato.checked = false;
        });
    }
})
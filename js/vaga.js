const candidatosChk = document.querySelectorAll('.candidato .candidato-list-check');
const checkAll = document.getElementById('candidato-checkall');
const candidatoLink = document.querySelectorAll('.candidato-group');
var selectionMode = false;
var candidatosQuantity = candidatosChk.length;
function verifyQuantity() {
    var checkeds = 0;
    candidatosChk.forEach(candidato => {
        if (candidato.checked) {
            checkeds++;
        }
    });
    if (checkeds == candidatosQuantity) {
        selectionMode = true;
        checkAll.checked = true;
    }
    else if (checkeds > 0) {
        selectionMode = true;
        checkAll.checked = false;
    } else {
        selectionMode = false;
        checkAll.checked = false;
    }
}
candidatosChk.forEach(candidato => {
    candidato.addEventListener('change', () => {
        verifyQuantity();
    });
});

checkAll.addEventListener('change', () => {
    if (checkAll.checked) {
        candidatosChk.forEach(candidatoCheck => {
            candidatoCheck.checked = true;
        });
    } else {
        candidatosChk.forEach(candidatoCheck => {
            candidatoCheck.checked = false;
        });
    }
    verifyQuantity();
});

for (var i = 0; i < candidatoLink.length; i++) {
    var link = candidatoLink[i];
    var check = candidatosChk[i];
    check.id = 'check-' + i;
    link.id = 'candidato-' + i;
    link.addEventListener('click', function (e) {
        if (selectionMode) {
            var selected = document.getElementById(e.target.id.replace('candidato-', 'check-'));
            selected.checked = !selected.checked;
            verifyQuantity();
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
}
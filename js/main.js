const masks = {
    cpf(value){
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    }
}

const fieldCpf = document.getElementById('cpf');
const field = fieldCpf.dataset.js;

fieldCpf.addEventListener('input', (e) => {
    e.target.value = masks[field](e.target.value)
}, false);

const checkbox = document.getElementById('checkbox');
const inputPassword = document.getElementById('pass');
const inputConfirmPassword = document.getElementById('confirm-pass');

checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
        inputPassword.type = 'text';
        inputConfirmPassword.type = 'text';
    } else {
        inputPassword.type = 'password';
        inputConfirmPassword.type = 'password';
    }
});

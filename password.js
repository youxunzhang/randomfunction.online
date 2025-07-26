document.getElementById('generate-pwd').addEventListener('click', function() {
    const length = parseInt(document.getElementById('pwd-length').value, 10);
    const useUpper = document.getElementById('upper').checked;
    const useLower = document.getElementById('lower').checked;
    const useNumber = document.getElementById('number').checked;
    const useSymbol = document.getElementById('symbol').checked;
    const resultDiv = document.getElementById('pwd-result');

    if (!useUpper && !useLower && !useNumber && !useSymbol) {
        resultDiv.textContent = 'Please select at least one character type.';
        return;
    }
    if (isNaN(length) || length < 6) {
        resultDiv.textContent = 'Password length must be at least 6.';
        return;
    }

    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const number = '0123456789';
    const symbol = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    let chars = '';
    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useNumber) chars += number;
    if (useSymbol) chars += symbol;

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    resultDiv.textContent = password;
}); 
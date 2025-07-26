document.getElementById('generate').addEventListener('click', function() {
    const count = parseInt(document.getElementById('count').value, 10);
    const length = parseInt(document.getElementById('length').value, 10);
    const resultDiv = document.getElementById('result');
    if (isNaN(count) || isNaN(length) || count < 1 || length < 1) {
        resultDiv.textContent = 'Please enter valid numbers.';
        return;
    }
    let results = [];
    for (let i = 0; i < count; i++) {
        let num = '';
        for (let j = 0; j < length; j++) {
            num += Math.floor(Math.random() * 10);
        }
        results.push(num);
    }
    resultDiv.innerHTML = results.join('<br>');
}); 
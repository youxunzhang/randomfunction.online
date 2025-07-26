document.getElementById('generate').addEventListener('click', function() {
    const count = parseInt(document.getElementById('count').value, 10);
    const min = parseInt(document.getElementById('min').value, 10);
    const max = parseInt(document.getElementById('max').value, 10);
    const unique = document.getElementById('unique').checked;
    const resultDiv = document.getElementById('result');

    if (isNaN(count) || isNaN(min) || isNaN(max) || count < 1 || min > max) {
        resultDiv.textContent = 'Please enter valid parameters.';
        return;
    }
    if (unique && count > (max - min + 1)) {
        resultDiv.textContent = 'Count exceeds the range for unique numbers.';
        return;
    }
    let results = [];
    if (unique) {
        let pool = [];
        for (let i = min; i <= max; i++) pool.push(i);
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * pool.length);
            results.push(pool[idx]);
            pool.splice(idx, 1);
        }
    } else {
        for (let i = 0; i < count; i++) {
            results.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
    }
    resultDiv.textContent = results.join(', ');
});

document.getElementById('copy').addEventListener('click', function() {
    const result = document.getElementById('result').textContent;
    if (!result) return;
    navigator.clipboard.writeText(result).then(function() {
        document.getElementById('copy').textContent = 'Copied!';
        setTimeout(() => {
            document.getElementById('copy').textContent = 'Copy Result';
        }, 1200);
    });
}); 
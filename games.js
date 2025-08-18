// Enhanced Tic Tac Toe with AI
(function(){
    const el = document.getElementById('tictactoe');
    const scoreEl = document.getElementById('ttt-score');
    const restartBtn = document.getElementById('ttt-restart');
    const aiBtn = document.getElementById('ttt-ai');
    
    let board = Array(9).fill('');
    let turn = 'X';
    let over = false;
    let vsAI = false;
    let scores = {X: 0, O: 0};
    
    function render() {
        el.innerHTML = '';
        for(let i=0; i<9; i++) {
            const cell = document.createElement('button');
            cell.textContent = board[i];
            cell.className = 'ttt-cell';
            cell.style.cssText = `
                width: 60px; height: 60px; font-size: 2rem; margin: 2px;
                background: ${board[i] ? '#e0e7ff' : '#f1f5f9'};
                border: 2px solid #cbd5e1; border-radius: 8px;
                cursor: pointer; transition: all 0.2s;
            `;
            cell.onclick = () => move(i);
            el.appendChild(cell);
            if(i%3 === 2) el.appendChild(document.createElement('br'));
        }
        updateScore();
    }
    
    function move(i) {
        if(board[i] || over) return;
        board[i] = turn;
        
        if(win(turn)) {
            setTimeout(() => {
                alert(`${turn} wins!`);
                scores[turn]++;
                over = true;
                updateScore();
            }, 100);
        } else if(board.every(x => x)) {
            setTimeout(() => alert('Draw!'), 100);
            over = true;
        } else {
            turn = turn === 'X' ? 'O' : 'X';
            if(vsAI && turn === 'O' && !over) {
                setTimeout(aiMove, 500);
            }
        }
        render();
    }
    
    function aiMove() {
        const empty = board.map((cell, i) => cell === '' ? i : -1).filter(i => i !== -1);
        if(empty.length > 0) {
            const move = empty[Math.floor(Math.random() * empty.length)];
            board[move] = 'O';
            if(win('O')) {
                setTimeout(() => {
                    alert('AI wins!');
                    scores.O++;
                    over = true;
                    updateScore();
                }, 100);
            } else if(board.every(x => x)) {
                setTimeout(() => alert('Draw!'), 100);
                over = true;
            } else {
                turn = 'X';
            }
            render();
        }
    }
    
    function win(p) {
        const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
        return lines.some(line => line.every(j => board[j] === p));
    }
    
    function updateScore() {
        scoreEl.textContent = over ? 
            `Game Over - X: ${scores.X} | O: ${scores.O}` : 
            `${turn}'s turn - X: ${scores.X} | O: ${scores.O}`;
    }
    
    function reset() {
        board = Array(9).fill('');
        turn = 'X';
        over = false;
        render();
    }
    
    restartBtn.onclick = reset;
    aiBtn.onclick = () => {
        vsAI = !vsAI;
        aiBtn.textContent = vsAI ? '🤖 vs Human' : '🤖 vs AI';
        reset();
    };
    
    render();
})();

// Enhanced Snake Game
(function(){
    const canvas = document.getElementById('snake');
    const scoreEl = document.getElementById('snake-score');
    const restartBtn = document.getElementById('snake-restart');
    const pauseBtn = document.getElementById('snake-pause');
    
    if(!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const size = 20, w = 15, h = 15;
    let snake = [{x:7, y:7}];
    let dir = {x:0, y:-1};
    let food = {x:3, y:3};
    let over = false;
    let paused = false;
    let score = 0;
    let gameLoop;
    
    function draw() {
        ctx.clearRect(0, 0, 300, 300);
        
        // Draw snake
        ctx.fillStyle = '#4f46e5';
        snake.forEach((s, i) => {
            if(i === 0) {
                ctx.fillStyle = '#3730a3'; // Head
            } else {
                ctx.fillStyle = '#6366f1'; // Body
            }
            ctx.fillRect(s.x*size, s.y*size, size-2, size-2);
        });
        
        // Draw food
        ctx.fillStyle = '#f59e0b';
        ctx.fillRect(food.x*size, food.y*size, size-2, size-2);
        
        if(over) {
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(0, 0, 300, 300);
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 2rem sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over!', 150, 140);
            ctx.font = '1rem sans-serif';
            ctx.fillText(`Score: ${score}`, 150, 170);
            ctx.fillText('Press R to restart', 150, 190);
        }
        
        if(paused && !over) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(0, 0, 300, 300);
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 1.5rem sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('PAUSED', 150, 150);
        }
    }
    
    function step() {
        if(over || paused) return;
        
        const head = {x: snake[0].x + dir.x, y: snake[0].y + dir.y};
        
        // Check collision
        if(head.x < 0 || head.x >= w || head.y < 0 || head.y >= h || 
           snake.some(s => s.x === head.x && s.y === head.y)) {
            over = true;
            draw();
            return;
        }
        
        snake.unshift(head);
        
        // Check food collision
        if(head.x === food.x && head.y === food.y) {
            score += 10;
            food = {
                x: Math.floor(Math.random() * w),
                y: Math.floor(Math.random() * h)
            };
            // Make sure food doesn't spawn on snake
            while(snake.some(s => s.x === food.x && s.y === food.y)) {
                food = {
                    x: Math.floor(Math.random() * w),
                    y: Math.floor(Math.random() * h)
                };
            }
        } else {
            snake.pop();
        }
        
        updateScore();
        draw();
    }
    
    function updateScore() {
        scoreEl.textContent = `Score: ${score} | Length: ${snake.length}`;
    }
    
    function reset() {
        snake = [{x:7, y:7}];
        dir = {x:0, y:-1};
        food = {x:3, y:3};
        over = false;
        paused = false;
        score = 0;
        updateScore();
        draw();
    }
    
    function togglePause() {
        paused = !paused;
        pauseBtn.textContent = paused ? '▶️ Resume' : '⏸️ Pause';
    }
    
    document.addEventListener('keydown', e => {
        if(e.key === 'ArrowUp' && dir.y !== 1) dir = {x:0, y:-1};
        else if(e.key === 'ArrowDown' && dir.y !== -1) dir = {x:0, y:1};
        else if(e.key === 'ArrowLeft' && dir.x !== 1) dir = {x:-1, y:0};
        else if(e.key === 'ArrowRight' && dir.x !== -1) dir = {x:1, y:0};
        else if(e.key === 'r' || e.key === 'R') reset();
        else if(e.key === ' ') togglePause();
    });
    
    restartBtn.onclick = reset;
    pauseBtn.onclick = togglePause;
    
    gameLoop = setInterval(step, 160);
    draw();
})();

// Enhanced 2048 Game
(function(){
    const el = document.getElementById('game2048');
    const scoreEl = document.getElementById('g2048-score');
    const restartBtn = document.getElementById('g2048-restart');
    const undoBtn = document.getElementById('g2048-undo');
    
    let board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let score = 0;
    let bestScore = localStorage.getItem('2048-best') || 0;
    let history = [];
    
    function render() {
        el.innerHTML = `
            <div style='text-align:center;margin-bottom:12px;'>
                <div style='font-size:1.1rem;font-weight:600;color:#374151;margin-bottom:8px;'>2048</div>
            </div>
        `;
        
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid; grid-template-columns: repeat(4,60px); gap: 6px;
            background: #f1f5f9; padding: 12px; border-radius: 8px;
        `;
        
        for(let i=0; i<16; i++) {
            const cell = document.createElement('div');
            cell.textContent = board[i] || '';
            cell.style.cssText = `
                height: 60px; background: ${getTileColor(board[i])};
                display: flex; align-items: center; justify-content: center;
                font-weight: bold; font-size: ${board[i] >= 1000 ? '1rem' : '1.2rem'};
                border-radius: 8px; color: ${board[i] >= 8 ? '#fff' : '#374151'};
                transition: all 0.2s;
            `;
            grid.appendChild(cell);
        }
        el.appendChild(grid);
        updateScore();
    }
    
    function getTileColor(value) {
        const colors = {
            0: '#f1f5f9', 2: '#fef3c7', 4: '#fbbf24', 8: '#f59e0b',
            16: '#d97706', 32: '#dc2626', 64: '#b91c1c', 128: '#7c3aed',
            256: '#6366f1', 512: '#3b82f6', 1024: '#06b6d4', 2048: '#059669'
        };
        return colors[value] || '#000';
    }
    
    function add() {
        let empty = [];
        for(let i=0; i<16; i++) if(!board[i]) empty.push(i);
        if(empty.length) {
            const pos = empty[Math.floor(Math.random() * empty.length)];
            board[pos] = Math.random() < 0.9 ? 2 : 4;
        }
    }
    
    function move(dir) {
        history.push([...board, score]);
        let moved = false;
        
        for(let i=0; i<4; i++) {
            let line = [];
            for(let j=0; j<4; j++) {
                let idx = dir < 2 ? i*4 + j : j*4 + i;
                let val = board[dir === 0 ? i*4 + j : dir === 1 ? i*4 + (3-j) : 
                               dir === 2 ? j*4 + i : (3-j)*4 + i];
                if(val) line.push(val);
            }
            
            // Merge
            for(let k=0; k<line.length-1; k++) {
                if(line[k] === line[k+1]) {
                    line[k] *= 2;
                    score += line[k];
                    line.splice(k+1, 1);
                }
            }
            
            // Pad with zeros
            while(line.length < 4) line.push(0);
            
            // Update board
            for(let j=0; j<4; j++) {
                let idx = dir === 0 ? i*4 + j : dir === 1 ? i*4 + (3-j) : 
                         dir === 2 ? j*4 + i : (3-j)*4 + i;
                board[idx] = line[j];
            }
        }
        
        if(score > bestScore) {
            bestScore = score;
            localStorage.setItem('2048-best', bestScore);
        }
        
        render();
    }
    
    function undo() {
        if(history.length > 0) {
            const last = history.pop();
            board = last.slice(0, 16);
            score = last[16];
            render();
        }
    }
    
    function updateScore() {
        scoreEl.textContent = `Score: ${score} | Best: ${bestScore}`;
    }
    
    document.addEventListener('keydown', e => {
        if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
            let before = board.slice();
            if(e.key === 'ArrowLeft') move(0);
            if(e.key === 'ArrowRight') move(1);
            if(e.key === 'ArrowUp') move(2);
            if(e.key === 'ArrowDown') move(3);
            if(board.some((v,i) => v !== before[i])) add();
        }
    });
    
    restartBtn.onclick = () => {
        score = 0;
        board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        history = [];
        add(); add();
        render();
    };
    
    undoBtn.onclick = undo;
    
    add(); add();
    render();
})();

// Memory Match Game
(function(){
    const el = document.getElementById('memory-game');
    const movesEl = document.getElementById('memory-moves');
    const timeEl = document.getElementById('memory-time');
    const pairsEl = document.getElementById('memory-pairs');
    const restartBtn = document.getElementById('memory-restart');
    const shuffleBtn = document.getElementById('memory-shuffle');
    
    let cards = [];
    let flipped = [];
    let matched = [];
    let moves = 0;
    let time = 0;
    let timer;
    let size = 4;
    
    const symbols = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞'];
    
    function initGame() {
        clearInterval(timer);
        time = 0;
        moves = 0;
        flipped = [];
        matched = [];
        
        const totalCards = size * size;
        const pairs = totalCards / 2;
        cards = [];
        
        for(let i = 0; i < pairs; i++) {
            cards.push(symbols[i], symbols[i]);
        }
        
        shuffle();
        render();
        startTimer();
    }
    
    function shuffle() {
        for(let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }
    
    function render() {
        el.innerHTML = '';
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid; grid-template-columns: repeat(${size}, 60px); gap: 4px;
            justify-content: center;
        `;
        
        cards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            const isFlipped = flipped.includes(index) || matched.includes(index);
            
            cardEl.style.cssText = `
                width: 60px; height: 60px; background: ${isFlipped ? '#e0e7ff' : '#f1f5f9'};
                border: 2px solid #cbd5e1; border-radius: 8px; display: flex;
                align-items: center; justify-content: center; font-size: 1.5rem;
                cursor: pointer; transition: all 0.3s; transform: ${isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)'};
            `;
            
            cardEl.textContent = isFlipped ? card : '';
            cardEl.onclick = () => flipCard(index);
            grid.appendChild(cardEl);
        });
        
        el.appendChild(grid);
        updateStats();
    }
    
    function flipCard(index) {
        if(flipped.includes(index) || matched.includes(index) || flipped.length >= 2) return;
        
        flipped.push(index);
        render();
        
        if(flipped.length === 2) {
            moves++;
            const [a, b] = flipped;
            
            if(cards[a] === cards[b]) {
                matched.push(a, b);
                flipped = [];
                
                if(matched.length === cards.length) {
                    clearInterval(timer);
                    setTimeout(() => alert(`Congratulations! You won in ${moves} moves and ${time} seconds!`), 500);
                }
            } else {
                setTimeout(() => {
                    flipped = [];
                    render();
                }, 1000);
            }
        }
        
        updateStats();
    }
    
    function startTimer() {
        timer = setInterval(() => {
            time++;
            updateStats();
        }, 1000);
    }
    
    function updateStats() {
        movesEl.textContent = `Moves: ${moves}`;
        timeEl.textContent = `Time: ${time}s`;
        pairsEl.textContent = `Pairs: ${matched.length/2}/${cards.length/2}`;
    }
    
    // Difficulty selector
    document.querySelectorAll('.difficulty-btn[data-size]').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            size = parseInt(btn.dataset.size);
            initGame();
        };
    });
    
    restartBtn.onclick = initGame;
    shuffleBtn.onclick = () => {
        shuffle();
        render();
    };
    
    initGame();
})();

// Color Match Game
(function(){
    const el = document.getElementById('color-game');
    const scoreEl = document.getElementById('color-score');
    const restartBtn = document.getElementById('color-restart');
    const timerBtn = document.getElementById('color-timer');
    
    let score = 0;
    let streak = 0;
    let timerMode = false;
    let timeLeft = 30;
    let gameTimer;
    
    const colors = {
        'Red': '#ef4444', 'Blue': '#3b82f6', 'Green': '#10b981', 'Yellow': '#f59e0b',
        'Purple': '#8b5cf6', 'Orange': '#f97316', 'Pink': '#ec4899', 'Brown': '#a16207',
        'Black': '#000000', 'White': '#ffffff', 'Gray': '#6b7280', 'Cyan': '#06b6d4'
    };
    
    function generateRound() {
        const colorNames = Object.keys(colors);
        const targetColor = colorNames[Math.floor(Math.random() * colorNames.length)];
        const targetName = colorNames[Math.floor(Math.random() * colorNames.length)];
        
        el.innerHTML = `
            <div style='text-align:center;margin-bottom:20px;'>
                <div style='font-size:1.2rem;font-weight:600;color:#374151;margin-bottom:10px;'>
                    Click the color that matches:
                </div>
                <div style='font-size:2rem;font-weight:700;color:${colors[targetColor]};margin-bottom:20px;'>
                    ${targetName}
                </div>
                ${timerMode ? `<div style='color:#ef4444;font-weight:600;'>Time: ${timeLeft}s</div>` : ''}
            </div>
        `;
        
        const options = [targetColor];
        while(options.length < 4) {
            const randomColor = colorNames[Math.floor(Math.random() * colorNames.length)];
            if(!options.includes(randomColor)) options.push(randomColor);
        }
        
        // Shuffle options
        for(let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        const optionsDiv = document.createElement('div');
        optionsDiv.style.cssText = `
            display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;
            max-width: 300px; margin: 0 auto;
        `;
        
        options.forEach(colorName => {
            const btn = document.createElement('button');
            btn.style.cssText = `
                padding: 20px; border: none; border-radius: 8px; cursor: pointer;
                background: ${colors[colorName]}; color: ${colorName === 'White' ? '#000' : '#fff'};
                font-size: 1rem; font-weight: 600; transition: transform 0.2s;
            `;
            btn.textContent = colorName;
            btn.onclick = () => checkAnswer(colorName, targetColor);
            btn.onmouseenter = () => btn.style.transform = 'scale(1.05)';
            btn.onmouseleave = () => btn.style.transform = 'scale(1)';
            optionsDiv.appendChild(btn);
        });
        
        el.appendChild(optionsDiv);
    }
    
    function checkAnswer(selected, target) {
        if(selected === target) {
            score += 10;
            streak++;
            alert('Correct! +10 points');
        } else {
            streak = 0;
            alert('Wrong! The correct color was ' + target);
        }
        
        updateScore();
        generateRound();
    }
    
    function updateScore() {
        scoreEl.textContent = `Score: ${score} | Streak: ${streak}`;
    }
    
    function startTimerMode() {
        timerMode = !timerMode;
        timerBtn.textContent = timerMode ? '⏱️ Normal Mode' : '⏱️ Timer Mode';
        
        if(timerMode) {
            timeLeft = 30;
            gameTimer = setInterval(() => {
                timeLeft--;
                if(timeLeft <= 0) {
                    clearInterval(gameTimer);
                    alert(`Time's up! Final score: ${score}`);
                    timerMode = false;
                    timerBtn.textContent = '⏱️ Timer Mode';
                    timeLeft = 30;
                }
                generateRound();
            }, 1000);
        } else {
            clearInterval(gameTimer);
            timeLeft = 30;
        }
        
        generateRound();
    }
    
    restartBtn.onclick = () => {
        score = 0;
        streak = 0;
        updateScore();
        generateRound();
    };
    
    timerBtn.onclick = startTimerMode;
    
    generateRound();
})();

// Number Puzzle (Sliding Puzzle)
(function(){
    const el = document.getElementById('puzzle-game');
    const movesEl = document.getElementById('puzzle-moves');
    const timeEl = document.getElementById('puzzle-time');
    const restartBtn = document.getElementById('puzzle-restart');
    const solveBtn = document.getElementById('puzzle-solve');
    
    let size = 3;
    let board = [];
    let moves = 0;
    let time = 0;
    let timer;
    let emptyPos = {x: 0, y: 0};
    
    function initPuzzle() {
        clearInterval(timer);
        time = 0;
        moves = 0;
        
        const total = size * size;
        board = [];
        for(let i = 1; i < total; i++) {
            board.push(i);
        }
        board.push(0); // Empty space
        
        shuffle();
        emptyPos = findEmpty();
        render();
        startTimer();
    }
    
    function shuffle() {
        for(let i = board.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [board[i], board[j]] = [board[j], board[i]];
        }
        // Ensure puzzle is solvable
        if(!isSolvable()) {
            [board[0], board[1]] = [board[1], board[0]];
        }
    }
    
    function isSolvable() {
        let inversions = 0;
        for(let i = 0; i < board.length - 1; i++) {
            for(let j = i + 1; j < board.length; j++) {
                if(board[i] && board[j] && board[i] > board[j]) {
                    inversions++;
                }
            }
        }
        return inversions % 2 === 0;
    }
    
    function findEmpty() {
        const index = board.indexOf(0);
        return {x: index % size, y: Math.floor(index / size)};
    }
    
    function render() {
        el.innerHTML = '';
        const grid = document.createElement('div');
        grid.style.cssText = `
            display: grid; grid-template-columns: repeat(${size}, 60px); gap: 4px;
            background: #f1f5f9; padding: 12px; border-radius: 8px;
            justify-content: center;
        `;
        
        for(let y = 0; y < size; y++) {
            for(let x = 0; x < size; x++) {
                const index = y * size + x;
                const value = board[index];
                const tile = document.createElement('div');
                
                tile.style.cssText = `
                    width: 60px; height: 60px; background: ${value === 0 ? '#e5e7eb' : '#e0e7ff'};
                    border: 2px solid #cbd5e1; border-radius: 8px; display: flex;
                    align-items: center; justify-content: center; font-size: 1.2rem;
                    font-weight: bold; color: #374151; cursor: ${value === 0 ? 'default' : 'pointer'};
                    transition: all 0.2s;
                `;
                
                tile.textContent = value || '';
                if(value !== 0) {
                    tile.onclick = () => moveTile(x, y);
                    tile.onmouseenter = () => tile.style.transform = 'scale(1.05)';
                    tile.onmouseleave = () => tile.style.transform = 'scale(1)';
                }
                
                grid.appendChild(tile);
            }
        }
        
        el.appendChild(grid);
        updateStats();
        
        // Check win condition
        if(isSolved()) {
            clearInterval(timer);
            setTimeout(() => alert(`Congratulations! Puzzle solved in ${moves} moves and ${time} seconds!`), 500);
        }
    }
    
    function moveTile(x, y) {
        const dx = Math.abs(x - emptyPos.x);
        const dy = Math.abs(y - emptyPos.y);
        
        if((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
            const fromIndex = y * size + x;
            const toIndex = emptyPos.y * size + emptyPos.x;
            
            [board[fromIndex], board[toIndex]] = [board[toIndex], board[fromIndex]];
            emptyPos = {x, y};
            moves++;
            render();
        }
    }
    
    function isSolved() {
        for(let i = 0; i < board.length - 1; i++) {
            if(board[i] !== i + 1) return false;
        }
        return board[board.length - 1] === 0;
    }
    
    function solve() {
        // Simple solve - just arrange in order
        for(let i = 0; i < board.length - 1; i++) {
            board[i] = i + 1;
        }
        board[board.length - 1] = 0;
        emptyPos = {x: size - 1, y: size - 1};
        render();
    }
    
    function startTimer() {
        timer = setInterval(() => {
            time++;
            updateStats();
        }, 1000);
    }
    
    function updateStats() {
        movesEl.textContent = `Moves: ${moves}`;
        timeEl.textContent = `Time: ${time}s`;
    }
    
    // Difficulty selector
    document.querySelectorAll('.difficulty-btn[data-size]').forEach(btn => {
        if(btn.closest('#puzzle-game')) {
            btn.onclick = () => {
                btn.closest('.game-section').querySelectorAll('.difficulty-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                size = parseInt(btn.dataset.size);
                initPuzzle();
            };
        }
    });
    
    restartBtn.onclick = initPuzzle;
    solveBtn.onclick = solve;
    
    initPuzzle();
})(); 
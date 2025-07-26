// 井字棋
(function(){
    const el = document.getElementById('tictactoe');
    let board = Array(9).fill('');
    let turn = 'X';
    let over = false;
    function render() {
        el.innerHTML = '';
        for(let i=0;i<9;i++) {
            const cell = document.createElement('button');
            cell.textContent = board[i];
            cell.className = 'ttt-cell';
            cell.style.width = cell.style.height = '60px';
            cell.style.fontSize = '2rem';
            cell.style.margin = '2px';
            cell.style.background = '#f1f5f9';
            cell.style.border = '1.5px solid #cbd5e1';
            cell.style.borderRadius = '8px';
            cell.onclick = ()=>move(i);
            el.appendChild(cell);
            if(i%3===2) el.appendChild(document.createElement('br'));
        }
    }
    function move(i) {
        if(board[i]||over) return;
        board[i]=turn;
        if(win(turn)) { setTimeout(()=>alert(turn+' 赢了!'),100); over=true; }
        else if(board.every(x=>x)) { setTimeout(()=>alert('平局!'),100); over=true; }
        else turn=turn==='X'?'O':'X';
        render();
    }
    function win(p){
        return[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some(l=>l.every(j=>board[j]===p));
    }
    el.insertAdjacentHTML('beforeend', '<button id="ttt-restart" style="margin-bottom:10px;">重新开始</button>');
    document.getElementById('ttt-restart').onclick = ()=>{board=Array(9).fill('');turn='X';over=false;render();};
    render();
})();

// 贪吃蛇
(function(){
    const canvas = document.getElementById('snake');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 20, w = 15, h = 15;
    let snake = [{x:7,y:7}], dir = {x:0,y:-1}, food = {x:3,y:3}, over=false;
    function draw() {
        ctx.clearRect(0,0,300,300);
        ctx.fillStyle = '#4f46e5';
        snake.forEach(s=>ctx.fillRect(s.x*size,s.y*size,size-2,size-2));
        ctx.fillStyle = '#f59e42';
        ctx.fillRect(food.x*size,food.y*size,size-2,size-2);
        if(over) {
            ctx.fillStyle = '#ef4444';
            ctx.font = 'bold 2rem sans-serif';
            ctx.fillText('游戏结束',70,150);
        }
    }
    function step() {
        if(over) return;
        const head = {x:snake[0].x+dir.x, y:snake[0].y+dir.y};
        if(head.x<0||head.x>=w||head.y<0||head.y>=h||snake.some(s=>s.x===head.x&&s.y===head.y)) { over=true; draw(); return; }
        snake.unshift(head);
        if(head.x===food.x&&head.y===food.y) {
            food={x:Math.floor(Math.random()*w),y:Math.floor(Math.random()*h)};
        } else {
            snake.pop();
        }
        draw();
    }
    document.addEventListener('keydown',e=>{
        if(e.key==='ArrowUp'&&dir.y!==1) dir={x:0,y:-1};
        else if(e.key==='ArrowDown'&&dir.y!==-1) dir={x:0,y:1};
        else if(e.key==='ArrowLeft'&&dir.x!==1) dir={x:-1,y:0};
        else if(e.key==='ArrowRight'&&dir.x!==-1) dir={x:1,y:0};
        else if(e.key==='r'||e.key==='R') { snake=[{x:7,y:7}]; dir={x:0,y:-1}; food={x:3,y:3}; over=false; draw(); }
    });
    setInterval(step, 160);
    draw();
})();

// 2048
(function(){
    const el = document.getElementById('game2048');
    let board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    let score = 0;
    function render() {
        el.innerHTML = `<div style='text-align:center;margin-bottom:8px;'>分数: <b>${score}</b> <button id='g2048-restart'>重开</button></div>`;
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(4,60px)';
        grid.style.gap = '6px';
        for(let i=0;i<16;i++) {
            const cell = document.createElement('div');
            cell.textContent = board[i]||'';
            cell.style.height = '60px';
            cell.style.background = board[i]?'#fbbf24':'#f1f5f9';
            cell.style.display = 'flex';
            cell.style.alignItems = 'center';
            cell.style.justifyContent = 'center';
            cell.style.fontWeight = 'bold';
            cell.style.fontSize = '1.2rem';
            cell.style.borderRadius = '8px';
            grid.appendChild(cell);
        }
        el.appendChild(grid);
        document.getElementById('g2048-restart').onclick = ()=>{score=0;board=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];add();add();render();};
    }
    function add() {
        let empty = [];
        for(let i=0;i<16;i++) if(!board[i]) empty.push(i);
        if(empty.length) board[empty[Math.floor(Math.random()*empty.length)]] = Math.random()<0.9?2:4;
    }
    function move(dir) {
        let moved = false;
        for(let i=0;i<4;i++) {
            let line = [];
            for(let j=0;j<4;j++) {
                let idx = dir<2 ? i*4+j : j*4+i;
                let val = board[dir%2?idx*4+i:idx];
                if(dir===0) val=board[i*4+j]; // left
                if(dir===1) val=board[i*4+(3-j)]; // right
                if(dir===2) val=board[j*4+i]; // up
                if(dir===3) val=board[(3-j)*4+i]; // down
                if(val) line.push(val);
            }
            for(let k=0;k<line.length-1;k++) if(line[k]===line[k+1]) {line[k]*=2;score+=line[k];line.splice(k+1,1);}
            while(line.length<4) line.push(0);
            for(let j=0;j<4;j++) {
                let idx = dir<2 ? i*4+j : j*4+i;
                if(dir===0) board[i*4+j]=line[j];
                if(dir===1) board[i*4+(3-j)]=line[j];
                if(dir===2) board[j*4+i]=line[j];
                if(dir===3) board[(3-j)*4+i]=line[j];
            }
        }
        render();
    }
    document.addEventListener('keydown',e=>{
        if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key)) {
            let before = board.slice();
            if(e.key==='ArrowLeft') move(0);
            if(e.key==='ArrowRight') move(1);
            if(e.key==='ArrowUp') move(2);
            if(e.key==='ArrowDown') move(3);
            if(board.some((v,i)=>v!==before[i])) add();
        }
    });
    add();add();render();
})(); 
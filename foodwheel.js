// 美食大转盘功能
class FoodWheel {
    constructor() {
        this.canvas = document.getElementById('foodwheel');
        this.ctx = this.canvas.getContext('2d');
        this.isSpinning = false;
        this.currentRotation = 0;
        this.selectedCategory = 'all';
        this.foods = this.initializeFoods();
        
        this.init();
    }

    init() {
        this.drawWheel();
        this.bindEvents();
        this.setupCategoryButtons();
    }

    initializeFoods() {
        return {
            all: [
                { name: '宫保鸡丁', category: 'chinese', calories: 280, protein: 25, fat: 12, carbs: 18, fiber: 3, vitamins: ['B6', 'B12'], minerals: ['Iron', 'Zinc'], description: '经典川菜，鸡肉嫩滑，花生香脆，微辣开胃' },
                { name: '意大利面', category: 'western', calories: 320, protein: 12, fat: 4, carbs: 58, fiber: 3, vitamins: ['B1', 'B2'], minerals: ['Iron', 'Magnesium'], description: '经典意式美食，面条劲道，酱料浓郁' },
                { name: '寿司拼盘', category: 'japanese', calories: 180, protein: 22, fat: 2, carbs: 25, fiber: 1, vitamins: ['B12', 'D'], minerals: ['Iodine', 'Selenium'], description: '新鲜生鱼片配醋饭，营养丰富，口感清爽' },
                { name: '韩式烤肉', category: 'korean', calories: 350, protein: 28, fat: 18, carbs: 15, fiber: 2, vitamins: ['B6', 'B12'], minerals: ['Iron', 'Zinc'], description: '腌制牛肉烤制，肉质鲜嫩，配菜丰富' },
                { name: '提拉米苏', category: 'dessert', calories: 280, protein: 8, fat: 18, carbs: 25, fiber: 1, vitamins: ['B2', 'B12'], minerals: ['Calcium', 'Phosphorus'], description: '意式经典甜点，咖啡香浓郁，口感绵密' },
                { name: '抹茶拿铁', category: 'drinks', calories: 120, protein: 6, fat: 4, carbs: 18, fiber: 1, vitamins: ['A', 'C'], minerals: ['Calcium', 'Iron'], description: '抹茶粉配牛奶，清香怡人，营养丰富' },
                { name: '红烧肉', category: 'chinese', calories: 450, protein: 20, fat: 35, carbs: 8, fiber: 1, vitamins: ['B1', 'B6'], minerals: ['Iron', 'Zinc'], description: '传统名菜，肥而不腻，入口即化' },
                { name: '披萨玛格丽特', category: 'western', calories: 290, protein: 14, fat: 12, carbs: 35, fiber: 2, vitamins: ['B1', 'C'], minerals: ['Calcium', 'Iron'], description: '经典意式披萨，番茄酱配马苏里拉奶酪' },
                { name: '天妇罗', category: 'japanese', calories: 220, protein: 8, fat: 12, carbs: 20, fiber: 2, vitamins: ['A', 'C'], minerals: ['Potassium', 'Iron'], description: '日式炸物，外酥内嫩，配天妇罗酱' },
                { name: '泡菜汤', category: 'korean', calories: 150, protein: 12, fat: 6, carbs: 18, fiber: 4, vitamins: ['A', 'C', 'K'], minerals: ['Iron', 'Calcium'], description: '韩式泡菜配豆腐，酸辣开胃，营养丰富' },
                { name: '马卡龙', category: 'dessert', calories: 90, protein: 2, fat: 4, carbs: 12, fiber: 0, vitamins: ['B2'], minerals: ['Calcium'], description: '法式经典甜点，外酥内软，色彩缤纷' },
                { name: '珍珠奶茶', category: 'drinks', calories: 200, protein: 4, fat: 6, carbs: 32, fiber: 0, vitamins: ['B2', 'B12'], minerals: ['Calcium'], description: '奶茶配珍珠，香甜浓郁，口感丰富' }
            ],
            chinese: [
                { name: '宫保鸡丁', calories: 280, protein: 25, fat: 12, carbs: 18, fiber: 3, vitamins: ['B6', 'B12'], minerals: ['Iron', 'Zinc'], description: '经典川菜，鸡肉嫩滑，花生香脆，微辣开胃' },
                { name: '红烧肉', calories: 450, protein: 20, fat: 35, carbs: 8, fiber: 1, vitamins: ['B1', 'B6'], minerals: ['Iron', 'Zinc'], description: '传统名菜，肥而不腻，入口即化' },
                { name: '麻婆豆腐', calories: 180, protein: 15, fat: 8, carbs: 12, fiber: 3, vitamins: ['B1', 'B6'], minerals: ['Iron', 'Calcium'], description: '川菜经典，豆腐嫩滑，麻辣鲜香' },
                { name: '糖醋里脊', calories: 320, protein: 22, fat: 15, carbs: 25, fiber: 1, vitamins: ['B6', 'B12'], minerals: ['Iron', 'Zinc'], description: '酸甜可口，外酥内嫩，开胃下饭' },
                { name: '水煮鱼', calories: 280, protein: 28, fat: 12, carbs: 8, fiber: 2, vitamins: ['B6', 'B12'], minerals: ['Iron', 'Selenium'], description: '川菜名品，鱼肉鲜嫩，麻辣鲜香' }
            ],
            western: [
                { name: '意大利面', calories: 320, protein: 12, fat: 4, carbs: 58, fiber: 3, vitamins: ['B1', 'B2'], minerals: ['Iron', 'Magnesium'], description: '经典意式美食，面条劲道，酱料浓郁' },
                { name: '披萨玛格丽特', calories: 290, protein: 14, fat: 12, carbs: 35, fiber: 2, vitamins: ['B1', 'C'], minerals: ['Calcium', 'Iron'], description: '经典意式披萨，番茄酱配马苏里拉奶酪' },
                { name: '牛排', calories: 350, protein: 35, fat: 18, carbs: 0, fiber: 0, vitamins: ['B6', 'B12'], minerals: ['Iron', 'Zinc'], description: '优质牛肉，肉质鲜嫩，营养丰富' },
                { name: '汉堡包', calories: 380, protein: 18, fat: 22, carbs: 28, fiber: 2, vitamins: ['B1', 'B6'], minerals: ['Iron', 'Zinc'], description: '美式经典，面包松软，肉饼多汁' },
                { name: '沙拉', calories: 120, protein: 8, fat: 6, carbs: 12, fiber: 4, vitamins: ['A', 'C', 'K'], minerals: ['Iron', 'Calcium'], description: '新鲜蔬菜，健康低卡，营养丰富' }
            ],
            japanese: [
                { name: '寿司拼盘', calories: 180, protein: 22, fat: 2, carbs: 25, fiber: 1, vitamins: ['B12', 'D'], minerals: ['Iodine', 'Selenium'], description: '新鲜生鱼片配醋饭，营养丰富，口感清爽' },
                { name: '天妇罗', calories: 220, protein: 8, fat: 12, carbs: 20, fiber: 2, vitamins: ['A', 'C'], minerals: ['Potassium', 'Iron'], description: '日式炸物，外酥内嫩，配天妇罗酱' },
                { name: '拉面', calories: 380, protein: 18, fat: 12, carbs: 45, fiber: 3, vitamins: ['B1', 'B6'], minerals: ['Iron', 'Sodium'], description: '日式拉面，汤底浓郁，面条劲道' },
                { name: '刺身', calories: 120, protein: 25, fat: 2, carbs: 0, fiber: 0, vitamins: ['B12', 'D'], minerals: ['Iodine', 'Selenium'], description: '新鲜生鱼片，原汁原味，营养丰富' },
                { name: '味增汤', calories: 80, protein: 6, fat: 3, carbs: 8, fiber: 2, vitamins: ['B1', 'B2'], minerals: ['Iron', 'Calcium'], description: '日式传统汤品，味增香浓，营养丰富' }
            ],
            korean: [
                { name: '韩式烤肉', calories: 350, protein: 28, fat: 18, carbs: 15, fiber: 2, vitamins: ['B6', 'B12'], minerals: ['Iron', 'Zinc'], description: '腌制牛肉烤制，肉质鲜嫩，配菜丰富' },
                { name: '泡菜汤', calories: 150, protein: 12, fat: 6, carbs: 18, fiber: 4, vitamins: ['A', 'C', 'K'], minerals: ['Iron', 'Calcium'], description: '韩式泡菜配豆腐，酸辣开胃，营养丰富' },
                { name: '石锅拌饭', calories: 420, protein: 16, fat: 18, carbs: 45, fiber: 4, vitamins: ['A', 'C', 'B6'], minerals: ['Iron', 'Calcium'], description: '韩式拌饭，蔬菜丰富，营养均衡' },
                { name: '炸鸡', calories: 380, protein: 22, fat: 22, carbs: 18, fiber: 1, vitamins: ['B6', 'B12'], minerals: ['Iron', 'Zinc'], description: '韩式炸鸡，外酥内嫩，配啤酒绝配' },
                { name: '冷面', calories: 280, protein: 12, fat: 4, carbs: 45, fiber: 3, vitamins: ['B1', 'B6'], minerals: ['Iron', 'Sodium'], description: '韩式冷面，清爽开胃，适合夏天' }
            ],
            dessert: [
                { name: '提拉米苏', calories: 280, protein: 8, fat: 18, carbs: 25, fiber: 1, vitamins: ['B2', 'B12'], minerals: ['Calcium', 'Phosphorus'], description: '意式经典甜点，咖啡香浓郁，口感绵密' },
                { name: '马卡龙', calories: 90, protein: 2, fat: 4, carbs: 12, fiber: 0, vitamins: ['B2'], minerals: ['Calcium'], description: '法式经典甜点，外酥内软，色彩缤纷' },
                { name: '巧克力蛋糕', calories: 320, protein: 6, fat: 22, carbs: 28, fiber: 2, vitamins: ['B2', 'B12'], minerals: ['Iron', 'Magnesium'], description: '经典巧克力蛋糕，浓郁香甜，口感丰富' },
                { name: '冰淇淋', calories: 180, protein: 4, fat: 8, carbs: 22, fiber: 0, vitamins: ['A', 'B2'], minerals: ['Calcium'], description: '夏日必备，口感绵密，口味多样' },
                { name: '芝士蛋糕', calories: 350, protein: 8, fat: 25, carbs: 22, fiber: 0, vitamins: ['A', 'B2'], minerals: ['Calcium', 'Phosphorus'], description: '美式经典，口感绵密，奶香浓郁' }
            ],
            drinks: [
                { name: '抹茶拿铁', calories: 120, protein: 6, fat: 4, carbs: 18, fiber: 1, vitamins: ['A', 'C'], minerals: ['Calcium', 'Iron'], description: '抹茶粉配牛奶，清香怡人，营养丰富' },
                { name: '珍珠奶茶', calories: 200, protein: 4, fat: 6, carbs: 32, fiber: 0, vitamins: ['B2', 'B12'], minerals: ['Calcium'], description: '奶茶配珍珠，香甜浓郁，口感丰富' },
                { name: '果汁', calories: 100, protein: 1, fat: 0, carbs: 24, fiber: 2, vitamins: ['A', 'C'], minerals: ['Potassium'], description: '新鲜水果榨汁，维生素丰富，天然健康' },
                { name: '咖啡', calories: 5, protein: 1, fat: 0, carbs: 1, fiber: 0, vitamins: ['B2', 'B3'], minerals: ['Magnesium'], description: '经典咖啡，提神醒脑，低卡健康' },
                { name: '柠檬水', calories: 30, protein: 0, fat: 0, carbs: 8, fiber: 0, vitamins: ['C'], minerals: ['Potassium'], description: '清爽柠檬水，维生素C丰富，夏日必备' }
            ]
        };
    }

    drawWheel() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        
        const foods = this.foods[this.selectedCategory];
        const sliceAngle = (2 * Math.PI) / foods.length;
        
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 绘制转盘切片
        foods.forEach((food, index) => {
            const startAngle = index * sliceAngle + this.currentRotation;
            const endAngle = (index + 1) * sliceAngle + this.currentRotation;
            
            // 交替颜色
            const color = index % 2 === 0 ? '#fbbf24' : '#34d399';
            
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.closePath();
            this.ctx.fillStyle = color;
            this.ctx.fill();
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // 绘制文字
            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(startAngle + sliceAngle / 2);
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = '#1f2937';
            this.ctx.font = 'bold 14px Arial';
            
            // 文字换行处理
            const text = food.name;
            const maxWidth = radius * 0.6;
            if (this.ctx.measureText(text).width > maxWidth) {
                const words = text.split('');
                let line = '';
                let y = -5;
                for (let i = 0; i < words.length; i++) {
                    const testLine = line + words[i];
                    if (this.ctx.measureText(testLine).width > maxWidth) {
                        this.ctx.fillText(line, 0, y);
                        line = words[i];
                        y += 20;
                    } else {
                        line = testLine;
                    }
                }
                this.ctx.fillText(line, 0, y);
            } else {
                this.ctx.fillText(text, 0, 0);
            }
            
            this.ctx.restore();
        });
        
        // 绘制中心圆
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#ef4444';
        this.ctx.fill();
        this.ctx.strokeStyle = '#fff';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }

    spin() {
        if (this.isSpinning) return;
        
        this.isSpinning = true;
        const spinBtn = document.getElementById('spin-btn');
        spinBtn.disabled = true;
        spinBtn.textContent = '🎡 转动中...';
        
        // 随机旋转角度
        const spinDuration = 3000;
        const minSpins = 5;
        const maxSpins = 10;
        const spins = Math.random() * (maxSpins - minSpins) + minSpins;
        const finalRotation = this.currentRotation + (spins * 2 * Math.PI);
        
        // 设置CSS动画
        this.canvas.style.setProperty('--final-rotation', `${finalRotation}rad`);
        this.canvas.classList.add('wheel-spinning');
        
        // 动画结束后显示结果
        setTimeout(() => {
            this.canvas.classList.remove('wheel-spinning');
            this.currentRotation = finalRotation % (2 * Math.PI);
            this.showResult();
            
            this.isSpinning = false;
            spinBtn.disabled = false;
            spinBtn.textContent = '🎯 再次转动';
        }, spinDuration);
    }

    showResult() {
        const foods = this.foods[this.selectedCategory];
        const sliceAngle = (2 * Math.PI) / foods.length;
        
        // 计算指针指向的食物
        let pointerAngle = (this.currentRotation + Math.PI / 2) % (2 * Math.PI);
        if (pointerAngle < 0) pointerAngle += 2 * Math.PI;
        
        const selectedIndex = Math.floor(pointerAngle / sliceAngle);
        const selectedFood = foods[selectedIndex];
        
        // 显示结果
        const resultSection = document.getElementById('result-section');
        const foodResult = document.getElementById('food-result');
        
        foodResult.innerHTML = `
            <div class="food-info">
                <div class="food-card">
                    <h3>🍽️ ${selectedFood.name}</h3>
                    <p>${selectedFood.description}</p>
                    <div class="health-tips">
                        <h4>💡 健康建议</h4>
                        <p>${this.generateHealthTips(selectedFood)}</p>
                    </div>
                </div>
                
                <div class="food-card">
                    <h4>📊 营养成分 (每100g)</h4>
                    <div class="nutrition-grid">
                        <div class="nutrition-item">
                            <div class="nutrition-value">${selectedFood.calories}</div>
                            <div class="nutrition-label">卡路里</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${selectedFood.protein}g</div>
                            <div class="nutrition-label">蛋白质</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${selectedFood.fat}g</div>
                            <div class="nutrition-label">脂肪</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${selectedFood.carbs}g</div>
                            <div class="nutrition-label">碳水化合物</div>
                        </div>
                        <div class="nutrition-item">
                            <div class="nutrition-value">${selectedFood.fiber}g</div>
                            <div class="nutrition-label">膳食纤维</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 1rem;">
                        <h5>💊 维生素</h5>
                        <p>${selectedFood.vitamins.join(', ')}</p>
                        
                        <h5>🪨 矿物质</h5>
                        <p>${selectedFood.minerals.join(', ')}</p>
                    </div>
                </div>
            </div>
        `;
        
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    generateHealthTips(food) {
        let tips = [];
        
        if (food.calories < 200) {
            tips.push('低卡路里，适合减肥期间食用');
        } else if (food.calories > 400) {
            tips.push('热量较高，建议适量食用');
        }
        
        if (food.protein > 20) {
            tips.push('蛋白质丰富，有助于肌肉生长');
        }
        
        if (food.fat > 20) {
            tips.push('脂肪含量较高，注意控制摄入量');
        }
        
        if (food.fiber > 3) {
            tips.push('膳食纤维丰富，有助于消化健康');
        }
        
        if (food.vitamins.includes('C')) {
            tips.push('富含维生素C，增强免疫力');
        }
        
        if (food.vitamins.includes('B12')) {
            tips.push('富含维生素B12，有助于神经系统健康');
        }
        
        if (food.minerals.includes('Iron')) {
            tips.push('富含铁元素，有助于预防贫血');
        }
        
        if (food.minerals.includes('Calcium')) {
            tips.push('富含钙元素，有助于骨骼健康');
        }
        
        return tips.length > 0 ? tips.join('；') : '营养均衡，适量食用即可';
    }

    setupCategoryButtons() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 移除所有active类
                categoryBtns.forEach(b => b.classList.remove('active'));
                // 添加active类到当前按钮
                btn.classList.add('active');
                
                // 更新选中的类别
                this.selectedCategory = btn.getAttribute('data-category');
                
                // 重新绘制转盘
                this.drawWheel();
                
                // 隐藏之前的结果
                document.getElementById('result-section').style.display = 'none';
            });
        });
    }

    bindEvents() {
        const spinBtn = document.getElementById('spin-btn');
        spinBtn.addEventListener('click', () => {
            this.spin();
        });
    }
}

// 初始化美食大转盘
document.addEventListener('DOMContentLoaded', () => {
    new FoodWheel();
});

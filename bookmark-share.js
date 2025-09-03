// 收藏按钮和分享功能
class BookmarkManager {
    constructor() {
        this.init();
    }

    init() {
        this.createBookmarkButton();
        this.createToast();
        this.loadBookmarkState();
        this.bindEvents();
    }

    createBookmarkButton() {
        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.innerHTML = '🔖';
        bookmarkBtn.setAttribute('aria-label', '收藏此页面');
        bookmarkBtn.title = '收藏此页面';
        
        document.body.appendChild(bookmarkBtn);
        this.bookmarkBtn = bookmarkBtn;
    }

    createToast() {
        const toast = document.createElement('div');
        toast.className = 'bookmark-toast';
        toast.style.display = 'none';
        document.body.appendChild(toast);
        this.toast = toast;
    }

    loadBookmarkState() {
        const currentUrl = window.location.href;
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
        const isBookmarked = bookmarks[currentUrl];
        
        if (isBookmarked) {
            this.bookmarkBtn.classList.add('bookmarked');
            this.bookmarkBtn.innerHTML = '✅';
            this.bookmarkBtn.title = '取消收藏';
        }
    }

    bindEvents() {
        this.bookmarkBtn.addEventListener('click', () => {
            this.toggleBookmark();
        });
    }

    toggleBookmark() {
        const currentUrl = window.location.href;
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
        const isBookmarked = bookmarks[currentUrl];

        if (isBookmarked) {
            // 取消收藏
            delete bookmarks[currentUrl];
            this.bookmarkBtn.classList.remove('bookmarked');
            this.bookmarkBtn.innerHTML = '🔖';
            this.bookmarkBtn.title = '收藏此页面';
            this.showToast('已取消收藏', 'success');
        } else {
            // 添加收藏
            bookmarks[currentUrl] = {
                url: currentUrl,
                title: document.title,
                timestamp: Date.now()
            };
            this.bookmarkBtn.classList.add('bookmarked');
            this.bookmarkBtn.innerHTML = '✅';
            this.bookmarkBtn.title = '取消收藏';
            this.showToast('已添加到收藏夹', 'success');
        }

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    showToast(message, type = 'success') {
        this.toast.textContent = message;
        this.toast.className = `bookmark-toast ${type}`;
        this.toast.style.display = 'block';
        
        setTimeout(() => {
            this.toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            this.toast.classList.remove('show');
            setTimeout(() => {
                this.toast.style.display = 'none';
            }, 300);
        }, 3000);
    }
}

// 国外主流媒体分享功能
class SocialShareManager {
    constructor() {
        this.init();
    }

    init() {
        this.createShareButtons();
        this.bindEvents();
    }

    createShareButtons() {
        const shareSection = document.querySelector('.share-section .share-buttons');
        if (!shareSection) return;

        // 添加国外主流媒体分享按钮
        const foreignPlatforms = [
            { name: 'Twitter', icon: '🐦', url: 'https://twitter.com/intent/tweet' },
            { name: 'Facebook', icon: '📘', url: 'https://www.facebook.com/sharer/sharer.php' },
            { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/sharing/share-offsite' },
            { name: 'Reddit', icon: '🤖', url: 'https://reddit.com/submit' },
            { name: 'WhatsApp', icon: '💬', url: 'https://wa.me' },
            { name: 'Telegram', icon: '📱', url: 'https://t.me/share/url' },
            { name: 'Pinterest', icon: '📌', url: 'https://pinterest.com/pin/create/button' },
            { name: 'Tumblr', icon: '📝', url: 'https://www.tumblr.com/share' },
            { name: 'Discord', icon: '🎮', url: 'https://discord.com/channels/@me' },
            { name: 'Slack', icon: '💻', url: 'https://slack.com/intl/en-cn/' }
        ];

        foreignPlatforms.forEach(platform => {
            const shareBtn = document.createElement('a');
            shareBtn.className = 'share-btn';
            shareBtn.href = '#';
            shareBtn.innerHTML = `${platform.icon} ${platform.name}`;
            shareBtn.setAttribute('data-platform', platform.name.toLowerCase());
            shareBtn.setAttribute('aria-label', `分享到${platform.name}`);
            
            shareSection.appendChild(shareBtn);
        });
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('share-btn')) {
                e.preventDefault();
                const platform = e.target.getAttribute('data-platform');
                this.shareTo(platform);
            }
        });
    }

    shareTo(platform) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const description = encodeURIComponent(this.getPageDescription());

        let shareUrl = '';
        
        switch (platform) {
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}&via=RandomFunction`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                break;
            case 'reddit':
                shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
                break;
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${title}%20${url}`;
                break;
            case 'telegram':
                shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
                break;
            case 'pinterest':
                shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${title}`;
                break;
            case 'tumblr':
                shareUrl = `https://www.tumblr.com/share/link?url=${url}&description=${title}`;
                break;
            case 'discord':
                shareUrl = `https://discord.com/channels/@me`;
                // Discord需要手动复制链接
                this.copyToClipboard(window.location.href);
                this.showShareToast('链接已复制到剪贴板，请在Discord中粘贴');
                return;
            case 'slack':
                shareUrl = `https://slack.com/intl/en-cn/`;
                // Slack需要手动复制链接
                this.copyToClipboard(window.location.href);
                this.showShareToast('链接已复制到剪贴板，请在Slack中粘贴');
                return;
            default:
                return;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
    }

    getPageDescription() {
        const metaDesc = document.querySelector('meta[name="description"]');
        return metaDesc ? metaDesc.getAttribute('content') : 'Check out this amazing tool!';
    }

    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }

    showShareToast(message) {
        // 使用现有的toast系统
        if (window.bookmarkManager) {
            window.bookmarkManager.showToast(message, 'success');
        }
    }
}

// 页面内容概要生成器
class PageSummaryGenerator {
    constructor() {
        this.init();
    }

    init() {
        this.createPageSummary();
    }

    createPageSummary() {
        const footer = document.querySelector('.footer-links');
        if (!footer) return;

        const summarySection = document.createElement('div');
        summarySection.className = 'page-summary';
        summarySection.style.cssText = `
            margin-top: 3rem;
            padding: 2rem;
            background: #f8fafc;
            border-radius: 12px;
            border-left: 4px solid #6366f1;
        `;

        const summaryTitle = document.createElement('h3');
        summaryTitle.textContent = '📋 页面内容概要';
        summaryTitle.style.cssText = `
            color: #3730a3;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        `;

        const summaryContent = document.createElement('div');
        summaryContent.innerHTML = this.generateSummary();

        summarySection.appendChild(summaryTitle);
        summarySection.appendChild(summaryContent);
        
        footer.parentNode.insertBefore(summarySection, footer);
    }

    generateSummary() {
        const currentPage = this.getCurrentPage();
        const summaries = {
            'index': `
                <p><strong>🔢 简单随机数生成器</strong> - 这是一个免费的在线随机数生成工具，提供以下核心功能：</p>
                <ul>
                    <li>🎯 自定义数量：可生成1-20个随机数</li>
                    <li>🔢 自定义位数：每个数字1-12位</li>
                    <li>⚡ 即时生成：无需等待，点击即得</li>
                    <li>🔒 安全可靠：使用加密安全算法</li>
                    <li>📱 移动友好：支持所有设备访问</li>
                </ul>
                <p><strong>适用场景：</strong>密码生成、游戏随机、统计抽样、加密应用、测试数据等。</p>
            `,
            'randnum': `
                <p><strong>🎲 高级随机数生成器</strong> - 专业级随机数生成工具，具备以下高级特性：</p>
                <ul>
                    <li>🎯 自定义范围：设置最小值和最大值</li>
                    <li>🔢 批量生成：一次最多生成1000个数字</li>
                    <li>✨ 唯一性选项：确保无重复数字</li>
                    <li>📋 一键复制：结果直接复制到剪贴板</li>
                    <li>🔬 专业应用：适用于统计分析和密码学</li>
                </ul>
                <p><strong>专业用途：</strong>Monte Carlo模拟、加密密钥生成、科学研究、数据分析等。</p>
            `,
            'password': `
                <p><strong>🔒 强密码生成器</strong> - 专业的密码安全工具，提供以下安全特性：</p>
                <ul>
                    <li>🔐 长度自定义：6-32位密码长度</li>
                    <li>🎨 字符类型：支持大小写字母、数字、符号</li>
                    <li>🛡️ 强度评估：实时密码强度检测</li>
                    <li>📚 安全指南：密码安全最佳实践</li>
                    <li>💡 使用建议：针对不同账户的密码策略</li>
                </ul>
                <p><strong>安全应用：</strong>在线账户、邮箱、银行、社交媒体等各类账户密码生成。</p>
            `,
            'games': `
                <p><strong>🎮 迷你游戏集合</strong> - 有趣的浏览器游戏合集，包含以下游戏：</p>
                <ul>
                    <li>⭕ 井字棋：经典3x3网格游戏，支持AI对战</li>
                    <li>🐍 贪吃蛇：经典蛇形游戏，支持暂停和重启</li>
                    <li>🔢 2048：数字合并益智游戏</li>
                    <li>🧠 记忆匹配：测试记忆力的卡片游戏</li>
                    <li>🎨 颜色匹配：颜色识别游戏</li>
                    <li>🧩 数字拼图：滑块数字排序游戏</li>
                </ul>
                <p><strong>游戏特色：</strong>无需下载、完全免费、支持移动端、离线可玩。</p>
            `,
            'menu': `
                <p><strong>🗺️ 网站地图</strong> - RandomFunction.Online的完整导航指南：</p>
                <ul>
                    <li>🔧 随机数工具：简单和高级随机数生成器</li>
                    <li>🔒 安全工具：强密码生成器</li>
                    <li>🎮 娱乐游戏：迷你游戏集合</li>
                    <li>🌟 特色功能：免费使用、移动优化、安全可靠</li>
                    <li>🎯 使用场景：密码安全、统计分析、游戏娱乐、科学研究</li>
                </ul>
                <p><strong>网站价值：</strong>提供专业、安全、免费的在线工具，满足各种随机数生成需求。</p>
            `,
            'foodwheel': `
                <p><strong>🍽️ 美食大转盘</strong> - 随机美食推荐和营养分析工具：</p>
                <ul>
                    <li>🎡 随机推荐：转动转盘获得美食建议</li>
                    <li>🍎 营养分析：详细的食物营养成分信息</li>
                    <li>🌍 全球美食：包含中西方各类美食</li>
                    <li>📊 健康数据：卡路里、蛋白质、脂肪等营养指标</li>
                    <li>💡 健康建议：基于营养的饮食建议</li>
                </ul>
                <p><strong>使用价值：</strong>帮助用户发现新美食、了解营养知识、做出健康饮食选择。</p>
            `
        };

        return summaries[currentPage] || summaries['index'];
    }

    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('index') || path === '/') return 'index';
        if (path.includes('randnum')) return 'randnum';
        if (path.includes('password')) return 'password';
        if (path.includes('games')) return 'games';
        if (path.includes('menu')) return 'menu';
        if (path.includes('foodwheel')) return 'foodwheel';
        return 'index';
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    window.bookmarkManager = new BookmarkManager();
    new SocialShareManager();
    new PageSummaryGenerator();
});

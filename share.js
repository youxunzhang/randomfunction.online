function shareTo(platform) {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const text = encodeURIComponent('Check out this Random Password Generator!');
    
    switch(platform) {
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`,'_blank');
            break;
        case 'facebook':
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`,'_blank');
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`,'_blank');
            break;
        case 'reddit':
            window.open(`https://reddit.com/submit?url=${url}&title=${title}`,'_blank');
            break;
        case 'whatsapp':
            window.open(`https://wa.me/?text=${text}%20${url}`,'_blank');
            break;
        case 'telegram':
            window.open(`https://t.me/share/url?url=${url}&text=${title}`,'_blank');
            break;
        case 'pinterest':
            window.open(`https://pinterest.com/pin/create/button/?url=${url}&description=${title}`,'_blank');
            break;
        case 'tumblr':
            window.open(`https://www.tumblr.com/share/link?url=${url}&description=${title}`,'_blank');
            break;
        case 'email':
            window.open(`mailto:?subject=${title}&body=${text}%20${url}`,'_blank');
            break;
        case 'wechat':
            alert('请使用微信"扫一扫"功能扫描当前页面网址进行分享。');
            break;
        case 'qq':
            window.open(`https://connect.qq.com/widget/shareqq/index.html?url=${url}&title=${title}`,'_blank');
            break;
        case 'weibo':
            window.open(`https://service.weibo.com/share/share.php?url=${url}&title=${title}`,'_blank');
            break;
        default:
            // Fallback to copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('链接已复制到剪贴板！');
            }).catch(() => {
                alert('无法复制链接，请手动复制：' + window.location.href);
            });
    }
} 
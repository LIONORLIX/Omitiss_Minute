function setBackground(){
    // 添加transition样式
    document.body.style.transition = 'background-color 2s';
    document.body.style.backgroundColor = checkStatus().isDay ? '#ffffff' : '#000000';
}

function setVideoPlay(){
    const status = checkStatus();
    const videoContainer = document.getElementById('video-container');
    
    // 如果已经存在视频，且 videoIndex 为 0，则移除视频
    if (status.videoIndex === 0) {
        if (videoContainer.querySelector('video')) {
            videoContainer.innerHTML = '';
        }
        return;
    }
    
    let videoElement = videoContainer.querySelector('video');
    const videoPath = `./media/test.mov`; 
    
    if (!videoElement) {
        videoElement = document.createElement('video');
        videoElement.style.position = 'fixed';
        videoElement.style.top = '0';
        videoElement.style.left = '0';
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        videoElement.style.zIndex = '-1';
        videoElement.muted = true;
        videoElement.loop = true;
        videoContainer.appendChild(videoElement);
        
        // 只在创建新视频元素时设置src和播放
        videoElement.src = videoPath;
        videoElement.play().catch(error => {
            console.log('视频播放失败:', error);
        });
    }
}

function init() {
    setVideoPlay();
    // 100ms检查一次状态
    setInterval(() => {
        setVideoPlay();
    }, 100);
}
document.addEventListener('DOMContentLoaded', init);
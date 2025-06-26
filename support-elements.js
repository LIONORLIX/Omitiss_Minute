function setBackground(){
    // 添加transition样式
    // document.body.style.transition = 'background-color 2s';
    document.body.style.backgroundColor = checkStatus().isDay ? '#ffffff' : '#000000';
}

function setTitle(timeObj){
    let container = document.getElementById('title-time-container');
    container.innerHTML = `
        <div id="omitiss-title-group">
            <div class="title-content" id="title-omitiss">OMITISS</div>
            <div class="title-content" id="title-time">MINUTE</div>   
            <div class="title-content" id="omitiss-time"></div>
        </div>`;
    const hour = String(Math.floor(timeObj.hour))
    const minute = String(Math.floor(timeObj.minute))
    document.getElementById('omitiss-time').textContent = `${hour}:${minute}`;
}

function setVideoPlay(){
    const status = checkStatus();
    const videoContainer = document.getElementById('video-container');
    
    let videoElement = videoContainer.querySelector('video');
    let videoPath = ''; 

    switch (status.videoIndex) {
        case 0:
            if (videoContainer.querySelector('video')) {
                videoContainer.innerHTML = '';
            }
            return;
        case 1:
            videoPath = './media/videos/testComp1.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 2:
            videoPath = './media/videos/testComp2.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 3:
            videoPath = './media/videos/testComp3.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 4:
            videoPath = './media/videos/testComp4.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 5:
            videoPath = './media/videos/testComp5.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 6:
            videoPath = './media/videos/testComp6.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 7:
            videoPath = './media/videos/testComp7.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 8:
            videoPath = './media/videos/testComp8.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 9:
            videoPath = './media/videos/testComp9.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 10:
            videoPath = './media/videos/testComp10.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 11:
            videoPath = './media/videos/testComp11.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        case 12:
            videoPath = './media/videos/testComp12.mp4';
            console.log(status.videoIndex)
            console.log(status.hour)
            break;
        default:
            videoPath = '';
    }
    
    if (!videoElement) {
        videoElement = document.createElement('video');
        videoElement.style.position = 'fixed';
        videoElement.style.top = '0';
        videoElement.style.left = '0';
        videoElement.style.width = '100%';
        videoElement.style.height = '100%';
        videoElement.style.objectFit = 'cover';
        // videoElement.style.zIndex = '-1';
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
    setTitle(getTime());
    // 100ms检查一次状态
    setInterval(() => {
        setVideoPlay();
    }, 100);
    setInterval(() => {
        setTitle(getTime());
    }, 1000);
}
document.addEventListener('DOMContentLoaded', init);
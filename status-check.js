// 开发模式，如果为true，则根据baseTime和testSpeed计算时间
// 如果为false，则使用当前时间
let isDevMode = true;
let baseTime = new Date('2025-05-29T09:18:57');
let startTime = new Date();
let testSpeed = 1;

let animationDuration = 1;

// 获取当前时间
function getTime(){
    let now = new Date();
    if (isDevMode){
        // 计算从设定好的开始时间到现在经过的毫秒数
        let elapsedMs = (now.getTime() - startTime.getTime())*testSpeed;
        now = new Date(baseTime.getTime() + elapsedMs);
    }
    let hour = now.getHours() + now.getMinutes() / 60;
    let minute = now.getMinutes() + now.getSeconds() / 60;
    let second = now.getSeconds() + now.getMilliseconds() / 1000;
    return { hour: hour, minute: minute, second: second };
}

// 检查时间，根据时间显示对应状态
function checkStatus(){
    let isScalesSecondShow = false;
    let isTextShow = false;
    let isDay = false;
    let videoIndex = 0;
    let isTextShowProgress = 0;  // 动画切换进度
    let isMinuteShowProgress = 0;  // 动画切换进度

    let hour = Math.floor(getTime().hour)
    let minute = Math.floor(getTime().minute)
    let second = getTime().second

    if (hour>=7 && hour<19){
        isDay = true;
        
    }else{
        isDay = false;
        videoIndex = 0;
        isTextShow = true;
        isScalesSecondShow = false;
        videoIndex = 0;

        if (hour == 19 && minute == 0 && second <= animationDuration){
            isTextShowProgress = second / animationDuration;
        }else{
            isTextShowProgress = 1;
        }
    }

    if (isDay){
        for (let i=7; i<19; i++){
            if (hour<=9){
                if (minute<=hour+10 && minute>=hour+10-5){
                    isScalesSecondShow = true;
                    isTextShow = true;
                    if (minute==hour+10){
                        videoIndex = i-6;
                    }
                    if (minute == hour+10-5 && second <= animationDuration){
                        isTextShowProgress = second / animationDuration;
                        isMinuteShowProgress = second / animationDuration
                    }else{
                        isTextShowProgress = 1;
                        isMinuteShowProgress = 1;
                    }
                }else{
                    isTextShowProgress = 0;
                }

                if (hour == 7 && minute == 0 && second <= animationDuration){
                    isTextShowProgress = 1 - second / animationDuration;
                }else{
                    isTextShowProgress = 0;
                }

            }else if (hour<=12){
                if (minute<=hour && minute>=hour-5){
                    isScalesSecondShow = true;
                    isTextShow = true;
                    if (minute==hour){
                        videoIndex = i-6;
                    }
                    if (minute == hour-5 && second <= animationDuration){
                        isTextShowProgress = second / animationDuration;
                        isMinuteShowProgress = second / animationDuration
                    }else{
                        isTextShowProgress = 1;
                        isMinuteShowProgress = 1;
                    }
                }else{
                    isTextShowProgress = 0;
                }
            }else{
                if (minute<=hour-12+10 && minute>=hour-12+10-5){
                    isScalesSecondShow = true;
                    isTextShow = true;
                    if (minute==hour-12+10){
                        videoIndex = i-6;
                    }
                    if (minute == hour-12+10-5 && second <= animationDuration){
                        isTextShowProgress = second / animationDuration;
                        isMinuteShowProgress = second / animationDuration
                    }else{
                        isTextShowProgress = 1;
                        isMinuteShowProgress = 1;
                    }
                }else{
                    isTextShowProgress = 0;
                }
            }
        }

    }

    return { 
        isScalesSecondShow: isScalesSecondShow,
        isTextShow: isTextShow,
        isDay: isDay,
        videoIndex: videoIndex,
        isTextShowProgress: isTextShowProgress,
        isMinuteShowProgress: isMinuteShowProgress
    };

}
let isDevMode = true;
let baseTime = new Date('2024-05-29T07:09:55');
let startTime = new Date();
let testSpeed = 50;

function getTime(){
    let now = new Date();
    if (isDevMode){
        // 计算从开始到现在经过的毫秒数
        let elapsedMs = (now.getTime() - startTime.getTime())*testSpeed;
        now = new Date(baseTime.getTime() + elapsedMs);
    }
    let hour = now.getHours() + now.getMinutes() / 60;
    let minute = now.getMinutes() + now.getSeconds() / 60;
    let second = now.getSeconds() + now.getMilliseconds() / 1000;
    return { hour: hour, minute: minute, second: second };
}

function checkStatus(){
    let isScalesSecondShow = false;
    let isTextShow = false;
    let isDay = false;
    let videoIndex = 0;

    let hour = Math.floor(getTime().hour)
    let minute = Math.floor(getTime().minute)

    if (hour>=7 && hour<19){
        isDay = true;
    }else{
        isDay = false;
        videoIndex = 0;
        isTextShow = true;
        isScalesSecondShow = false;
        videoIndex = 0;
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
                }
            }else if (hour<=12){
                if (minute<=hour && minute>=hour-5){
                    isScalesSecondShow = true;
                    isTextShow = true;
                    if (minute==hour){
                        videoIndex = i-6;
                    }
                }
            }else{
                if (minute<=hour-12+10 && minute>=hour-12+10-5){
                    isScalesSecondShow = true;
                    isTextShow = true;
                    if (minute==hour-12+10){
                        videoIndex = i-6;
                    }
                }
            }
        }
    }

    return { 
        isScalesSecondShow: isScalesSecondShow,
        isTextShow: isTextShow,
        isDay: isDay,
        videoIndex: videoIndex
    };

}
function getTime(){
    const now = new Date();
    const hour = now.getHours() + now.getMinutes() / 60;
    const minute = now.getMinutes() + now.getSeconds() / 60;
    const second = now.getSeconds() + now.getMilliseconds() / 1000;
    
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
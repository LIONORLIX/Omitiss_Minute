// 该部分负责监测当前时间，根据时间状态控制网页各元素的出现、消失和动态

// TO DO:
// 刻度动画适当变慢
// 各组件动画的变化时间分离 ✅
// Bug：若在视频播放期间打开网站，网站并不是在指定时间戳播放，而是从头开始播放
// 字体替换为Omitiss ✅
// 所有点坐标位置检查，整点是否对齐：重点关注13:37、08:18、12:00的对齐
// 调试模式加一个时间定格 ✅
// 视频结束后的切换瞬间动态如何设计，需要再做考虑
// 检查图形的描边：应该是居中描边 ✅
// 检查图形的描边：粗细应是多少、并尝试解决锯齿问题
// 左上角加上字体标题、时间出现、适时变粗等
// 增加视频播放时的时间显示
// 测试视频生成和替换
// 手机端响应式布局处理


// 开发模式，如果为true，则根据baseTime和testSpeed计算时间
// 如果为false，则使用当前真实时间
let isDevMode = true;
// let isDevMode = false;

// 测试时间组
// let baseTime = new Date('2025-05-29T09:13:58'); // 9:14刻度出现前若干秒，通用测试
// let baseTime = new Date('2025-05-29T08:13:05'); // 8点时段刻度出现后，通用测试
// let baseTime = new Date('2025-05-29T13:05:58'); // 13点刻度出现前若干秒，此时时针分针重叠在一起
// let baseTime = new Date('2025-05-29T13:36:58'); // 13:37前若干秒，图形会切向对齐
let baseTime = new Date('2025-05-29T08:17:58'); // 8:18视频出现前若干秒，Omitiss的logo来源
// let baseTime = new Date('2025-05-29T12:00:00'); // 中午12:00
// let baseTime = new Date('2025-05-29T18:59:58'); // 白昼至黑夜前若干秒
// let baseTime = new Date('2025-05-29T06:59:58'); // 黑夜至白昼前若干秒

let startTime = new Date();
let testSpeed = 1;

let mainAnimationDuration = 10;
let minuteAnimationDuration = 8;
let textAnimationDuration = 1;
let scaleAnimationDuration = 5;

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
    let isScaleShowProgress = 0;  // 动画切换进度

    let hour = Math.floor(getTime().hour)
    let minute = Math.floor(getTime().minute)
    // let second = Math.floor(getTime().second)
    let second = getTime().second

    if (hour>=7 && hour<19){
        isDay = true;
        
    }else{
        isDay = false;
        videoIndex = 0;
        isTextShow = true;
        isScalesSecondShow = false;
        videoIndex = 0;

        if (hour == 19 && minute == 0 && second <= mainAnimationDuration){
            //isTextShowProgress = (second / textAnimationDuration) >= 1 ? 1 : (second / textAnimationDuration);
            isTextShowProgress = 1;
        }else{
            isTextShowProgress = 1;
        }
    }

    if (isDay){
        if (hour<=9){
            if (minute<=hour+10 && minute>=hour+10-5){
                isScalesSecondShow = true;
                isTextShow = true;
                if (minute == hour+10){
                    videoIndex = hour-6;
                }
                if (minute == hour+10-5 && second <= mainAnimationDuration){
                    //isTextShowProgress = (second / textAnimationDuration) >= 1 ? 1 : (second / textAnimationDuration);
                    isTextShowProgress = 1;
                    isMinuteShowProgress = (second / minuteAnimationDuration) >= 1 ? 1 : (second / minuteAnimationDuration);
                    isScaleShowProgress = (second / scaleAnimationDuration) >= 1 ? 1 : (second / scaleAnimationDuration);
                }else{
                    isTextShowProgress = 1;
                    isMinuteShowProgress = 1;
                    isScaleShowProgress = 1;
                }
            }else{
                isTextShowProgress = 0;
            }

            if (hour == 7 && minute == 0 && second <= mainAnimationDuration){
                isTextShowProgress = 1 - ((second / textAnimationDuration) >= 1 ? 1 : (second / textAnimationDuration));
            }else{
                isTextShowProgress = 0;
            }

        }else if (hour<=12){
            if (minute<=hour && minute>=hour-5){
                isScalesSecondShow = true;
                isTextShow = true;
                if (minute==hour){
                    videoIndex = hour-6;
                }
                if (minute == hour-5 && second <= mainAnimationDuration){
                    //isTextShowProgress = (second / textAnimationDuration) >= 1 ? 1 : (second / textAnimationDuration);
                    isTextShowProgress = 1;
                    isMinuteShowProgress = (second / minuteAnimationDuration) >= 1 ? 1 : (second / minuteAnimationDuration);
                    isScaleShowProgress = (second / scaleAnimationDuration) >= 1 ? 1 : (second / scaleAnimationDuration);
                }else{
                    isTextShowProgress = 1;
                    isMinuteShowProgress = 1;
                    isScaleShowProgress = 1;
                }
            }else{
                isTextShowProgress = 0;
            }
        }else{
            if (minute<=hour-12+10 && minute>=hour-12+10-5){
                isScalesSecondShow = true;
                isTextShow = true;
                if (minute==hour-12+10){
                    videoIndex = hour-6;
                }
                if (minute == hour-12+10-5 && second <= mainAnimationDuration){
                    //isTextShowProgress = (second / textAnimationDuration) >= 1 ? 1 : (second / textAnimationDuration);
                    isTextShowProgress = 1;
                    isMinuteShowProgress = (second / minuteAnimationDuration) >= 1 ? 1 : (second / minuteAnimationDuration);
                    isScaleShowProgress = (second / scaleAnimationDuration) >= 1 ? 1 : (second / scaleAnimationDuration);
                }else{
                    isTextShowProgress = 1;
                    isMinuteShowProgress = 1;
                    isScaleShowProgress = 1;
                }
            }else{
                isTextShowProgress = 0;
            }
        }
    }

    return { 
        hour: hour,
        isScalesSecondShow: isScalesSecondShow,
        isTextShow: isTextShow,
        isDay: isDay,
        videoIndex: videoIndex,
        isTextShowProgress: isTextShowProgress,
        isMinuteShowProgress: isMinuteShowProgress,
        isScaleShowProgress: isScaleShowProgress
    };

}
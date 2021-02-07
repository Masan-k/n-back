/*globals window, document, setInterval, event , localStorage */

var eLblLeftQ,
    eLblRightQ,
    eBtnOne,
    eBtnTwo,
    eBtnThree,
    eBtnFour,
    eBtnFive,
    eBtnSix,
    eBtnSeven,
    eBtnEight,
    eBtnNine,
    eBtnZero,
    MIN = 1,
    MAX = 9,
    APP_ID = 'N-BACK',
    ans,
    eLblAsterisk,
    eLblTime,
    eLblCurrectCount,
    eLblIncurrectCount,
    eLblQuestionCount,
    eBtnReset,
    intervalID,
    level,
    started,
    startDate,
    currentAns,
    currectCount,
    incurrectCount,
    questionCount;

function showTime() {
    'use strict';
    if (started === 1) {
        var stopwatchMiliSecond,
            stopwatchSecond,
            stopwatchMinute,
            nowDate,
            stopWatchTime,
            times,
            secondTime;

        nowDate = new Date();
        stopWatchTime = nowDate.getTime() - startDate.getTime();
        
        stopwatchMiliSecond = Math.floor(stopWatchTime / 10) % 100;
        stopwatchMiliSecond = ('0' + stopwatchMiliSecond).slice(-2);
        
        stopwatchSecond = Math.floor(stopWatchTime / 1000) % 60;
        stopwatchSecond = ('0' + stopwatchSecond).slice(-2);
        
        stopwatchMinute = Math.floor(stopWatchTime / 1000 / 60) % 60;
        stopwatchMinute = ('0' + stopwatchMinute).slice(-2);
            
        eLblTime.innerText = stopwatchMinute + ":" + stopwatchSecond + ":" + stopwatchMiliSecond;

    }
}

function setAnswer() {
    'use strict';

　　var leftQ,rightQ,ansWork;

    while(true) {
     
        leftQ = getRandom(MIN, MAX);
        rightQ =  getRandom(MIN, MAX);

        ansWork = (String(leftQ + rightQ)).slice(-1);

        if(ans.length === 0) {
            break;
        } else {
            if (ans[ans.length - 1] !== ansWork) {
                break;
            }
        }
    }

    eLblLeftQ.innerText = leftQ;
    eLblRightQ.innerText = rightQ;

    ans.push(ansWork);
}

function startStopWatch() {
    'use strict';
    if (started === 0) {
        startDate = new Date();
        started = 1;
        
        setInterval(showTime, 10);
    }
}

function getRandom(min, max) {
    'use strict';
    var range,
        ramdomRange,
        randomNum;
  
    range = max - min + 1;
    ramdomRange = Math.floor(Math.random() * range);
    randomNum = ramdomRange + min;
    return randomNum;
}

function clickNumber() {
    'use strict';

    var times,scoreTime,nowDate,year,month,day,hour,minute,second;

    if (event.target.value === currentAns) {
        currectCount = currectCount + 1;
        eLblCurrectCount.innerText = currectCount;

　　　　eLblAsterisk.innerText = "OK";

        if (ans.length + currectCount < questionCount) {
            setAnswer();
            currentAns = ans.shift();

        } else if (currectCount === questionCount) {
            eLblLeftQ.innerText = "Clear";
            eLblRightQ.innerText = "!!";
            started = 0;

            times = eLblTime.innerText.split(":");
            scoreTime = Number(times[0] * 60) + Number(times[1]) + Number(times[2] / 100);

            nowDate = new Date();
            year = nowDate.getFullYear();
            month = ('00' + (nowDate.getMonth()+1)).slice(-2);
            day = ('00' + nowDate.getDate()).slice(-2);
            hour = ('00' + nowDate.getHours()).slice(-2);
            minute = ('00' + nowDate.getMinutes()).slice(-2);
            second = ('00' + nowDate.getSeconds()).slice(-2);

            localStorage.setItem(APP_ID + ',' + level + ',' + year + month + day + hour + minute + second, scoreTime + ',' + incurrectCount);

        } else {
            eLblLeftQ.innerText = "X";
            eLblRightQ.innerText = "X";
            currentAns = ans.shift();
        }

    } else {
        eLblAsterisk.innerText = "NG";
        incurrectCount = incurrectCount + 1;
        lblIncurrectCount.innerText = incurrectCount;
        
    }

}
function clickReset() {
    'use strict';

    window.location.href = 'https://masan-k.github.io/n-back/index.html';

}

function init() {
    'use strict';

    started = 0;
    ans = [];
    currectCount = 0;
    incurrectCount = 0;

    eLblLeftQ = document.getElementById("lblLeftQ");
    eLblRightQ = document.getElementById("lblRightQ");

    eLblAsterisk = document.getElementById("lblAsterisk");
    eLblTime = document.getElementById("lblTime");
    eLblCurrectCount = document.getElementById("lblCurrectCount");
    eLblIncurrectCount = document.getElementById("lblIncurrectCount");
    eLblQuestionCount = document.getElementById("lblQuestionCount");


    eBtnOne = document.getElementById("btnOne")
    eBtnTwo = document.getElementById("btnTwo")
    eBtnThree = document.getElementById("btnThree")
    eBtnFour = document.getElementById("btnFour")
    eBtnFive = document.getElementById("btnFive")
    eBtnSix = document.getElementById("btnSix")
    eBtnSeven = document.getElementById("btnSeven")
    eBtnEight = document.getElementById("btnEight")
    eBtnNine = document.getElementById("btnNine")
    eBtnZero = document.getElementById("btnZero")

    eBtnReset = document.getElementById("btnReset");
    eBtnReset.addEventListener("click", clickReset, false);

    eBtnOne.addEventListener("click", clickNumber, false);

    eBtnOne.addEventListener("click", clickNumber, false);
    eBtnTwo.addEventListener("click", clickNumber, false);
    eBtnThree.addEventListener("click", clickNumber, false);
    eBtnFour.addEventListener("click", clickNumber, false);
    eBtnFive.addEventListener("click", clickNumber, false);
    eBtnSix.addEventListener("click", clickNumber, false);
    eBtnSeven.addEventListener("click", clickNumber, false);
    eBtnEight.addEventListener("click", clickNumber, false);

    eBtnNine.addEventListener("click", clickNumber, false);
    eBtnZero.addEventListener("click", clickNumber, false);
}

function showQuestion() {
    'use strict';

    eLblAsterisk.innerText = eLblAsterisk.innerText.slice(1);
    if (eLblAsterisk.innerText.length === 0) {
        eLblAsterisk.innerText = "***";
        setAnswer();

        if (ans.length > level) {
            clearInterval(intervalID)
            eLblAsterisk.innerText ="START!!";
            setInput();
            
            currentAns = ans.shift();
            startStopWatch();
        }
    }
}

function setInput() {
    'use strict';

    eBtnOne.style.visibility ="visible";
    eBtnTwo.style.visibility ="visible";
    eBtnThree.style.visibility ="visible";
    eBtnFour.style.visibility ="visible";
    eBtnFive.style.visibility ="visible";
    eBtnSix.style.visibility ="visible";
    eBtnSeven.style.visibility ="visible";
    eBtnEight.style.visibility ="visible";
    eBtnNine.style.visibility ="visible";
    eBtnZero.style.visibility ="visible";

}

function setWait() {
    'use strict';
    eBtnOne.style.visibility ="hidden";
    eBtnTwo.style.visibility ="hidden";
    eBtnThree.style.visibility ="hidden";
    eBtnFour.style.visibility ="hidden";
    eBtnFive.style.visibility ="hidden";
    eBtnSix.style.visibility ="hidden";
    eBtnSeven.style.visibility ="hidden";
    eBtnEight.style.visibility ="hidden";
    eBtnNine.style.visibility ="hidden";
    eBtnZero.style.visibility ="hidden";

}

window.onload = function () {
    'use strict';

    var param = location.search.split('=');

    init();

    level = param[1];
    questionCount = Number(level) + 10;
    eLblQuestionCount.innerText = questionCount;
 
    setAnswer();
    setWait();

    intervalID = setInterval(showQuestion, 1000);

};

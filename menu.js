/*globals window, document, setInterval, event , localStorage */


function clickbtnStart() {
    'use strict';
    
    //window.location.href = 'main.html?level=' + cmbLevel.value;
    window.location.href = 'https://masan-k.github.io/n-back/main.html?level=' + cmbLevel.value;

}

function init() {
    'use strict';

    var i,
        option_add,
        cmbLevel,
        lblTitle;

　　cmbLevel = document.getElementById("cmbLevel");
    lblTitle = document.getElementById("lblTitle")
    lblTitle.innerText = "n-back";

    for (i = 1; i <= 5; i += 1) {
        option_add = document.createElement("option");
        option_add.value = i;
        option_add.text = i;
        cmbLevel.appendChild(option_add);
    }
    
}

function drawCtxToday() {
    'use strict';

    var ctx,
        i,
        X_BLANK_WIDTH = 60,
        Y_BLANK_WIDTH = 50,
        RECT_LENGTH = 10,
        keys,
        appKey,
        level,
        dateYmd,
        dateTime,
        todayYmd,
        nowDate,
        scorePos,
        timePos,
        currentLevel;

    ctx = cvsToday.getContext('2d');  
    ctx.lineWidth = '0.2';
    
    for(i = 1; i <= 13; i += 1) {
        ctx.beginPath();
        ctx.lineTo(i * X_BLANK_WIDTH - 20, 50);
        ctx.lineTo(i * X_BLANK_WIDTH - 20, 350);
        ctx.closePath();
        ctx.stroke();
        ctx.strokeText(i * 2 - 2, i * X_BLANK_WIDTH - 20, 360);
    }

    for(i = 1; i <= 7; i += 1) {
        ctx.beginPath();
        ctx.lineTo(X_BLANK_WIDTH - 20, i * 50);
        ctx.lineTo(X_BLANK_WIDTH * 13 - 20, i * 50);
        ctx.closePath();
        ctx.stroke();

        ctx.textAlign = 'right'
        ctx.strokeText(350 - i * 50, X_BLANK_WIDTH - 25, i * 50);
    }

    currentLevel = -1;
    nowDate = new Date();
    todayYmd = nowDate.getFullYear() + ('00' + (nowDate.getMonth()+1)).slice(-2) + ('00' + nowDate.getDate()).slice(-2);

    ctx.textBaseline = 'top';
    ctx.strokeText('1', 525, 370);
    ctx.fillStyle = getRectColor(0);
    ctx.fillRect(528, 373, RECT_LENGTH, RECT_LENGTH)
    
    ctx.fillStyle = getRectColor(2);
    ctx.fillRect(540, 373, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(4);
    ctx.fillRect(552, 373, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(6);
    ctx.fillRect(564, 373, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(8);
    ctx.fillRect(576, 373, RECT_LENGTH, RECT_LENGTH)

    ctx.strokeText('Level 5', 625, 370);



    for(var key in localStorage) {

        keys = key.split(',');

        if(keys.length === 3) {

            appKey = keys[0];
            dateYmd = keys[2].slice(0,8);

            //Today(Time)
            if (appKey === 'N-BACK' && todayYmd === dateYmd) {

                level = keys[1];
                dateTime = keys[2].slice(8);

                ctx.beginPath();
                
                if (currentLevel !== level) {
                    ctx.lineWidth = '3.0';
                    ctx.strokeStyle = getRectColor((level - 1) * 2);

                    currentLevel = level;                   
                    ctx.lineTo(X_BLANK_WIDTH - 20, 350);    
                } else {
                    ctx.lineTo(X_BLANK_WIDTH - 20 + timePos, 350 - scorePos);                
                }

                scorePos = Math.round(localStorage.getItem(key).split(',')[0]);
                timePos = Math.round((Number(dateTime.slice(0, 2)) + (Number(dateTime.slice(2, 4)) / 60)) * 30);

                ctx.lineTo(X_BLANK_WIDTH - 20 + timePos ,350 - scorePos);

                ctx.closePath();
                ctx.stroke();                  
                               
            }
        }
    }
}
function getRecord() {
    let dateYmd = [];    
    let record = new Object();
    let date = [];
    let count = [];

    for(let key in localStorage) {

        let keys = key.split(',');

        if(keys.length === 3) {
            
            dateYmd.push(keys[2].slice(0,8));
        }
    }

　　dateYmd.sort();
    
    let wDate;
    for(let d in dateYmd){
        
        if(wDate !== dateYmd[d]) {
            wDate = dateYmd[d];
            count.push(1);
            date.push(wDate);
        }else{
            count[count.length - 1] += 1;
        }
    }

　　record.count = count;
    record.dateYmd = date;
    
    return record;
}

function getRectColor(count){
    if(count === 0){
        return '#EAECF0';
    }else if(count <= 2){
        return '#6BF8A3';
    }else if(count <= 4){
        return '#00D65D';
    }else if(count <= 6){
        return '#00AF4A';
    }else {
        return '#007839';
    }
}

function drawCtxLastYear() {
    'use strict';

    const X_BLANK_WIDTH = 60;
    const Y_BLANK_WIDTH = 50;
    const RECT_LENGTH = 10;
    const BLANK_LENGTH = 3;
    const INIT_BLANK_HEIGHT = 30;
    const INIT_BLANK_WIDTH = 30;
    const VERTICAL_COUNT = 7;
    const HORIZONTAL_COUNT = 50;

    let ctx = cvsLastYear.getContext('2d');  
    ctx.lineWidth = '0.2';

    let nowDate = new Date();
    let dayOfWeek = nowDate.getDay();
    
    let record;
    record = getRecord();

    let blockCount = (VERTICAL_COUNT * HORIZONTAL_COUNT) + dayOfWeek + 1;
    let targetDate = new Date();
    targetDate.setDate(nowDate.getDate() - (blockCount - 1));

    let dateYmd = targetDate.getFullYear() + ('00' + (targetDate.getMonth()+1)).slice(-2) + ('00' + targetDate.getDate()).slice(-2);
    let count = 0;

    ctx.strokeText('Mon', 5, 50);
    ctx.strokeText('Wed', 5, 77);
    ctx.strokeText('Fri', 5, 105);

    ctx.textBaseline = 'top';
    ctx.strokeText('Less', 500, 130);
    ctx.fillStyle = getRectColor(0);
    ctx.fillRect(528, 133, RECT_LENGTH, RECT_LENGTH)
    
    ctx.fillStyle = getRectColor(2);
    ctx.fillRect(540, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(4);
    ctx.fillRect(552, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(6);
    ctx.fillRect(564, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(8);
    ctx.fillRect(576, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.strokeText('More', 595, 130);


    for(var x = 0; x <= HORIZONTAL_COUNT - 1; x++){
        for(var y = 0; y <= VERTICAL_COUNT - 1; y++){
                  
            for (var key in Object.keys(record.dateYmd)){
                if(dateYmd === record.dateYmd[key]){
                    count = record.count[key];
                }
            }

            ctx.fillStyle = getRectColor(count);
            count = 0;
            ctx.fillRect(INIT_BLANK_WIDTH + (BLANK_LENGTH + RECT_LENGTH) * x, INIT_BLANK_HEIGHT + (BLANK_LENGTH + RECT_LENGTH) * y, RECT_LENGTH, RECT_LENGTH);

            
            targetDate.setDate(targetDate.getDate() + 1);
            dateYmd = targetDate.getFullYear() + ('00' + (targetDate.getMonth()+1)).slice(-2) + ('00' + targetDate.getDate()).slice(-2);
        }
    }
    for(var y = 0; y <= dayOfWeek; y++){
        for (var key in Object.keys(record.dateYmd)){
            if(dateYmd === record.dateYmd[key]){
                count = record.count[key];
            }
        }

        ctx.fillStyle = getRectColor(count)
        count = 0;
        
        ctx.fillRect(INIT_BLANK_WIDTH + (BLANK_LENGTH + RECT_LENGTH) * HORIZONTAL_COUNT, INIT_BLANK_HEIGHT + (BLANK_LENGTH + RECT_LENGTH) * y, RECT_LENGTH, RECT_LENGTH)
        
        targetDate.setDate(targetDate.getDate() + 1);
        dateYmd = targetDate.getFullYear() + ('00' + (targetDate.getMonth()+1)).slice(-2) + ('00' + targetDate.getDate()).slice(-2);
    }

    ctx.stroke();

}

window.onload = function () {
    'use strict';
    
    var btnStart;

    btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", clickbtnStart, false); 

    drawCtxToday();
    drawCtxLastYear();    
};

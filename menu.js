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

    for (i = 1; i <= 10; i += 1) {
        option_add = document.createElement("option");
        option_add.value = i;
        option_add.text = i;
        cmbLevel.appendChild(option_add);
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
    }else if(count <= 8){
        return '#007839';
    }else if(count <= 10){
        return '#aaffff';
    }else if(count <= 12){
        return '#80bfff';
    }else if(count <= 14){
        return '#0080ff';
    }else if(count <= 16){
        return '#0055aa';
    }else{
        return '#ff0000';
    }

}

function getDateYmd(date) {
    return date.getFullYear() + ('00' + (date.getMonth()+1)).slice(-2) + ('00' + date.getDate()).slice(-2);
}

function getTargetDateYmd() {
    let minDate = new Date();
    minDate.setDate(minDate.getDate() - 13);
    let maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 1);
    let workDate = minDate;

    let targetDateYmd = [];
    while(true){
        targetDateYmd.push(getDateYmd(workDate));
        if(targetDateYmd[targetDateYmd.length - 1] < getDateYmd(maxDate)){
            workDate.setDate(workDate.getDate() + 1);
        }else{
            break;
        }
    }
    return targetDateYmd;
}

function drawCtxCarrelation() {
    'use strict';

    const RECT_LENGTH = 10;

    let ctx = cvsCarrelation.getContext('2d');  
    ctx.lineWidth = '0.5';
    ctx.textBaseline = 'top';
    ctx.strokeText('1', 615, 390);
    ctx.fillStyle = getRectColor(0);
    ctx.fillRect(628, 393, RECT_LENGTH, RECT_LENGTH);
    
    ctx.fillStyle = getRectColor(2);
    ctx.fillRect(640, 393, RECT_LENGTH, RECT_LENGTH);

    ctx.fillStyle = getRectColor(4);
    ctx.fillRect(652, 393, RECT_LENGTH, RECT_LENGTH);

    ctx.fillStyle = getRectColor(6);
    ctx.fillRect(664, 393, RECT_LENGTH, RECT_LENGTH);

    ctx.fillStyle = getRectColor(8);
    ctx.fillRect(676, 393, RECT_LENGTH, RECT_LENGTH);

    ctx.fillStyle = getRectColor(10);
    ctx.fillRect(688, 393, RECT_LENGTH, RECT_LENGTH);

    ctx.fillStyle = getRectColor(12);
    ctx.fillRect(700, 393, RECT_LENGTH, RECT_LENGTH);

    ctx.fillStyle = getRectColor(14);
    ctx.fillRect(712, 393, RECT_LENGTH, RECT_LENGTH);

    ctx.fillStyle = getRectColor(16);
    ctx.fillRect(724, 393, RECT_LENGTH, RECT_LENGTH);

    ctx.fillStyle = getRectColor(18);
    ctx.fillRect(736, 393, RECT_LENGTH, RECT_LENGTH);

    ctx.strokeText('Level10', 756, 390);

    const X_LINE_COUNT_CALC = 6;
    const NBACK_MAX_COUNT = 6;
    const Y_BLANK_WIDTH = 50;
    const INIT_BLANK_HEIGHT = 50;
    const INIT_BLANK_WIDTH = 60;
    const X_BLANK_WIDTH = 60;

    let targetDateYmd = getTargetDateYmd();

    //---------------------
    //Frame drawing
    //---------------------
    
    //X axis
    for(let i = 0; i <= X_LINE_COUNT_CALC; i += 1) {
        ctx.beginPath();
        ctx.lineTo(INIT_BLANK_WIDTH, INIT_BLANK_HEIGHT + i * Y_BLANK_WIDTH);
        ctx.lineTo(X_BLANK_WIDTH * (targetDateYmd.length - 1) + INIT_BLANK_WIDTH, INIT_BLANK_HEIGHT + i * Y_BLANK_WIDTH);
        ctx.closePath();
        ctx.stroke();

        if(i < X_LINE_COUNT_CALC){
            ctx.textAlign = 'right'
            ctx.strokeText(300 - i * 50, INIT_BLANK_WIDTH - 10, INIT_BLANK_HEIGHT + i * Y_BLANK_WIDTH - 10);
            ctx.textAlign = 'left'
            ctx.strokeText(6 - i, X_BLANK_WIDTH * (targetDateYmd.length - 1) + INIT_BLANK_WIDTH + 5, INIT_BLANK_HEIGHT + i * Y_BLANK_WIDTH - 10);
        }
    }
    ctx.textAlign = 'right'
    ctx.strokeText('sec', INIT_BLANK_WIDTH - 10, INIT_BLANK_HEIGHT);
    ctx.strokeText('(100calcs)', INIT_BLANK_WIDTH - 10, INIT_BLANK_HEIGHT + 12);

    ctx.textAlign = 'left'
    ctx.strokeText('times', INIT_BLANK_WIDTH + X_BLANK_WIDTH * (targetDateYmd.length - 1) + 13, INIT_BLANK_HEIGHT - 10);
    ctx.strokeText('(n-back)',  INIT_BLANK_WIDTH + X_BLANK_WIDTH * (targetDateYmd.length - 1) + 5, INIT_BLANK_HEIGHT + 8);
            

    //Y axis
    ctx.textAlign = 'left'
    ctx.lineWidth = '0.2';
    
    for (let i = 0; i < targetDateYmd.length - 1; i++){
        for (let j = 0; j < 12; j += 1){
            ctx.beginPath();
            ctx.lineTo(i * X_BLANK_WIDTH + X_BLANK_WIDTH / 12 * j + INIT_BLANK_WIDTH, INIT_BLANK_HEIGHT);
            ctx.lineTo(i * X_BLANK_WIDTH + X_BLANK_WIDTH / 12 * j + INIT_BLANK_WIDTH, INIT_BLANK_HEIGHT + Y_BLANK_WIDTH * X_LINE_COUNT_CALC);
            ctx.closePath();
            ctx.stroke();
        }
    }

    ctx.lineWidth = '0.5';
    for (let i = 0; i < targetDateYmd.length; i++){
        ctx.beginPath();
        ctx.lineTo(i * X_BLANK_WIDTH + INIT_BLANK_WIDTH, INIT_BLANK_HEIGHT);
        ctx.lineTo(i * X_BLANK_WIDTH + INIT_BLANK_WIDTH, INIT_BLANK_HEIGHT + Y_BLANK_WIDTH * X_LINE_COUNT_CALC);
        ctx.closePath();
        ctx.stroke();

        if(i !== targetDateYmd.length -1){
            ctx.strokeText(targetDateYmd[i].slice(4,8), i * X_BLANK_WIDTH + INIT_BLANK_WIDTH - 10, INIT_BLANK_HEIGHT + Y_BLANK_WIDTH * X_LINE_COUNT_CALC);
        }
    }

    //---------------------
    //Drawing a bar graph
    //---------------------

    //=========
    //100Calcs
    //=========
    let isOpen = false;
    ctx.lineWidth = '1.2';
    for(let key in localStorage) {
        let keys = key.split(',');

        if(keys.length === 2 && keys[0] === '100CALCS' && keys[1].slice(0,8) === keys[1].slice(0,8)) {

            outer:
            for (let i = 0; i < targetDateYmd.length - 1; i++){
                
                if(targetDateYmd[i] === keys[1].slice(0,8)){
                    if (!isOpen){
                        ctx.beginPath();
                        isOpen = true;
                    }

                    let hours = Number(keys[1].slice(8,10));
                    let minutes = Number(keys[1].slice(10,12));
                    
                    ctx.lineTo(i * X_BLANK_WIDTH + hours * 2.5 + minutes / 24 + INIT_BLANK_WIDTH, (INIT_BLANK_HEIGHT + Y_BLANK_WIDTH * NBACK_MAX_COUNT - Number(localStorage.getItem(key))));

                    break outer;
                }
            }
        }
    }
    if(isOpen){
        ctx.stroke();
    }

    //=======
    //n-back
    //=======
    let targetRecord = new Object;
    let targetDate = [];
    let targetLevel = [];
    for(let key in localStorage) {
        let keys = key.split(',');     
        if(keys.length === 3 && keys[0] === 'N-BACK'){
            outer:
            for(let d of targetDateYmd) {
                if(d === keys[2].slice(0,8)){
                    targetDate.push(keys[2]);
                    targetLevel.push(keys[1]);
                    break outer;
                }
            }
        }
    }
    targetRecord.date = targetDate;
    targetRecord.level = targetLevel;
    
    let sumRecord = new Object;
    let date = [];
    let count = [];
    let level = [];
    let currentCount

    for(let i = 0; i < targetRecord.date.length; i++){
        if(targetRecord.level[i] !== -1){
            currentCount = 1
            for(let j = i + 1; j < targetRecord.date.length; j++){
                if(targetRecord.level[j] !== -1){
                    if(targetRecord.level[i] === targetRecord.level[j] && targetRecord.date[i].slice(0,10) === targetRecord.date[j].slice(0,10)){
                        currentCount += 1;
                        targetRecord.level[j] = -1; //Not searchable
                    }
                }
            }
            count.push(currentCount);
            date.push(targetRecord.date[i].slice(0,10));
            level.push(targetRecord.level[i]);
        }
    }
    sumRecord.count = count;
    sumRecord.date = date;
    sumRecord.level = level;

    let sortRecord1 = new Object;
    let sortRecord2 = new Object;

    sortRecord1 = getSortLevelDesc(sumRecord);
    sortRecord2 = getSortDate(sortRecord1);
    let stackCount = 0;
    let beforeYmdhh = -1;
    let isStop = false;
    for(let i = 0; i < sortRecord2.date.length ; i++){

        for (let j = 0;j < targetDateYmd.length - 1; j++){
            for (let k = 0; k < 24; k++){

                if(targetDateYmd[j] + ('0' + k).slice(-2) === sortRecord2.date[i].slice(0,10)){
                    if (beforeYmdhh !== sortRecord2.date[i].slice(0,10)){
                        isStop = false;
                        stackCount = 0;
                        beforeYmdhh = sortRecord2.date[i].slice(0,10);
                    }
                    
                    if(!isStop){
                        let writeCount;

                        if (stackCount + sortRecord2.count[i] > NBACK_MAX_COUNT){
                            
                            writeCount = (stackCount + sortRecord2.count[i]) - ((stackCount + sortRecord2.count[i]) - NBACK_MAX_COUNT[i]);
                            stackCount = NBACK_MAX_COUNT;
                        }else{
                            stackCount += sortRecord2.count[i];
                            writeCount = stackCount;

                        }

                        ctx.fillStyle = getRectColor((sortRecord2.level[i] - 1) * 2);
                        ctx.fillRect(j * X_BLANK_WIDTH + X_BLANK_WIDTH / 24 * k + INIT_BLANK_WIDTH, INIT_BLANK_HEIGHT + Y_BLANK_WIDTH * NBACK_MAX_COUNT - Y_BLANK_WIDTH * stackCount, X_BLANK_WIDTH / 24, Y_BLANK_WIDTH * writeCount);
                    
                        if (stackCount === NBACK_MAX_COUNT){ isStop = true;}
                    }
                    
                }
            }
        }
    }
    ctx.stroke()
}

function getSortLevelDesc(record){
    
    let newDate = [];
    let newCount = [];
    let newLevel = [];
    let newRecord = new Object();

    while(true){
        let isEnd = true;
        outer:
        for(let i = 0; i < record.level.length ; i++){
             if(record.level[i] !== -1){
                 isEnd = false
                 break outer;
             }
        }
        
        if(!isEnd){
            let maxLevel = -1;
            let maxIndex = -1;
            for(let i = 0; i < record.level.length ; i++){
                if(maxLevel < record.level[i]){
                    maxLevel = record.level[i];
                    maxIndex = i;
                }
            }
            newLevel.push(record.level[maxIndex]);
            newDate.push(record.date[maxIndex]);
            newCount.push(record.count[maxIndex]);
            record.level[maxIndex] = -1;
        }else{
            newRecord.date = newDate;
            newRecord.count = newCount;
            newRecord.level = newLevel;
            return newRecord;
        }
    }
}

function getSortDate(record){
    
    let newDate = [];
    let newCount = [];
    let newLevel = [];
    let newRecord = new Object();

    while(true){
        let isEnd = true;
        outer:
        for(let i = 0; i < record.level.length ; i++){
             if(record.date[i] !== '9999999999'){
                 isEnd = false;
                 break;
             }
        }
        
        if(!isEnd){
            let minDate = '9999999999';
            let minIndex = -1;
            for(let i = 0; i < record.level.length ; i++){
                if(record.date[i] < minDate){
                    minDate = record.date[i];
                    minIndex = i;
                }
            }
            newLevel.push(record.level[minIndex]);
            newDate.push(record.date[minIndex]);
            newCount.push(record.count[minIndex]);
            record.date[minIndex] = '9999999999';
        }else{
            newRecord.date = newDate;
            newRecord.count = newCount;
            newRecord.level = newLevel;
            return newRecord;
        }
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

    let dateYmd = getDateYmd(targetDate);
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

    ctx.fillStyle = getRectColor(10);
    ctx.fillRect(588, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(12);
    ctx.fillRect(600, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(14);
    ctx.fillRect(612, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(16);
    ctx.fillRect(624, 133, RECT_LENGTH, RECT_LENGTH)

    ctx.fillStyle = getRectColor(18);
    ctx.fillRect(636, 133, RECT_LENGTH, RECT_LENGTH)


    ctx.strokeText('More', 656, 130);


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
            dateYmd = getDateYmd(targetDate);
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
        dateYmd = getDateYmd(targetDate);
    }

    ctx.stroke();

}

window.onload = function () {
    'use strict';
    
    var btnStart;

    btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", clickbtnStart, false); 

    drawCtxLastYear();
    drawCtxCarrelation();

};

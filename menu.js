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

window.onload = function () {
    'use strict';
    
    var btnStart,
        cvsToday,
        ctx,
        i,
        X_BLANK_WIDTH = 60,
        Y_BLANK_WIDTH = 50,
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

    btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", clickbtnStart, false);  

    cvsToday = document.getElementById("cvsToday");

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

    for(var key in localStorage) {

        keys = key.split(',');

        if(keys.length === 3) {

            appKey = keys[0];
            dateYmd = keys[2].slice(0,8);

            if (appKey === 'N-BACK' && todayYmd === dateYmd) {

                level = keys[1];
                dateTime = keys[2].slice(8);

                ctx.beginPath();
                
                if (currentLevel !== level) {
                    ctx.lineWidth = '5.0';
                    ctx.globalAlpha = level / 5;
                    ctx.strokeStyle = 'blue';

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
                               
//                for(i = 1;i <= 5; i += 1) {
//                    if(level === String(i)){
//                        newLevel.push(level);
//                        newDateYmd.push(dateYmd);
//                        newDateTime.push(dateTime);
//                        newKey.push(key);
//                    }
//                }
            }
        }
    }        
};

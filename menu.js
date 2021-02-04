﻿/*globals window, document, setInterval, event , localStorage */

var cmbLevel, eLblTitle;

//-----------------------
// Click start button !!
//-----------------------
function clickbtnStart() {
    'use strict';
    
    console.log(cmbLevel.value);
    window.location.href = 'file:///home/masan/%E3%83%87%E3%82%B9%E3%82%AF%E3%83%88%E3%83%83%E3%83%97/100Calcs-master/main.html?level=' + cmbLevel.value;

}

function init() {
    'use strict';

    var i, option_add;

　　cmbLevel = document.getElementById("cmbLevel");

    eLblTitle = document.getElementById("lblTitle")
    eLblTitle.innerText = "n-back";
      
    for (i = 1; i <= 5; i += 1) {
        option_add = document.createElement("option");
        option_add.value = i;
        option_add.text = i;
        cmbLevel.appendChild(option_add);
    }
    
}

window.onload = function () {
    'use strict';
    
    var btnStart;  
    btnStart = document.getElementById("btnStart");
    btnStart.addEventListener("click", clickbtnStart, false);
      
};

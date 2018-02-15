
'use strict';

chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.action == "getSource") {
        if (request.source.length > 0) {
            var html = "<table><tr><th>Mängd</th><th>Mått</th><th>Ingrediens</th></tr>";
            request.source.map((ingredient) => {
                html += `<tr><td>${ingredient.amount}</td><td>${ingredient.type}</td><td>${ingredient.name}</td></tr>`
            })
            html += "</table>";
            message.innerHTML = html;
        }
        else {
            message.innerHTML = "Vi kunde inte hitta något recept på den sidan du är inne på."
        }
    }
});


function onWindowLoad(e) {
    var message = document.querySelector('#message');

    chrome.tabs.executeScript(null, {
        file: "getPagesSource.js"
    }, function () {
        // If you try and inject into an extensions page or the webstore/NTP you'll get an error
        if (chrome.runtime.lastError) {
            message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
        }
    });
}

window.onload = onWindowLoad;








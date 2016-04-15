/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
window.beforeUnload = function() {
    console.log('yoo');
};

window.onload = function(){
    const container = document.getElementById('watch8-secondary-actions');
    const button = createButton('sampleHub-dl', 'add sample');
    const startButton = createButton('sampleStart', 'sample start');
    const endButton = createButton('sampleEnd', 'sample end');

    const startContainer = createSampleStartContainer();
    const endContainer = createSampleEndContainer();
    container.appendChild(button);
    container.appendChild(startButton);
    container.appendChild(endButton);

    container.appendChild(startContainer);
    container.appendChild(endContainer);

    button.addEventListener('click', function(e) {
        e.preventDefault();
        add();
    });

    startButton.addEventListener('click', function(e) {
        e.preventDefault();
        getvideoTime();
    });

    endButton.addEventListener('click', function(e) {
        e.preventDefault();
        getvideoEndTime();
    });
};

function createSampleStartContainer() {
    var start = document.createElement('div');
    start.setAttribute('id', 'sampleStart');
    start.innerHTML = '0:00';
    return start;
}
function createSampleEndContainer() {
    var end = document.createElement('div');
    end.setAttribute('id', 'sampleEnd');
    end.innerHTML = '0:00';
    return end;
}

function createButton(className, text) {
    var button = document.createElement('a');
    button.className = className;
    button.innerHTML = text;
    return button;
}

function add() {
    const name = "name="+getVideoTitle().replace(/\s/g, '').replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '')+".mp3";
    const youtubeUrl = "youtube_url="+window.location.href;
    const endPoint = "http://localhost/sparetime/sampleHub/public/api/v1/addSample";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", endPoint+"?"+name+"&"+youtubeUrl, true);
    xhr.onreadystatechange = function() {
        console.log("DONE");
        if (xhr.readyState == 4) {
            // WARNING! Might be injecting a malicious script!
            console.log("SUCCESS");
        }
    }
    xhr.send();
}

function getVideoTitle() {
    return document.getElementById('eow-title').innerHTML;
}

function getvideoTime() {
    // Check if a script tag is already made, if so delete it and make a new one.
    var sampleHack = document.getElementById('sampleHack');
    if (sampleHack) {
        sampleHack.remove();
    }
    //create script element.
    var script = document.createElement('script');
    script.setAttribute('id', 'sampleHack');
    script.innerHTML = 'var ytplayer = document.getElementById("movie_player"); var start = document.getElementById("sampleStart"); start.innerHTML = ytplayer.getCurrentTime();';
    //execute script
    document.body.appendChild(script);

}

function getvideoEndTime() {
    // Check if a script tag is already made, if so delete it and make a new one.
    var sampleHack = document.getElementById('sampleHack');
    if (sampleHack) {
        sampleHack.remove();
    }
    //create script element.
    var script = document.createElement('script');
    script.setAttribute('id', 'sampleHack');
    script.innerHTML = 'var ytplayer = document.getElementById("movie_player"); var end = document.getElementById("sampleEnd"); end.innerHTML = ytplayer.getCurrentTime();';
    //execute script
    document.body.appendChild(script);

}

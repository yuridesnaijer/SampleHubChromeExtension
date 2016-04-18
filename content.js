/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */

window.onhashchange = onUrlChange;

window.onload = function(){

    setInterval(onUrlChange, 1000);

};

function appendElements() {
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
}

url = '';

function onUrlChange() {
    if(url != window.location.href) {

        appendElements();
        url = window.location.href;

    }
}

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

    var title = getVideoTitle();
    title.replace(/[^a-z0-9]/gi,'');

    const name = "name="+title+".mp3";
    const youtubeUrl = "youtube_url="+window.location.href;
    const endPoint = "https://localhost/sparetime/sampleHub/public/api/v1/addSample";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", endPoint+"?"+name+"&"+youtubeUrl, true);
    xhr.onreadystatechange = function() {
        console.log("DONE");
        if (xhr.readyState == 4) {
            // WARNING! Might be injecting a malicious script!
            console.log("SUCCESS");
        }
    };
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

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
    const container = document.getElementById('watch-header');
    const buttonBox = document.createElement('div');
    buttonBox.setAttribute('class', 'sampleHubContainer');
    const button = createButton('sampleHub-dl', 'Add Sample', 'https://i.imgur.com/0Z0TFwD.png');
    const startButton = createButton('sampleStart', '', 'https://i.imgur.com/DcEdg1k.png');
    const endButton = createButton('sampleEnd', '', 'https://i.imgur.com/zeYwVqx.png');
    const startContainer = createSampleStartContainer();
    const endContainer = createSampleEndContainer();

    buttonBox.appendChild(button);
    buttonBox.appendChild(startButton);
    buttonBox.appendChild(endButton);
    buttonBox.appendChild(startContainer);
    buttonBox.appendChild(endContainer);
    container.appendChild(buttonBox);

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
    start.style.visibility = 'hidden';
    return start;
}
function createSampleEndContainer() {
    var end = document.createElement('div');
    end.setAttribute('id', 'sampleEnd');
    end.innerHTML = '0:00';
    end.style.visibility = 'hidden';
    return end;
}

function createButton(className, text, iconSrc) {
    var button = document.createElement('a');
    button.className = className;


    var icon = "<img src='"+iconSrc+"'/>";
    //icon.setAttribute('src', 'https://i.imgur.com/tgzJ4lc.png');
    //button.appendChild(icon);
    button.innerHTML = icon + text;
    return button;
}

function add() {

    var title = getVideoTitle();
    var stripped_title = title.replace(/[^a-z0-9]/gi,'');

    const name = "name="+stripped_title+".mp3";
    const youtubeUrl = "youtube_url="+window.location.href;
    const endPoint = "http://localhost/sparetime/sampleHub/public/api/v1/addSample";
    const startTime = "start="+document.getElementById('sampleStart').innerHTML;
    const endTime = "end="+document.getElementById('sampleEnd').innerHTML;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", endPoint+"?"+name+"&"+startTime+"&"+endTime+"&"+youtubeUrl, true);
    xhr.onreadystatechange = function() {
        console.log("DONE");
        if (xhr.readyState == 4) {
            //TODO: give user feedback that sample was added
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

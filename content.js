/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */
var o = [{
    name: 'name',
    id: 1
},{
    name: 'name2',
    id: 2
}];

window.onload = function(){
    setInterval(onUrlChange, 1000);
};

var container;
var selectBox;

function appendElements() {
    container = document.getElementById('watch-header');
    const buttonBox = document.createElement('div');
    buttonBox.setAttribute('class', 'sampleHubContainer');
    const button = createButton('sampleHub-dl', 'Add Sample', 'https://i.imgur.com/0Z0TFwD.png');
    const startButton = createButton('sampleStart', '<div id="sampleStart">0:00</div>', 'https://i.imgur.com/DcEdg1k.png');
    const endButton = createButton('sampleEnd', '<div id="sampleEnd">0:00</div>', 'https://i.imgur.com/zeYwVqx.png');
    selectBox = document.createElement('select');

    buttonBox.appendChild(button);
    buttonBox.appendChild(startButton);
    buttonBox.appendChild(endButton);
    container.appendChild(buttonBox);
    container.appendChild(selectBox);

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

    getProjects();
}

function setProjectChooser(){
    console.log(o);

    for(var i = 0; i < o.length; i++) {
        var option = document.createElement('option');
        option.innerHTML = o[i].name;
        option.setAttribute('id', o[i].id);

        selectBox.appendChild(option);
    }
}

function onUrlChange() {
    var sampleHubContainer = document.getElementsByClassName('sampleHubContainer')[0];
    if (!sampleHubContainer) {
        appendElements();
    }
}

function createButton(className, text, iconSrc) {
    var button = document.createElement('a');
    button.className = className;


    var icon = "<img src='"+iconSrc+"'/>";
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
    script.innerHTML = 'var ytplayer = document.getElementById("movie_player"); var start = document.getElementById("sampleStart"); start.innerHTML = Math.round(ytplayer.getCurrentTime());';
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
    script.innerHTML = 'var ytplayer = document.getElementById("movie_player"); var end = document.getElementById("sampleEnd"); end.innerHTML = Math.round(ytplayer.getCurrentTime());';
    //execute script
    document.body.appendChild(script);
}

function getProjects(){
    const endPoint = "http://localhost/sparetime/sampleHub/public/api/v1/projects";

    var xhr = new XMLHttpRequest();
    xhr.open("GET", endPoint, true);
    xhr.onreadystatechange = function(data) {
        console.log("DONE");
        if (xhr.readyState == 4) {
            o = JSON.parse(xhr.responseText);

            //TODO: give user feedback that sample was added
            console.log("SUCCESS");

            setProjectChooser();
        }
    };
    xhr.send();
}

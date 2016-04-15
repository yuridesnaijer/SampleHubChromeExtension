/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */

window.onload = function(){

    const container = document.getElementById('watch8-secondary-actions');
    const button = createButton();
    const start = createSampleStart();
    container.appendChild(button);
    container.appendChild(start);

    button.addEventListener('click', function(e) {
        e.preventDefault();

        getvideoTime();


    });
};

function createSampleStart() {
    var start = document.createElement('div');
    start.setAttribute('id', 'sampleStart');
    start.innerHTML = '0:00';
    return start;
}

function createButton() {
    var button = document.createElement('a');
    button.className = 'sampleHub-dl';
    button.innerHTML = 'add';
    return button;
}

function add() {
    const name = "name="+getVideoTitle()+".mp3";
    const youtubeUrl = "youtube_url"+window.location.href;
    const endPoint = "https://localhost:8888/sampleHub/sampleHub/public/api/v1/addSample";

    $.get(endPoint+name+youtubeUrl);
}

function getVideoTitle() {
    return document.getElementById('eow-title').innerHTML;
}

function getvideoTime() {
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

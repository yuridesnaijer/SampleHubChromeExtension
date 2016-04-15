/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */

window.onload = function(){

    //create script element.



    const container = document.getElementById('watch8-secondary-actions');
    const button = createButton();
    container.appendChild(button);

    var ytplayer = document.getElementById("movie_player");

    button.addEventListener('click', function(e) {
        e.preventDefault();
        var script = document.createElement('script');
        script.innerHTML = 'var ytplayer = document.getElementById("movie_player");console.log(ytplayer.getCurrentTime());';
        document.body.appendChild(script);

    });
};

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
    console.log(window.ytplayer.getCurrentTime());
}

/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.runtime.html
 * @see http://developer.chrome.com/apps/app.window.html
 */

//alert("YO chrome extension");
window.onload = function(){
    console.log(window.location.href);

    console.log($("#eow-title"));

    const container = document.getElementById('watch8-secondary-actions');
    console.log(container);
    const button = createButton();
    container.appendChild(button);

    button.addEventListener('click', function(e) {
        e.preventDefault();
        //add();
        getvideoTime();
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
    //TODO: get start and end time of video
    console.log(yt);
}
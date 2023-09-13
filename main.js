song = "";
wristLX = "";
wristLY = "";
wristRX = "";
wristRY = "";
function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded()
{
    console.log("posenet is initialed");
}

function gotPoses(results)
{
    if(results.length > 0)
{
    console.log(results);
    wristLX = results[0].pose.leftWrist.x
    wristLY = results[0].pose.leftWrist.y
    wristRX = results[0].pose.rightWrist.x
    wristRY = results[0].pose.rightWrist.y
}
}
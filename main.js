song = "";
wristLX = 0;
wristLY = 0;
wristRX = 0;
wristRY = 0;
leftWristScore = 0;
RightWristScore = 0;
function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("FF0000");
    console.log(RightWristScore);


        console.log("RIGHT WRIST IF CONDITION")
        circle(wristRX, wristRY, 20)

        if(wristRY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5X";
            song.rate(0.5);
        }

        else if(wristRY > 100 && wristRY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1X";
            song.rate(1);
        }

        else if(wristRY > 200 && wristRY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5X";
            song.rate(1.5);
        }

        else if(wristRY > 300 && wristRY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2X";
            song.rate(2);
        }

        else if(wristRY > 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5X";
            song.rate(2.5);
        }


    if (leftWristScore > 0.2) {



        circle(wristLX, wristLY, 20)

        inNumberLeftWristY = Number(wristLY);
        removeDecimals = floor(inNumberLeftWristY);
        volume = removeDecimals / 500;

        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded() {
    console.log("posenet is initialed");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftWristScore = results[0].pose.keypoints[9].score;
        RightWristScore = results[0].pose.keypoints[10].score;

        wristLX = results[0].pose.leftWrist.x;
        wristLY = results[0].pose.leftWrist.y;

        wristRX = results[0].pose.rightWrist.x;
        wristRY = results[0].pose.rightWrist.y;
    }
}
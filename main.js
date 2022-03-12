song = "";

score_leftwrist = 0;
score_rightwrist = 0;
leftWrist_x = 0;
leftWrist_y = 0;
rightWrist_x = 0;
rightWrist_y = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(555, 444);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modalLoaded);
    poseNet.on("pose", gotPoses);
}

function draw(){
   image(video, 0, 0, 555, 444);

    fill("#ff0000");
    stroke("#ff0000");

    if(score_leftwrist > 0.2){

    circle(leftWrist_x, leftWrist_y, 20);
    InNumberLeftWristY = Number(leftWrist_y);
    removedecimals = floor(InNumberLeftWristY);
    volume = InNumberLeftWristY/1000;
    document.getElementById("volume").innerHTML = "volume = "+ volume.toFixed(2);
    song.setVolume(volume);	
}

    if(score_rightwrist > 0.2){

        circle(rightWrist_x, rightWrist_y, 20);
        if(rightWristY >0 && rightWristY <= 100) { 
            document.getElementById("speed").innerHTML = "Speed = 0.5x"; 
            song.rate(0.5); 
        }
        else if(rightWristY >100 && rightWristY <= 200) { 
            document.getElementById("speed").innerHTML = "Speed = 1x"; 
            song.rate(1); 
        }
        else if(rightWristY >200 && rightWristY <= 300) { 
            document.getElementById("speed").innerHTML = "Speed = 1.5x"; 
            song.rate(1.5); 
        }
        else if(rightWristY >300 && rightWristY <= 400) { 
            document.getElementById("speed").innerHTML = "Speed = 2x"; 
            song.rate(2); 
        }
        else if(rightWristY > 400) { 
            document.getElementById("speed").innerHTML = "Speed = 2.5x"; 
            song.rate(2.5); 
        }
    }
}

function modalLoaded(){
    console.log("fd");
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        score_leftwrist = results[0].pose.keypoints[9].score;
        score_rightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightVVrist = " + score_rightwrist + " scoreLeftVVrist = " + score_leftwrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("Left Wrist X: " + leftWrist_x + "Left Wrist Y: " + leftWrist_y);

        rightWrist_x = results[0].pose.leftWrist.x;
        rightWrist_y = results[0].pose.leftWrist.y;
        console.log("Right Wrist X: " + rightWrist_x + "Right Wrist Y: " + rightWrist_y);
    }
}
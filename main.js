status = "";
objects = [];
video = "";

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i = 0; i < objects.length; i++){
            speak();
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function speak(){
    if(objects[i].label == input_value){
        video.stop();
        objectDetector.detect(gotResults);
        document.getElementById("status").innerHTML = input_value + " found!";
        var synth = window.speechSynthesis;
        speak_data = input_value + " found!";
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
    }
    else{
        document.getElementById("status").innerHTML = "OOPS!! " + input_value + " not found...";
    }
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input_value = document.getElementById("input").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
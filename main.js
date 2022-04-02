status = "";
objects = [];
function setup(){
    canvas = createCanvas(480,340);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,340);
    video.hide();
}

function draw(){
    image(video,0,0,480,340);
    if(status != ""){
     objectDetector.detect(video , gotResult);
     for(i = 0;i < objects.length;i++){
        document.getElementById("status").innerHTML = "Status:Objects Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detcted are " + objects.length;
        percent = floor(objects[i].confidence*100);
        fill("red");
        text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if(objects[i].label == object_name){
            synth = window.speechSynthesis;
            utter_this = new SpeechSynthesisUtterance(object_name + "found");
            synth.speak(utter_this);
        }
        else{
            synth = window.speechSynthesis;
            utter_this = new SpeechSynthesisUtterance(object_name + "not found");
            synth.speak(utter_this);
        }
        
      }
 }
}
function start(){
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detecting";
    object_name = document.getElementById("object_name").value;
   }

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}   

function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        objects = results;
    }    
}




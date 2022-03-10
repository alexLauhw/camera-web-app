var frontCamera = false;
var currentStream;

cameraView = document.querySelector("#camera-view");
cameraDevice = document.querySelector("#camera-device");
photoDisplay = document.querySelector("#photo-display");
takePhotoButton = document.querySelector("#take-photo-button");
frontCameraButton = document.querySelector("#front-camera-button");

function cameraStart() {
    if (typeof currentStream !== 'underfined'){
        currentStream.getTracks().forEach(track => {
            track.stop();
        })
    }
}

var constraints = { video: { facingMode: {frontCamera ? "user" : "environment"}}, audio: false};

navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    currentStream = stream;
    cameraDevice.scrObject = stream;
}).catch(function(error) {
    console.error("Error happened", error);
})
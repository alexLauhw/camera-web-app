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

var constraints = { video: { facingMode: (frontCamera ? "user" : "environment") }, audio: false};

navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    currentStream = stream;
    cameraDevice.srcObject = stream;
}).catch(function(error) {
    console.error("Error happened", error);
})

takePhotoButton.onClick = function() {
    cameraView.wiidth = cameraDevice.videoWidth;
    cameraView.height = cameraDevice.videoHeight;
    cameraView.getContext("2d").drawImage(cameraDevice, 0, 0);
    photoDisplay.src = cameraView.toDataURL("image/webp");
    photoDisplay.classList.add("photo-take");
}

frontCameraButton.onClick = function() {
    frontCamera = !frontCamera;
    if (frontCamera) {
        frontCameraButton.textContext = "Back Camera";
    } else {
        frontCameraButton.textContext = "Front Camera";
    }

    cameraStart()
}

window.addEventListener("load", cameraStart);
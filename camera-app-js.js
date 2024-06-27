document.addEventListener('DOMContentLoaded', () => {
    const cameraFeed = document.getElementById('camera-feed');
    const photoCanvas = document.getElementById('photo-canvas');
    const captureButton = document.getElementById('capture-photo');
    const switchCameraButton = document.getElementById('switch-camera');
    const flashButton = document.getElementById('toggle-flash');
    const modeButtons = document.querySelectorAll('.mode-button');

    let currentStream;
    let facingMode = 'environment';

    async function startCamera() {
        const constraints = {
            video: { facingMode: facingMode }
        };

        try {
            currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            cameraFeed.srcObject = currentStream;
        } catch (err) {
            console.error("Error accessing the camera", err);
        }
    }

    function stopCamera() {
        if (currentStream) {
            currentStream.getTracks().forEach(track => track.stop());
        }
    }

    switchCameraButton.addEventListener('click', () => {
        facingMode = facingMode === 'user' ? 'environment' : 'user';
        stopCamera();
        startCamera();
    });

    captureButton.addEventListener('click', () => {
        const context = photoCanvas.getContext('2d');
        photoCanvas.width = cameraFeed.videoWidth;
        photoCanvas.height = cameraFeed.videoHeight;
        context.drawImage(cameraFeed, 0, 0);

        // Here you would typically save or process the captured image
        console.log("Photo captured!");
    });

    flashButton.addEventListener('click', () => {
        // Implement flash functionality
        console.log("Flash toggled!");
    });

    modeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            modeButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            console.log(`Mode changed to: ${e.target.dataset.mode}`);
        });
    });

    startCamera();
});

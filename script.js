/* Taking video input and displaying on the web application.*/
const videoBtn = document.querySelector("#videoBtn");
const videoInput = document.querySelector("#videoInput");
const videoPlayer = document.querySelector("#main");

const handleInput = () => {
    // File input clicked. "click"
    videoInput.click();
}
const acceptInputHandler = (obj) => {
    // File input selected. "change"
    const selectedFiles = obj.target.files[0];

    // Convert any type of files into (Base64).
    const link = URL.createObjectURL(selectedFiles);

    const videoElement = document.createElement("video");
    videoElement.setAttribute("class","video");
    videoElement.src = link;
    videoPlayer.appendChild(videoElement);
    videoElement.volume = 0.3;
}
videoBtn.addEventListener("click",handleInput);
videoInput.addEventListener("change",acceptInputHandler);




/* Speed up/down and Volume up/down */
const speedUp = document.querySelector("#speedUp");
const speedDown = document.querySelector("#speedDown");
const volumeUp = document.querySelector("#volumeUp");
const volumeDown = document.querySelector("#volumeDown");
const toast = document.querySelector(".toast");

const speedUpHandler = () => {
    // Upon what we need to apply speedUp = Video
    const videoElement = document.querySelector("video");
    // If not selected yet return back.
    if(videoElement == null) return;

    // gets current speed of video and increases by 0.5
    if(videoElement.playbackRate <= 2.5) {
        const increaseSpeed = videoElement.playbackRate + 0.5;
        videoElement.playbackRate = increaseSpeed;

        // Displaying the toast.
        showToast(increaseSpeed+"X");
    }

}
const speedDownHandler = () => {
    const videoElement = document.querySelector("video");
    if(videoElement == null) return;

    if(videoElement.playbackRate-0.5 > 0) {
        const decreaseSpeed = videoElement.playbackRate-0.5;
        videoElement.playbackRate = decreaseSpeed;

        showToast(decreaseSpeed+"X");
    }
}
speedUp.addEventListener("click",speedUpHandler);
speedDown.addEventListener("click",speedDownHandler);




const volumeUpHandler = () => {
    const videoElement = document.querySelector("video");
    if(videoElement.volume >= 0.99) return;

    videoElement.volume = videoElement.volume+0.1;
    showToast(videoElement.volume*100+"%");
}
const volumeDownHandler = () => {
    const videoElement = document.querySelector("video");
    if(videoElement.volume <= 0.1) {
        videoElement.volume = 0;
        return;
    }

    videoElement.volume = videoElement.volume-0.1;
    showToast(videoElement.volume*100+"%");
}
volumeUp.addEventListener("click",volumeUpHandler);
volumeDown.addEventListener("click",volumeDownHandler);

function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => {
        toast.style.display = "none";
    }, 1000);
}




/* Controls for VLC Media Player */
const fullScreen = document.querySelector("#fullScreen");
const playBtn = document.querySelector("#play");
const pauseBtn = document.querySelector("#pause");


const handleFullScreen = () => {
    videoPlayer.requestFullscreen();
}
fullScreen.addEventListener("click",handleFullScreen);



const handlePlayBtn = () => {
    const videoElement = document.querySelector("video");
    const ProgBar = document.querySelector("#Bar");
    const percent = document.querySelector("#percentDone");
    videoElement.play();

    playBtn.style.color = "gray";
    pauseBtn.style.color = "black";

    // Starting Progress Bar :
    videoElement.addEventListener("timeupdate",() => {
        const TotTime = videoElement.duration;
        const currTime = videoElement.currentTime;
        const ProgressPercent = (currTime/TotTime)*100;
        ProgBar.style.width = ProgressPercent+"%";
        percent.textContent = Math.floor(ProgressPercent)+"%";
    });
}
playBtn.addEventListener("click",handlePlayBtn);



const handlePauseBtn = () => {
    const videoElement = document.querySelector("video");
    videoElement.pause();

    pauseBtn.style.color = "gray";
    playBtn.style.color = "black";
}
pauseBtn.addEventListener("click",handlePauseBtn);
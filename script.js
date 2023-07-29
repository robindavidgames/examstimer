// Variables
let timerInterval;
let startTime;
let endTime;
const countdownLines = [
  { time: 40, element: document.getElementById("40-minutes-time") },
  { time: 20, element: document.getElementById("20-minutes-time") },
  { time: 10, element: document.getElementById("10-minutes-time") },
  { time: 5, element: document.getElementById("5-minutes-time") },
];
const timerDisplay = document.getElementById("timerDisplay");
const startTimeDisplay = document.getElementById("startTimeDisplay");
const endTimeDisplay = document.getElementById("endTimeDisplay");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const fullScreenBtn = document.getElementById("fullScreenBtn");
const beepSound = document.getElementById("beepSound");

// Format time as HH:MM:SS
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Get the actual time that corresponds to the countdown time
function getActualTime(timeLeft) {
  const now = new Date(startTime.getTime() + (timeLeft * 1000));
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
}

// Update countdown lines with formatted times
function updateCountdownLines(time) {
  for (const line of countdownLines) {
    const remainingTime = time - line.time * 60;
    line.element.textContent = remainingTime > 0 ? getActualTime(remainingTime) : "";
    if (remainingTime <= 0) {
      line.element.parentNode.style.textDecoration = "initial";
    }
  }

  // Set the end time (1 hour after start time)
  // endTimeDisplay.textContent = getActualTime(endTime / 1000);
}

// Start the countdown timer
function startTimer() {
  startTime = new Date();
  endTime = new Date(startTime.getTime() + 3600000); // 1 hour later

  let secondsLeft = 3600;
  timerInterval = setInterval(() => {
    secondsLeft--;
    timerDisplay.textContent = formatTime(secondsLeft);

    updateCountdownLines(secondsLeft);

    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "00:00:00";
      beepSound.play();
    }
  }, 1000);

  // Set the start time
  startTimeDisplay.textContent = `${startTime.getHours().toString().padStart(2, "0")}:${startTime.getMinutes().toString().padStart(2, "0")}`;

  // Set the end time
  endTimeDisplay.textContent = `${endTime.getHours().toString().padStart(2, "0")}:${endTime.getMinutes().toString().padStart(2, "0")}`;
}


// Reset the countdown timer
function resetTimer() {
  clearInterval(timerInterval);
  timerDisplay.textContent = "1:00:00";

  for (const line of countdownLines) {
    line.element.textContent = "";
    line.element.parentNode.style.textDecoration = "initial";
  }

  startTimeDisplay.textContent = "";
  endTimeDisplay.textContent = "";
}

// Toggle full screen
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
    fullScreenBtn.textContent = "Return";
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch((err) => {
        console.log(`Error attempting to exit full-screen mode: ${err.message} (${err.name})`);
      });
      fullScreenBtn.textContent = "Full screen";
    }
  }
}

// Event listeners
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
fullScreenBtn.addEventListener("click", toggleFullScreen);

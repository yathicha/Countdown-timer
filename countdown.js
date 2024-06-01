var timerInterval;
var isPaused = false;
var remainingTime;
var loopSound;

function playLoopSound() {
  console.log("Playing loop sound...");
  loopSound.play();
}

function stopLoopSound() {
  console.log("Stopping loop sound...");
  loopSound.pause();
  loopSound.currentTime = 0;
}

function startTimer() {
  console.log("Starting timer...");
  var params = new URLSearchParams(window.location.search);
  var hours = parseInt(params.get('hours')) || 0;
  var minutes = parseInt(params.get('minutes')) || 0;
  var seconds = parseInt(params.get('seconds')) || 0;

  // Display the initial time set by the user
  console.log("Initial time:", hours, "hours", minutes, "minutes", seconds, "seconds");
  document.getElementById("hours-countdown").innerHTML = pad(hours);
  document.getElementById("minutes-countdown").innerHTML = pad(minutes);
  document.getElementById("seconds-countdown").innerHTML = pad(seconds);

  // Get the loop sound element
  loopSound = document.getElementById("loopSound");

  // Start the countdown immediately
  startCountdown(hours, minutes, seconds);
}

function restartTimer() {
  console.log("Restarting timer...");
  clearInterval(timerInterval);
  isPaused = false;
  startTimer();
}

function togglePausePlay() {
  console.log("Toggling pause/play...");
  var pausePlayButton = document.getElementById("pausePlayButton");
  var pausePlayText = document.getElementById("pausePlayText");
  
  if (isPaused) {
    startCountdown(remainingTime.hours, remainingTime.minutes, remainingTime.seconds);
    isPaused = false;
    pausePlayText.innerText = "Pause";
  } else {
    clearInterval(timerInterval);
    isPaused = true;
    pausePlayText.innerText = "Play";
  }
}

function startCountdown(hours, minutes, seconds) {
  console.log("Starting countdown...");
  var totalSeconds = hours * 3600 + minutes * 60 + seconds;
  var currentSecond = totalSeconds;

  function updateTimer() {
    if (currentSecond < 0) {
      clearInterval(timerInterval);
      // Show the modal when time is up
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      playLoopSound();
      
      // Stop the sound when back button is clicked
      var backButton = document.getElementById("backbutton");
      if (backButton) {
        backButton.addEventListener('click', stopLoopSound);
      }
      
      return;
    }
  
    // Hide the modal if it's currently visible
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
  
    if (!isPaused) {
      remainingTime = {
        hours: Math.floor(currentSecond / 3600),
        minutes: Math.floor((currentSecond % 3600) / 60),
        seconds: currentSecond % 60
      };
  
      var hoursRemaining = remainingTime.hours;
      var minutesRemaining = remainingTime.minutes;
      var secondsRemaining = remainingTime.seconds;
  
      document.getElementById("hours-countdown").innerHTML = pad(hoursRemaining);
      document.getElementById("minutes-countdown").innerHTML = pad(minutesRemaining);
      document.getElementById("seconds-countdown").innerHTML = pad(secondsRemaining);
    }
    currentSecond--;
  }

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
}

// Function to pad single digits with leading zeros
function pad(number) {
  return (number < 10 ? '0' : '') + number;
}

document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM content loaded, starting timer...");
  startTimer();
});

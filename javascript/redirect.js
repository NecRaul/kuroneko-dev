function updateRedirectTimer(seconds) {
  var redirectElement = document.getElementById("redirect");
  redirectElement.textContent =
    "You are being redirected in " + seconds + "...";
}

var secondsRemaining = 5;
updateRedirectTimer(secondsRemaining);

var countdownInterval = setInterval(function () {
  secondsRemaining--;
  if (secondsRemaining <= 0) {
    clearInterval(countdownInterval);
    window.location.href = "/";
  } else {
    updateRedirectTimer(secondsRemaining);
  }
}, 1000);

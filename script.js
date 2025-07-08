const datePicker = document.getElementById("datePicker");

const DEFAULT_DATE = "2026-02-08";

function getSavedDate() {
  return localStorage.getItem("targetDate") || DEFAULT_DATE;
}

function saveDate(dateStr) {
  localStorage.setItem("targetDate", dateStr);
}

datePicker.value = getSavedDate();

datePicker.addEventListener("change", () => {
  const selectedDate = datePicker.value;
  saveDate(selectedDate);
});

function getCurrentTimeInIST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 60 * 60000;
  return new Date(utc + istOffset);
}

function getTargetTimeInIST(dateStr) {
  return new Date(`${dateStr}T03:30:00Z`);
}

function updateCountdown() {
  const now = getCurrentTimeInIST();
  const target = getTargetTimeInIST(getSavedDate());

  const diffMs = target - now;

  if (diffMs <= 0) {
    document.querySelector(".timer").innerHTML = "<h2>GATE 2026 is here!</h2>";
    document.querySelector(".total-time").innerHTML = "";
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = Math.floor(totalDays / 30.44);

  const seconds = totalSeconds % 60;
  const minutes = totalMinutes % 60;
  const hours = totalHours % 24;
  const days = totalDays % 7;

  document.getElementById("months").textContent = totalMonths;
  document.getElementById("weeks").textContent = totalWeeks;
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  document.getElementById("total-months").textContent = totalMonths;
  document.getElementById("total-weeks").textContent = totalWeeks;
  document.getElementById("total-days").textContent = totalDays;
  document.getElementById("total-hours").textContent = totalHours;
  document.getElementById("total-seconds").textContent = totalSeconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

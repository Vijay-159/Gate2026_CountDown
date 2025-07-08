const datePicker = document.getElementById("datePicker");

// Default target date in IST (8 Feb 2026, 9:00 AM IST)
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

// Convert to IST from UTC (adds +5:30 hours)
function getCurrentTimeInIST() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const istOffset = 5.5 * 60 * 60000; // IST offset
  return new Date(utc + istOffset);
}

function getTargetTimeInIST(dateStr) {
  // Assume 9:00 AM IST as default exam start time
  return new Date(`${dateStr}T03:30:00Z`); // 9:00 AM IST = 03:30 UTC
}

function updateCountdown() {
  const now = getCurrentTimeInIST();
  const target = getTargetTimeInIST(getSavedDate());

  const diffMs = target - now;

  if (diffMs <= 0) {
    document.querySelector(".timer").innerHTML = "<h2>GATE 2026 is here!</h2>";
    return;
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = Math.floor(totalDays / 30.44); // Approx

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
}

setInterval(updateCountdown, 1000);
updateCountdown();

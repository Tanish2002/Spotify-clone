import "./style.css";
const APP_URL = window.location.host;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("accessToken")) {
    window.location.href = `http://${APP_URL}/dashboard/dashboard.html`;
  } else {
    window.location.href = `http://${APP_URL}/login/login.html`;
  }
});

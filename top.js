// top.js

document.addEventListener("DOMContentLoaded", function () {
    const menuBar = document.getElementById("menu-bar");
    const leftPanel = document.getElementById("left-panel");

    menuBar.addEventListener("click", function () {
        leftPanel.classList.toggle("show-menu");
    });
});

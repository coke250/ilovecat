// const btn = document.querySelector(".btn-toggle");
// const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// const currentTheme = localStorage.getItem("theme");
// if(currentTheme == "dark"){
//     document.body.classList.toggle("dark-theme");
// }else if(currentTheme == "light"){
//     document.body.classList.toggle("light-theme");
// }

// btn.addEventListener("click", function () {
//   if (prefersDarkScheme.matches) { // OS 다크 모드
//     document.body.classList.toggle("light-theme");
//     var theme = document.body.classList.contains("light-theme") ? "light" : "dark";
//   } else { // OS 라이트 모드
//     document.body.classList.toggle("dark-theme");
//     var theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
//   }
//   localStorage.setItem("theme", theme);
// });

import App from './App.js';

const app = new App(document.querySelector('.app'));
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
// localStorage.clear();
let loadLS = localStorage.getItem("habits");
let habits;
loadLS ? (habits = JSON.parse(loadLS)) : (habits = []);
const changeLS = function (item) {
  let obg = JSON.parse(localStorage.getItem("habits"));
  if (!Array.isArray(obg)) {
    localStorage.clear();
    obg = [];
  }
  obg.push(item);
  localStorage.setItem("habits", JSON.stringify(obg));
  habits = JSON.parse(localStorage.getItem("habits"));
};

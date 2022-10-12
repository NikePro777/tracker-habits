// export
const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
// localStorage.setItem(
//   "habits",
//   JSON.stringify([
//     {
//       img: "../assets/images/coffee.png",
//       name: "fd",
//       completed: [false, false, false, false, false, false, false],
//     },
//   ])
// );
// localStorage.clear();
let loadLS = localStorage.getItem("habits");
// export
let habits;
loadLS ? (habits = JSON.parse(loadLS)) : (habits = []);
// export
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

export const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
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
let loadLS = localStorage.getItem("habits");
export let habits;
loadLS ? (habits = JSON.parse(loadLS)) : (habits = []);

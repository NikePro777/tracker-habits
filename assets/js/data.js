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
// localStorage.clear();
let loadLS = localStorage.getItem("habits");
export let habits;

export const changeLS = function (item) {
  let obg = JSON.parse(localStorage.getItem("habits"));
  console.log(obg);
  if (!loadLS) {
    localStorage.clear();
    obg = [];
  }
  console.log(obg);
  obg.push(item);
  console.log(obg);
  localStorage.setItem("habits", JSON.stringify(obg));
  habits = JSON.parse(loadLS);
  console.log(habits);
};
loadLS ? (habits = JSON.parse(loadLS)) : (habits = []);

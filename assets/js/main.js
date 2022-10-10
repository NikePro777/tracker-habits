import { habits, weekDays } from "./data.js";
import { upload } from "./upload.js";

import firebase from "../../node_modules/firebase/app";
import "../../node_modules/firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBvYLfTFTpXnEpj0mJF6HMqbQz3UUR0HnU",
  authDomain: "tracker-habits.firebaseapp.com",
  projectId: "tracker-habits",
  storageBucket: "tracker-habits.appspot.com",
  messagingSenderId: "791699178608",
  appId: "1:791699178608:web:87f2f9a1c2c983d42320b5",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = firebase.storage();
console.log(storage);
const toggleHabit = (target) => {
  if (target.childNodes[0]) {
    habits[target.id[0]].completed[target.id[1]] =
      !habits[target.id[0]].completed[target.id[1]];
    render(habits);
  } else {
    habits[target.parentNode.id[0]].completed[target.parentNode.id[1]] =
      !habits[target.parentNode.id[0]].completed[target.parentNode.id[1]];
    render(habits);
  }
};

const getWeekDaysElement = (completed, id) =>
  weekDays
    .map((name, index) =>
      completed[index]
        ? `<button class="checked bg-black rounded-full h-12 w-12 flex items-center justify-center" id=${id}${index}><img width="45" src="./assets/images/check.svg" alt="check" /></button>`
        : `<button class="rounded-full border-2 border-solid transition-opacity opacity-20 border-black h-12 w-12 flex items-center justify-center text-lg uppercase font-semibold unchecked" id=${id}${index}>${name}</button>`
    )
    .join("");

const getHabitElement = ({ img, name, completed }, index) =>
  `<div class="mb-8"><div class="flex items-center gap-4 mb-5"><img width="70" class="rounded-3xl border-2 border-[#e2e4dd] border-solid" src="${img}" alt="no coffee"/>
  <span class="font-semibold text-2xl">${name}</span></div><div class="flex items-center justify-between habit-plan">${getWeekDaysElement(
    completed,
    index
  )}
  </div></div>`;

const habitContainer = document.querySelector(".habit-container");

export const render = (habits) => {
  habitContainer.innerHTML = habits
    .map((habit, index) => getHabitElement(habit, index))
    .join("");
  const button = habitContainer.querySelectorAll("button");
  button.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      const { target } = event;
      toggleHabit(target);
    })
  );
  // start Progress bar
  const countDays = habits.length * 7;
  let count = 0;
  habits.forEach((habit) => {
    habit.completed.forEach((completed) => {
      if (completed) {
        count++;
      }
    });
  });
  const percent = (count / countDays) * 100;
  const progressBar = document.querySelector(".progress-bar > div");
  progressBar.textContent = isNaN(percent)
    ? "Нужно больше привычек!"
    : Math.round(percent) + "%";
  progressBar.style.width = percent + "%";
};
// finish Progress bar
upload("#file", {
  multi: true,
  accept: [".png", ".jpeg", ".jpg", ".gif"],
  onUpload(files) {
    console.log("files ", files);
  },
});
render(habits);

// import { habits, weekDays } from "./data.js";
// import habits from "./data.js";

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];
const habits = [
  {
    img: "./assets/images/coffee.png",
    name: "No caffeine",
    completed: [true, false, false, false, true, false, true],
  },
];

const toggleHabit = (target) => {
  console.log(target.childNodes[0] ? target.childNodes : target.parentNode.id);
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

const render = (habits) => {
  habitContainer.innerHTML = habits
    .map((habit, index) => getHabitElement(habit, index))
    .join("");
};
render(habits);

const button = habitContainer.querySelectorAll("button");
// console.log(button);
button.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    const { target } = event;
    toggleHabit(target);
  })
);

// console.log(button[6].id);
eekDays
  .map((name, index) =>
    completed[index]
      ? `<button class="checked bg-black rounded-full h-12 w-12 flex items-center justify-center" id=${id}${index}><img width="45" src="./assets/images/check.svg" alt="check" /></button>`
      : `<button class="rounded-full border-2 border-solid transition-opacity opacity-20 border-black h-12 w-12 flex items-center justify-center text-lg uppercase font-semibold unchecked" id=${id}${index}>${name}</button>`
  )
  .join("");

// habitContainer.button.addEventListener('click'=toggleHabit)

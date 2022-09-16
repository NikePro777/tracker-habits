import { habits, weekDays } from "./data.js";
// import habits from "./data.js";

// const toggleHabit = () => {
//   alert("!");
// };

const getWeekDaysElement = (completed) =>
  weekDays
    .map((name, index) =>
      completed[index]
        ? '<button class="checked bg-black rounded-full h-12 w-12 flex items-center justify-center"><img width="45" src="./assets/images/check.svg" alt="check" /></button>'
        : `<button class="rounded-full border-2 border-solid transition-opacity opacity-20 border-black h-12 w-12 flex items-center justify-center text-lg uppercase font-semibold unchecked">${name}</button>`
    )
    .join("");

const getHabitElement = ({ img, name, completed }) =>
  `<div class="mb-8"><div class="flex items-center gap-4 mb-5"><img width="70" class="rounded-3xl border-2 border-[#e2e4dd] border-solid" src="${img}" alt="no coffee"/>
  <span class="font-semibold text-2xl">${name}</span></div><div class="flex items-center justify-between habit-plan">${getWeekDaysElement(
    completed
  )}
  </div></div>`;

const habitContainer = document.querySelector(".habit-container");
habitContainer.innerHTML = habits
  .map((habit) => getHabitElement(habit))
  .join("");

const button = habitContainer.querySelectorAll("button");
button.addEventListener("click", () => {
  alert("!");
});
console.log(button);
// habitContainer.button.addEventListener('click'=toggleHabit)

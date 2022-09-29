import { habits, weekDays } from "./data.js";

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

const render = (habits) => {
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

  // start add new habit

  const btnAddForm = document.querySelector("[data='creatHabit']");
  btnAddForm.addEventListener("click", (event) => {
    const { target } = event;
    openForm();
  });
  const btnAddHabit = document.querySelector("[data='addNewHabit']");
  btnAddHabit.addEventListener("click", (event) => {
    const { target } = event;
    addNewHabit();
  });

  const openForm = () => {
    document.querySelector("#form").classList.remove("hidden");
  };

  const addNewHabit = () => {
    const inputElem = document.querySelector("#form input");
    const value = inputElem.value;
    document.querySelector("#form").classList.add("hidden");
    if (!value) {
      console.log(value);
      alert("value is required!");
      return;
    } else {
      // document.querySelector("#form input").value = "";
      const newValue = {
        img: "./assets/images/coffee.png",
        name: value,
        completed: [false, false, false, false, false, false, false],
      };
      // value = "";
      habits[habits.length] = newValue;
      render(habits);
      inputElem.value = "";
    }
  };

  // finish add habit

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
  progressBar.textContent = Math.round(percent) + "%";
  progressBar.style.width = percent + "%";
  // finish Progress bar
};
render(habits);

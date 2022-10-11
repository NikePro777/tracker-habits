// start add new habit
import { render } from "./main.js";
import { habits } from "./data.js";
import { picture } from "./compressImage.js";

const dialog = document.querySelector("dialog");
const btnAddForm = document.querySelector("[data='creatHabit']");
const btnCancel = dialog.querySelector('[data="cancelBtn"]');
btnAddForm.onclick = () => {
  dialog.showModal();
};
btnCancel.onclick = () => {
  dialog.close();
  inputElem.value = "";
};
const btnAddHabit = document.querySelector("[data='addNewHabit']");
const inputElem = document.querySelector("#form input");
btnAddHabit.onclick = () => {
  const value = inputElem.value;
  if (!value) {
    console.log(value);
    alert("value is required!");
    dialog.close();
    return;
  } else {
    const newValue = {
      img: picture,
      name: value,
      completed: [false, false, false, false, false, false, false],
    };
    habits[habits.length] = newValue;
    dialog.close();
    render(habits);
    inputElem.value = "";
  }
};
// finish add habit

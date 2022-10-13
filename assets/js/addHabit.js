const dialog = document.querySelector("dialog");
const btnAddForm = document.querySelector("[data='creatHabit']");
const btnCancel = dialog.querySelector('[data="cancelBtn"]');
btnAddForm.onclick = () => {
  dialog.showModal();
};
btnCancel.onclick = () => {
  dialog.close();
  inputElem.value = "";
  dialog.querySelector(".preview").innerHTML = "";
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
      img: picture || "./assets/images/coffee.png",
      name: value,
      completed: [false, false, false, false, false, false, false],
    };
    changeLS(newValue);
    btnCancel.onclick();
    render(habits);
  }
};

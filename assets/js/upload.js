export function upload(selector, options = {}) {
  const input = document.querySelector(selector);
  const open = document.createElement("button");
  open.classList.add("btn");
  open.textContent = "open";
  if (options.multi) {
    input.setAttribute("multiple", true);
  }
  // помещяем наш элемент в конец селектора
  input.insertAdjacentElement("afterend", open);

  // Функция которая по клике на нашу кнопку, вызывает клик по импуту (который открывает вкладку по загрузке файлов)
  const triggerInput = () => input.click();
  const changeHandler = (event) => {
    console.log(event.target.files);
  };
  open.addEventListener("click", triggerInput);
  input.addEventListener("change", changeHandler);
}

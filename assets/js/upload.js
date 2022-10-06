function bytesToSize(bytes) {
  const sizes = ["Bites", "Kb", "Mb", "Gb", "Tb"];
  if (!bytes) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}
export function upload(selector, options = {}) {
  let files = [];
  const input = document.querySelector(selector);
  const preview = document.createElement("div");
  preview.classList.add("preview");
  const open = document.createElement("button");
  open.classList.add("btn");
  open.textContent = "open";
  // Чтобы можно было скачивать много файлов
  if (options.multi) {
    input.setAttribute("multiple", true);
  }
  // Чтобы скачать можно было файлы определенных форматов
  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute("accept", options.accept.join(","));
  }
  // помещяем наш элемент в конец селектора
  input.insertAdjacentElement("afterend", preview); //afterend означает что контент будет находиться вне нашего блока
  input.insertAdjacentElement("afterend", open);

  // Функция которая по клике на нашу кнопку, вызывает клик по импуту (который открывает вкладку по загрузке файлов)
  const triggerInput = () => input.click();
  const changeHandler = (event) => {
    if (!event.target.files.length) {
      return;
    }
    //изначально event.target.files это толи какой то особой тип толи обьект, мы его приводим к массиву
    files = Array.from(event.target.files);
    preview.innerHTML = "";
    files.forEach((file) => {
      if (!file.type.match("image")) {
        // работать будем только с картинкой
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target.result;
        // здесь афтер бегин означает что наш элемент будет находиться внутри блока превью
        preview.insertAdjacentHTML(
          "afterbegin",
          `<div class='preview-image'>
          <div class="preview-remove" data-name='${file.name}'>&times</div>
          <img src='${src}' alt='${file.name}'/>
          <div class="preview-info">
          <span>${file.name}</span>${bytesToSize(file.size)}</div></div>`
        );
      };
      reader.readAsDataURL(file);
    });
    console.log(files);
  };
  const removeHandler = (event) => {
    if (!event.target.dataset.name) {
      return;
    }
    const { name } = event.target.dataset;
    console.log(name);
    // а так можно все дата атрибуты вывести
    //console.log(event.target.dataset);
  };
  open.addEventListener("click", triggerInput);
  input.addEventListener("change", changeHandler);
  preview.addEventListener("click", removeHandler);
}
render = (habits) => {
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

export function upload(selector, options = {}) {
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
  if (options.aссept && Array.isArray(options.accept)) {
    console.log(options.aссept.join(",").toString());
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
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      if (!file.type.match("image")) {
        // работать будем только с картинкой
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        const src = ev.target.result;
        preview.insertAdjacentHTML(
          "afterbegin",
          `<div class='preview-image'> <img src='${src}' alt='${file.name}'/></div>`
        );
      };
      reader.readAsDataURL(file);
    });
    console.log(files);
  };
  open.addEventListener("click", triggerInput);
  input.addEventListener("change", changeHandler);
}

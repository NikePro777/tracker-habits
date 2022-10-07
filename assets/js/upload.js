function bytesToSize(bytes) {
  const sizes = ["Bites", "Kb", "Mb", "Gb", "Tb"];
  if (!bytes) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
}
// функция позволяющая нам создавать элементы (чтобы каждый раз не прописывать все)
const element = (tag, classes = [], content) => {
  const node = document.createElement(tag);
  if (classes.length) {
    node.classList.add(...classes);
  }
  if (content) {
    node.textContent = content;
  }
  return node;
};
export function upload(selector, options = {}) {
  let files = [];
  const input = document.querySelector(selector);
  const preview = element("div", ["preview"]);
  const open = element("button", ["btn"], "open");
  const upload = element("button", ["btn", "primary"], "Загрузить");

  if (options.multi) {
    input.setAttribute("multiple", true);
  }
  // Чтобы скачать можно было файлы определенных форматов
  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute("accept", options.accept.join(","));
  }
  // помещяем наш элемент в конец селектора
  input.insertAdjacentElement("afterend", preview); //afterend означает что контент будет находиться вне нашего блока
  input.insertAdjacentElement("afterend", upload);
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
  };
  const removeHandler = (event) => {
    if (!event.target.dataset.name) {
      return;
    }
    const { name } = event.target.dataset;
    files = files.filter((file) => file.name !== name);
    // а так можно все дата атрибуты вывести
    //console.log(event.target.dataset);
    const block = preview
      .querySelector(`[data-name='${name}']`)
      .closest(".preview-image"); // получаем родительский элемент с таким атрибутом
    block.classList.add("removing"); // Это делаем только чтобы добавить анимацию
    setTimeout(() => block.remove(), 3000);
  };
  open.addEventListener("click", triggerInput);
  input.addEventListener("change", changeHandler);
  preview.addEventListener("click", removeHandler);
}

export function CompressImage(base64) {
  const canvas = document.createElement("canvas");
  const img = document.createElement("img");
  img.onload = function () {
    let width = img.width;
    let height = img.height;
    const maxHeight = 70;
    const maxWidth = 70;

    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height *= maxWidth / width));
        width = maxWidth;
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width *= maxHeight / height));
        height = maxHeight;
      }
    }
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
    let compressedData = canvas.toDataURL("image/jpeg", 0.9);
    // preview.insertAdjacentHTML(
    //   "afterbegin",
    //   `<div class='preview-image'>
    //   <div class="preview-remove" data-name='${img.name}'>&times</div>
    //   <img src='${compressedData}' alt='${file.name}'/>
    //   <div class="preview-info">
    //   <span>${img.name}</span>${bytesToSize(img.size)}</div></div>`
    // );
  };
  img.onerror = function (err) {
    reject(err);
  };
  img.src = base64;
}

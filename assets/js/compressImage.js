// import { habits } from "./data";
export let picture;
export function CompressImage(base64) {
  const canvas = document.createElement("canvas");
  const img = document.createElement("img");

  img.onload = function () {
    let width = img.width;
    let height = img.height;
    // const maxHeight = 70;
    // const maxWidth = 70;

    // if (height > width) {
    //   if (height > maxHeight) {
    //     width = Math.round((width *= maxHeight / height));
    //     height = maxHeight;
    //   }
    // } else {
    //   if (width > maxWidth) {
    //     height = Math.round((height *= maxWidth / width));
    //     width = maxWidth;
    //   }
    // }
    canvas.width = width;
    canvas.height = height;

    // canvas.width = 70;
    // canvas.height = 70;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    let compressedData = canvas.toDataURL("image/jpeg", 1);
    picture = compressedData;
  };
  img.onerror = function (err) {
    reject(err);
  };
  img.src = base64;
}
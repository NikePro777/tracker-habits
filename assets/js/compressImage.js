let picture;
let oldSize;
function CompressImage(base64) {
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
    function compress(oldSize) {
      if (oldSize / 1000 > 5000) {
        return 0.07;
      } else {
        if (oldSize / 1000 > 1000) {
          return 0.1;
        }
        if (oldSize / 1000 > 1) {
          return 0.4;
        }
        return 0.9;
      }
    }
    let compressedData = canvas.toDataURL("image/jpeg", compress(oldSize));
    picture = compressedData;
  };
  img.onerror = function (err) {
    reject(err);
  };
  img.src = base64;
}

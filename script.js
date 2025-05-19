let originalImage = new Image();

document.getElementById('imageInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(evt) {
    originalImage.onload = function() {
      document.getElementById('width').value = originalImage.width;
      document.getElementById('height').value = originalImage.height;
    };
    originalImage.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

document.getElementById('width').addEventListener('input', function() {
  const aspect = document.getElementById('aspectRatio').checked;
  if (aspect && originalImage.width && originalImage.height) {
    const newWidth = parseInt(this.value);
    const ratio = originalImage.height / originalImage.width;
    document.getElementById('height').value = Math.round(newWidth * ratio);
  }
});

document.getElementById('height').addEventListener('input', function() {
  const aspect = document.getElementById('aspectRatio').checked;
  if (aspect && originalImage.width && originalImage.height) {
    const newHeight = parseInt(this.value);
    const ratio = originalImage.width / originalImage.height;
    document.getElementById('width').value = Math.round(newHeight * ratio);
  }
});

function resizeImage() {
  const width = parseInt(document.getElementById('width').value);
  const height = parseInt(document.getElementById('height').value);
  const format = document.getElementById('format').value;

  if (!originalImage.src || !width || !height) {
    alert("Please upload an image and enter valid dimensions.");
    return;
  }

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(originalImage, 0, 0, width, height);

  const resizedImageURL = canvas.toDataURL(format);

  const outputImage = document.getElementById('outputImage');
  outputImage.src = resizedImageURL;
  outputImage.style.display = 'block';

  const downloadLink = document.getElementById('downloadLink');
  downloadLink.href = resizedImageURL;
  downloadLink.download = `resized-image.${format.split('/')[1]}`;
  downloadLink.style.display = 'inline';
}

function resetAll() {
  document.getElementById('imageInput').value = "";
  document.getElementById('width').value = "";
  document.getElementById('height').value = "";
  document.getElementById('aspectRatio').checked = false;
  document.getElementById('format').value = "image/png";
  document.getElementById('outputImage').style.display = "none";
  document.getElementById('downloadLink').style.display = "none";
  originalImage = new Image();
}

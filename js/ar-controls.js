// Lấy reference đến model-viewer element
const modelViewer = document.querySelector("model-viewer");

// Hàm phóng to mô hình
function scaleUp() {
  const currentScale = modelViewer.scale.split(" ").map(Number);
  const newScale = currentScale.map((value) => value * 1.2);
  modelViewer.scale = newScale.join(" ");
}

// Hàm thu nhỏ mô hình
function scaleDown() {
  const currentScale = modelViewer.scale.split(" ").map(Number);
  const newScale = currentScale.map((value) => value * 0.8);
  modelViewer.scale = newScale.join(" ");
}

// Hàm xoay trái
function rotateLeft() {
  modelViewer.orientation = `0deg ${
    parseFloat(modelViewer.orientation || 0) - 10
  }deg 0deg`;
}

// Hàm xoay phải
function rotateRight() {
  modelViewer.orientation = `0deg ${
    parseFloat(modelViewer.orientation || 0) + 10
  }deg 0deg`;
}

// Thêm xử lý touch events cho di chuyển mô hình
let startX, startY;
let isDragging = false;

modelViewer.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  isDragging = true;
});

modelViewer.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const deltaX = e.touches[0].clientX - startX;
  const deltaY = e.touches[0].clientY - startY;

  // Cập nhật vị trí của mô hình
  const currentPosition = modelViewer.cameraOrbit.split(" ");
  modelViewer.cameraOrbit = `${deltaX * 0.5}deg ${deltaY * 0.5}deg 2m`;

  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

modelViewer.addEventListener("touchend", () => {
  isDragging = false;
});

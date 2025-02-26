AFRAME.registerComponent("ar-draggable", {
  init: function () {
    this.el.addEventListener("touchstart", this.onTouchStart.bind(this));
    this.el.addEventListener("touchmove", this.onTouchMove.bind(this));
    this.el.addEventListener("touchend", this.onTouchEnd.bind(this));

    this.touchStarted = false;
    this.initialPosition = new THREE.Vector3();
    this.initialTouchPosition = new THREE.Vector2();
  },

  onTouchStart: function (evt) {
    evt.preventDefault();
    this.touchStarted = true;
    this.initialPosition.copy(this.el.object3D.position);
    this.initialTouchPosition.set(
      evt.touches[0].clientX,
      evt.touches[0].clientY
    );
  },

  onTouchMove: function (evt) {
    if (!this.touchStarted) return;

    const deltaX =
      (evt.touches[0].clientX - this.initialTouchPosition.x) * 0.01;
    const deltaY =
      (evt.touches[0].clientY - this.initialTouchPosition.y) * 0.01;

    this.el.object3D.position.set(
      this.initialPosition.x + deltaX,
      this.initialPosition.y,
      this.initialPosition.z + deltaY
    );
  },

  onTouchEnd: function () {
    this.touchStarted = false;
  },
});

// Các hàm điều khiển
function scaleUp() {
  const model = document.querySelector("[gltf-model]");
  const scale = model.getAttribute("scale");
  model.setAttribute(
    "scale",
    `${scale.x * 1.2} ${scale.y * 1.2} ${scale.z * 1.2}`
  );
}

function scaleDown() {
  const model = document.querySelector("[gltf-model]");
  const scale = model.getAttribute("scale");
  model.setAttribute(
    "scale",
    `${scale.x * 0.8} ${scale.y * 0.8} ${scale.z * 0.8}`
  );
}

function rotateLeft() {
  const model = document.querySelector("[gltf-model]");
  const rotation = model.getAttribute("rotation");
  model.setAttribute(
    "rotation",
    `${rotation.x} ${rotation.y - 10} ${rotation.z}`
  );
}

function rotateRight() {
  const model = document.querySelector("[gltf-model]");
  const rotation = model.getAttribute("rotation");
  model.setAttribute(
    "rotation",
    `${rotation.x} ${rotation.y + 10} ${rotation.z}`
  );
}

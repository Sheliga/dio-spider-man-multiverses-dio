let currentIndex = 0;
let autoRotateInterval = null;
let hasUserInteracted = false;

function handleMouseEnter() {
  this.classList.add("s-card--hovered");
  document.body.id = `${this.id}-hovered`;
}

function handleMouseLeave() {
  this.classList.remove("s-card--hovered");
  document.body.id = "";
}

function addEventListenersToCards() {
  const cardElements = document.getElementsByClassName("s-card");
  for (let card of cardElements) {
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
  }
}

function updateCarousel(index) {
  const carousel = document.querySelector(".s-cards-carousel");
  const rotateYDeg = -120 * index;
  carousel.style.transform = `translateZ(-40vw) rotateY(${rotateYDeg}deg)`;

  document.querySelectorAll(".s-controller__button").forEach((btn, idx) => {
    btn.classList.toggle("s-controller__button--active", idx === index);
    btn.setAttribute("aria-pressed", idx === index);
  });
}

function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    if (hasUserInteracted) return;
    currentIndex = (currentIndex + 1) % 3;
    updateCarousel(currentIndex);
  }, 3000); // 3 segundos entre rotações
}

function stopAutoRotate() {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;
  }
}

function selectCarouselItem(selectedButtonElement) {
  hasUserInteracted = true;
  stopAutoRotate();

  const selectedItem = parseInt(selectedButtonElement.id) - 1;
  currentIndex = selectedItem;

  updateCarousel(currentIndex);
}

document.addEventListener("DOMContentLoaded", () => {
  addEventListenersToCards();

  document.querySelectorAll(".s-controller__button").forEach((button) => {
    button.addEventListener("click", function () {
      selectCarouselItem(this);
    });
  });

  startAutoRotate();
});

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

  for (let index = 0; index < cardElements.length; index++) {
    const card = cardElements[index];
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);
  }

  // Adiciona listeners nos botões do carrossel
  const controllerButtons = document.querySelectorAll(".s-controller__button");
  controllerButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectCarouselItem(button);
    });
  });
}

function selectCarouselItem(selectedButtonElement) {
  hasUserInteracted = true;
  stopAutoRotate();

  const selectedIndex = parseInt(selectedButtonElement.id) - 1;
  currentIndex = selectedIndex;
  updateCarouselRotation(selectedIndex);
}

function updateCarouselRotation(index) {
  const carousel = document.querySelector(".s-cards-carousel");
  const newTransform = `translateZ(-40vw) rotateY(${-120 * index}deg)`;
  carousel.style.transform = newTransform;

  const controllerButtons = document.querySelectorAll(".s-controller__button");
  controllerButtons.forEach((btn, i) => {
    btn.classList.toggle("s-controller__button--active", i === index);
    btn.setAttribute("aria-pressed", i === index);
  });
}

function startAutoRotate() {
  autoRotateInterval = setInterval(() => {
    if (hasUserInteracted) return;

    currentIndex = (currentIndex + 1) % 3;
    updateCarouselRotation(currentIndex);
  }, 3000);
}

function stopAutoRotate() {
  if (autoRotateInterval) {
    clearInterval(autoRotateInterval);
    autoRotateInterval = null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  addEventListenersToCards();
  startAutoRotate();
});

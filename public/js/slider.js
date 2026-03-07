const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let autoSlide;

/* create dots */
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");

  if (i === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    index = i;
    updateSlider();
    restartAuto();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function updateSlider(){
  slides.forEach(s => s.classList.remove("active"));
  dots.forEach(d => d.classList.remove("active"));

  slides[index].classList.add("active");
  dots[index].classList.add("active");
}

function nextSlide(){
  index = (index + 1) % slides.length;
  updateSlider();
}

function prevSlide(){
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
}

next.addEventListener("click", () => {
  nextSlide();
  restartAuto();
});

prev.addEventListener("click", () => {
  prevSlide();
  restartAuto();
});

/* auto slide */

function startAuto(){
  autoSlide = setInterval(nextSlide, 5000);
}

function restartAuto(){
  clearInterval(autoSlide);
  startAuto();
}

startAuto();
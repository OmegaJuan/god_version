const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function showSlide(){
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide(){
  index++;
  if(index >= slides.length) index = 0;
  showSlide();
}

function prevSlide(){
  index--;
  if(index < 0) index = slides.length - 1;
  showSlide();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

/* auto slide */
setInterval(nextSlide, 4000);
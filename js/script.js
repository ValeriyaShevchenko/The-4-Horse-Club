(function (d) {
  "use strict";

  function sliderTransformation() {
    const sliderContainer = d.querySelector(".js-transformation-slider");

    if (!sliderContainer) {
      return;
    }

    const sliderTrack = sliderContainer.querySelector(".js-slider-track");
    const dotsContainer = sliderContainer.querySelector(".js-slider-dots");
    const prevBtn = sliderContainer.querySelector(".js-slider-btn-prev");
    const nextBtn = sliderContainer.querySelector(".js-slider-btn-next");
    const totalSlides = 5;
    let currentIndex = 0;

    controlButtons();
    window.addEventListener("resize", () => {
      updateSlider();
    });
    updateSlider();
    createdots();

    function goToSlide(index) {
      currentIndex = index;

      window.addEventListener("resize", () => {
        updateSlider();
      });
      updateSlider();
    }

    function updateSlider() {
      if (window.innerWidth >= 768) {
        sliderTrack.style.transform = `none`;
      } else {
        const offset = -currentIndex * (sliderTrack.clientWidth - 20);
        sliderTrack.style.transform = `translateX(${offset}px)`;
      }
    }

    function controlButtons() {
      if (currentIndex == 0) {
        prevBtn.classList.add("disabled");
      }

      prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateActiveBtn();
          updateActiveDot(currentIndex);
          goToSlide(currentIndex);
        }
      });

      nextBtn.addEventListener("click", () => {
        if (currentIndex < totalSlides - 1) {
          currentIndex++;
          updateActiveBtn();
          updateActiveDot(currentIndex);
          goToSlide(currentIndex);
        }
      });
    }

    function createdots() {
      for (let i = 0; i < totalSlides; i++) {
        let dot = document.createElement("div");
        dot.classList.add("slider-dot");

        if (i == currentIndex) {
          dot.classList.add("active");
        }

        dot.addEventListener("click", () => {
          updateActiveDot(i);
          goToSlide(i);
          updateActiveBtn();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateActiveDot(index) {
      let dotsList = dotsContainer.children;

      for (let elem of dotsList) {
        elem.classList.remove("active");
      }

      dotsList[index].classList.add("active");
    }

    function updateActiveBtn() {
      if (currentIndex == 0) {
        prevBtn.classList.add("disabled");
        nextBtn.classList.remove("disabled");
      }

      if (currentIndex > 0 && currentIndex < totalSlides - 1) {
        prevBtn.classList.remove("disabled");
        nextBtn.classList.remove("disabled");
      }

      if (currentIndex == totalSlides - 1) {
        nextBtn.classList.add("disabled");
        prevBtn.classList.remove("disabled");
      }
    }
  }

  function sliderParticipants() {
    const sliderContainer = d.querySelector(".js-participants-slider");

    if (!sliderContainer) {
      return;
    }

    const sliderTrack = sliderContainer.querySelector(".js-slider-track");
    const slideList = sliderTrack.children;
    const totalSlides = slideList.length;
    let currentIndex = 0;
    let intervalId;

    startAutoSlide();
    controlButtons();

    window.addEventListener("resize", () => {
      updateSlider();
    });

    updateSlider();

    sliderTrack.innerHTML += sliderTrack.innerHTML;

    const totalSlidesContainer = sliderContainer.querySelector(
      ".js-slider-total-slides"
    );
    totalSlidesContainer.textContent = totalSlides;

    updateNumberActiveSlide();

    function updateSlider() {
      let visibleCards;

      if (window.innerWidth >= 1024) {
        visibleCards = 3;
      } else if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        visibleCards = 2;
      } else if (window.innerWidth < 768) {
        visibleCards = 1;
      }

      const offset = -currentIndex * (100 / visibleCards);
      sliderTrack.style.transform = `translateX(${offset}%)`;
    }

    function startAutoSlide() {
      intervalId = setInterval(() => {
        const nextIndex = (currentIndex + 1) % totalSlides;
        goToSlide(nextIndex);
      }, 4000);
    }

    function goToSlide(index) {
      clearInterval(intervalId);
      currentIndex = index;

      window.addEventListener("resize", () => {
        updateSlider();
      });

      updateSlider();
      updateNumberActiveSlide();
      startAutoSlide();
    }

    function controlButtons() {
      const prevBtn = sliderContainer.querySelector(".js-slider-btn-prev");
      const nextBtn = sliderContainer.querySelector(".js-slider-btn-next");

      prevBtn.addEventListener("click", () => {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
      });

      nextBtn.addEventListener("click", () => {
        goToSlide((currentIndex + 1) % totalSlides);
      });
    }

    function updateNumberActiveSlide() {
      const numberActiveSlide = sliderContainer.querySelector(
        ".js-slider-number-active-slide"
      );
      numberActiveSlide.textContent = currentIndex + 1;
    }

    sliderTrack.addEventListener("mouseenter", () => {
      clearInterval(intervalId);
    });

    sliderTrack.addEventListener("mouseleave", startAutoSlide);
  }

  d.addEventListener("DOMContentLoaded", () => {
    sliderParticipants();

    sliderTransformation();
  });
})(document);

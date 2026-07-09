/* ============================================
   Counter Animation (누적 수강생 / 운영 기간 / 만족도)
============================================ */

// const counters = document.querySelectorAll(".counter-num");

// counters.forEach((counter) => {
//   counter.textContent = "0";

//   const targetNum = +counter.getAttribute("data-target");

//   const updateCounter = () => {
//     const count = +counter.textContent;

//     const increment = targetNum / 100;
//     const nextCount = Math.ceil(count + increment);

//     counter.textContent = nextCount > targetNum ? targetNum : nextCount;

//     if (count < targetNum) {
//       requestAnimationFrame(updateCounter);
//     }
//   };

//   updateCounter();
// });





// 숫자 가져오기
const counters = document.querySelectorAll(".counter-num");

// 카운터 영역
const counterSection = document.querySelector(".award-bottom");

// 숫자 카운트 함수
function startCounter() {
  counters.forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = 2000; // 2초
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const current = Math.floor(progress * target);
      counter.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(update);
  });
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter();
        observer.unobserve(entry.target);
      }
    });
  },
  {
    root: null,
    rootMargin: "0px 0px -12% 0px",
    threshold: 0
  }
);

observer.observe(counterSection);

// 감시 시작
observer.observe(counterSection);

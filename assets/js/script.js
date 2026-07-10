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

/* ==========================================
   Compare Slider
========================================== */

const compareCards = document.querySelectorAll(".compare-card");

compareCards.forEach((card) => {

  const before = card.querySelector(".compare-before");
  const after = card.querySelector(".compare-after");

  const beforeContent = card.querySelector(".compare-content-before");
  const afterContent = card.querySelector(".compare-content-after");

  const divider = card.querySelector(".compare-divider");

  const GAP = 34;
  const SIDE = 24;
  const LIMIT = 25;

  let dragging = false;
  let position = card.offsetWidth * 0.55;

  update(position);

  /* =====================
      Drag Start
  ===================== */

  divider.addEventListener("pointerdown", (e) => {

    dragging = true;

    divider.setPointerCapture(e.pointerId);

  });

  /* =====================
      Drag End
  ===================== */

  window.addEventListener("pointerup", () => {

    dragging = false;

  });

  window.addEventListener("pointercancel", () => {

    dragging = false;

  });

  /* =====================
      Drag Move
  ===================== */

  window.addEventListener("pointermove", (e) => {

    if (!dragging) return;

    const rect = card.getBoundingClientRect();

    position = e.clientX - rect.left;

    position = Math.max(
      LIMIT,
      Math.min(position, rect.width - LIMIT)
    );

    update(position);

  });

  /* =====================
      Click Move
  ===================== */

  card.addEventListener("click", (e) => {

    if (dragging) return;

    const rect = card.getBoundingClientRect();

    position = e.clientX - rect.left;

    position = Math.max(
      LIMIT,
      Math.min(position, rect.width - LIMIT)
    );

    update(position);

  });

  /* =====================
      Resize
  ===================== */

  window.addEventListener("resize", () => {

    position = card.offsetWidth * 0.55;

    update(position);

  });

  /* =====================
      Update
  ===================== */




  function update(pos) {

    const cardWidth = card.offsetWidth;

    /* ------------------
        Overlay
    ------------------ */

    before.style.width = `${pos}px`;

    after.style.width = `${cardWidth - pos}px`;

    /* ------------------
        Divider
    ------------------ */

    divider.style.left = `${pos}px`;

    /* ------------------
        Before Text
    ------------------ */

    const beforeWidth = Math.max(
      pos - SIDE - 8,
      30
    );

    beforeContent.style.left = `${SIDE}px`;
    beforeContent.style.width = `${beforeWidth}px`;

    /* ------------------
        After Text
    ------------------ */

    const afterLeft = pos + GAP;

    const afterWidth = Math.max(
      cardWidth - afterLeft - SIDE,
      120
    );

    afterContent.style.left = `${afterLeft}px`;
    afterContent.style.width = `${afterWidth}px`;

    const opacity = Math.max(0, Math.min(1, (pos - 70) / 60));

    beforeContent.style.opacity = opacity;

  }

});
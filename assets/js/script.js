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




// ==================

/* ==========================================
    Process
========================================== */

const processCards = document.querySelectorAll(".process-card");

const processImage = document.querySelector("#processImage");

const title1 = document.querySelector("#title1");
const title2 = document.querySelector("#title2");
const title3 = document.querySelector("#title3");

const desc1 = document.querySelector("#desc1");
const desc2 = document.querySelector("#desc2");
const desc3 = document.querySelector("#desc3");


const processData = [

{
    image:"./assets/images/책_성장과정.png",

    titles:[
        "같이 읽기",
        "연결하기",
        "나누기"
    ],

    desc:[
        "친구들과 함께 책을 읽으며 다양한 생각을 나누고 독서의 즐거움을 경험합니다.",

        "책과 나, 책과 사회를 연결하며 사고력을 확장합니다.",

        "서로의 생각을 표현하고 다양한 관점을 이해하며 논리적으로 성장합니다."
    ]

},

{

    image:"./assets/images/토론_성장과정.png",

    titles:[
        "질문하기",
        "토론하기",
        "생각 넓히기"
    ],

    desc:[
        "책을 읽으며 스스로 질문을 만들고 호기심을 키웁니다.",

        "친구들과 의견을 나누며 비판적 사고력을 기릅니다.",

        "다양한 관점을 이해하며 표현력을 성장시킵니다."
    ]

},

{

    image:"./assets/images/만연필_성장과정.png",

    titles:[
        "생각 정리",
        "글쓰기",
        "성장하기"
    ],

    desc:[
        "읽은 내용을 스스로 정리합니다.",

        "자신만의 문장으로 논리적인 글을 작성합니다.",

        "독서와 글쓰기를 통해 입시까지 이어집니다."
    ]

}

];

/* ==========================================
    Process Click Event
========================================== */

processCards.forEach((card, index) => {

    card.addEventListener("click", () => {

        /* Active */

        processCards.forEach((item) => {

            item.classList.remove("active");

        });

        card.classList.add("active");

        /* Data */

        const current = processData[index];

        /* Image */

        processImage.src = current.image;

        /* Title */

        title1.textContent = current.titles[0];
        title2.textContent = current.titles[1];
        title3.textContent = current.titles[2];

        /* Description */

        desc1.textContent = current.desc[0];
        desc2.textContent = current.desc[1];
        desc3.textContent = current.desc[2];

        /* Animation */

        processImage.animate(
            [
                {
                    opacity:0,
                    transform:"translateY(20px)"
                },

                {
                    opacity:1,
                    transform:"translateY(0)"
                }
            ],
            {
                duration:350,
                easing:"ease"
            }
        );

    });

});

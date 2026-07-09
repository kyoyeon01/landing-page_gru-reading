/* ============================================
   Counter Animation (누적 수강생 / 운영 기간 / 만족도)
============================================ */

const counters = document.querySelectorAll(".counter-item strong");

function animateCounter(el) {
    const target = Number(el.dataset.target);
    const type = el.dataset.type || "";
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);

        if (type === "year") {
            el.textContent = `${value}년`;
        } else if (type === "percent") {
            el.textContent = `${value}%+`;
        } else {
            el.textContent = `${value}+`;
        }

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            if (type === "year") {
                el.textContent = `${target}년`;
            } else if (type === "percent") {
                el.textContent = `${target}%+`;
            } else {
                el.textContent = `${target}+`;
            }
        }
    }

    requestAnimationFrame(tick);
}

if (counters.length) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });
}
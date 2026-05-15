const counters = document.querySelectorAll("[data-count-to]");

const formatCount = (value, max, format) => {
  if (format === "percent") {
    return `${Math.round(value)}%`;
  }

  if (format === "compact" && max >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }

  if (format === "compact" && max >= 1000) {
    return `${Math.round(value / 1000)}K`;
  }

  return `${Math.round(value)}`;
};

const animateCounter = (element) => {
  const max = Number(element.dataset.countTo || 0);
  const format = element.dataset.format || "number";
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = formatCount(max * eased, max, format);

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || entry.target.dataset.animated) {
          return;
        }

        entry.target.dataset.animated = "true";
        animateCounter(entry.target);
      });
    },
    { threshold: 0.45 }
  );

  counters.forEach((counter) => observer.observe(counter));
} else {
  counters.forEach((counter) => {
    counter.textContent = formatCount(
      Number(counter.dataset.countTo || 0),
      Number(counter.dataset.countTo || 0),
      counter.dataset.format || "number"
    );
  });
}

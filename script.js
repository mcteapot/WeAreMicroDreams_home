const counters = document.querySelectorAll("[data-count-to]");
const featuredSeriesRail = document.querySelector("[data-featured-series]");

const parseCsv = (text) => {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(field.trim());
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") {
        index += 1;
      }

      row.push(field.trim());
      if (row.some(Boolean)) {
        rows.push(row);
      }

      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  row.push(field.trim());
  if (row.some(Boolean)) {
    rows.push(row);
  }

  const [headers = [], ...dataRows] = rows;

  return dataRows.map((dataRow) =>
    headers.reduce((item, header, index) => {
      item[header.trim()] = dataRow[index] || "";
      return item;
    }, {})
  );
};

const createFeaturedCard = ({ image, description, title }) => {
  const card = document.createElement("article");
  card.className = "poster-card";

  const poster = document.createElement("img");
  poster.src = image;
  poster.alt = `${title} series poster`;

  const meta = document.createElement("div");
  meta.className = "poster-meta";

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;

  const titleElement = document.createElement("h3");
  titleElement.textContent = title;

  meta.append(descriptionElement, titleElement);
  card.append(poster, meta);

  return card;
};

const renderFeaturedSeries = async () => {
  if (!featuredSeriesRail) {
    return;
  }

  const csvUrl = featuredSeriesRail.dataset.featuredSeries;

  try {
    const response = await fetch(`${csvUrl}?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Unable to load ${csvUrl}`);
    }

    const series = parseCsv(await response.text())
      .filter(({ image, description, title }) => image && description && title)
      .slice(0, 4);

    if (series.length === 0) {
      return;
    }

    featuredSeriesRail.replaceChildren(...series.map(createFeaturedCard));
  } catch (error) {
    console.warn("Featured series CSV could not be loaded.", error);
  }
};

renderFeaturedSeries();

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

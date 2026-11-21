// Атлас флоры Нижегородской области — логика интерфейса.
// Данные лежат в data/plants.js (глобальная переменная PLANTS).

(function () {
  "use strict";

  var MONTHS = [
    "", "январь", "февраль", "март", "апрель", "май", "июнь",
    "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"
  ];

  var CATEGORIES = {
    forest: { label: "Лес", icon: "🌲" },
    meadow: { label: "Луг", icon: "🌼" },
    water: { label: "Болото и водоёмы", icon: "💧" },
    urban: { label: "Около жилья", icon: "🌱" }
  };

  var FEATURE_CLASS = {
    "Лекарственное": "med",
    "Ядовитое": "danger",
    "Редкое": "rare",
    "Съедобное": "food",
    "Медонос": "honey",
    "Декоративное": "deco",
    "Пряное": "spice"
  };

  var state = {
    query: "",
    category: "all",
    month: "",
    rareOnly: false
  };

  var source =
    typeof PLANTS !== "undefined"
      ? PLANTS
      : Array.isArray(window.PLANTS) ? window.PLANTS : [];
  var plants = Array.isArray(source) ? source.slice() : [];
  plants.sort(function (a, b) {
    return a.name.localeCompare(b.name, "ru");
  });

  var els = {
    search: document.getElementById("search"),
    month: document.getElementById("month"),
    rare: document.getElementById("rare"),
    chips: document.getElementById("chips"),
    grid: document.getElementById("grid"),
    result: document.getElementById("result"),
    empty: document.getElementById("empty"),
    stats: document.getElementById("stats"),
    modal: document.getElementById("modal"),
    modalContent: document.getElementById("modal-content")
  };

  var lastFocused = null;

  function esc(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalize(value) {
    return String(value).toLowerCase().replace(/ё/g, "е").trim();
  }

  function formatMonths(months) {
    if (!months || !months.length) return "—";
    var sorted = months.slice().sort(function (a, b) { return a - b; });
    var runs = [];
    var start = sorted[0];
    var prev = sorted[0];

    for (var i = 1; i < sorted.length; i += 1) {
      if (sorted[i] === prev + 1) {
        prev = sorted[i];
      } else {
        runs.push([start, prev]);
        start = sorted[i];
        prev = sorted[i];
      }
    }
    runs.push([start, prev]);

    return runs
      .map(function (run) {
        if (run[0] === run[1]) return MONTHS[run[0]];
        return MONTHS[run[0]] + "–" + MONTHS[run[1]];
      })
      .join(", ");
  }

  function badges(features) {
    return features
      .map(function (feature) {
        var cls = FEATURE_CLASS[feature] || "neutral";
        return '<span class="badge badge--' + cls + '">' + esc(feature) + "</span>";
      })
      .join("");
  }

  function creditMarkup(plant) {
    var credit =
      typeof PHOTO_CREDITS !== "undefined" && PHOTO_CREDITS[plant.id]
        ? PHOTO_CREDITS[plant.id]
        : null;

    if (!credit) {
      return plant.photo
        ? '<p class="detail__credit">Фото из архива проекта</p>'
        : "";
    }

    var author = credit.author ? esc(credit.author) : "автор не указан";
    var license = credit.licenseUrl
      ? '<a href="' + esc(credit.licenseUrl) + '" target="_blank" rel="noopener">' +
        esc(credit.license) + "</a>"
      : esc(credit.license);
    var source = credit.sourceUrl
      ? ' · <a href="' + esc(credit.sourceUrl) + '" target="_blank" rel="noopener">' +
        "Wikimedia Commons</a>"
      : "";

    return (
      '<p class="detail__credit">' +
        (credit.illustration ? "Ботаническая иллюстрация: " : "Фото: ") +
        author + ", " + license + source +
      "</p>"
    );
  }

  function isIllustration(plant) {
    return !!(
      typeof PHOTO_CREDITS !== "undefined" &&
      PHOTO_CREDITS[plant.id] &&
      PHOTO_CREDITS[plant.id].illustration
    );
  }

  function media(plant, extraClass) {
    var category = CATEGORIES[plant.category] || CATEGORIES.forest;
    if (plant.photo) {
      var illustration = isIllustration(plant) ? " media--illustration" : "";
      return (
        '<div class="media' + illustration + " " + extraClass + '">' +
          '<img src="' + esc(plant.photo) + '" alt="' + esc(plant.name) + '" loading="lazy">' +
        "</div>"
      );
    }
    return (
      '<div class="media media--placeholder media--' + esc(plant.category) + " " + extraClass + '">' +
        '<span class="media__icon" aria-hidden="true">' + category.icon + "</span>" +
        '<span class="media__latin">' + esc(plant.latin) + "</span>" +
      "</div>"
    );
  }

  function matches(plant) {
    if (state.category !== "all" && plant.category !== state.category) return false;
    if (state.rareOnly && !plant.red) return false;
    if (state.month && plant.months.indexOf(Number(state.month)) === -1) return false;

    var query = normalize(state.query);
    if (!query) return true;

    var haystack = normalize(
      [plant.name, plant.latin, plant.family, plant.habitat].join(" ")
    );
    return haystack.indexOf(query) !== -1;
  }

  function renderChips() {
    var total = plants.length;
    var items = [
      { key: "all", label: "Все", icon: "✿", count: total }
    ];

    Object.keys(CATEGORIES).forEach(function (key) {
      items.push({
        key: key,
        label: CATEGORIES[key].label,
        icon: CATEGORIES[key].icon,
        count: plants.filter(function (plant) { return plant.category === key; }).length
      });
    });

    els.chips.innerHTML = items
      .map(function (item) {
        var active = state.category === item.key;
        return (
          '<button type="button" class="chip' + (active ? " is-active" : "") + '"' +
            ' data-cat="' + esc(item.key) + '" aria-pressed="' + active + '">' +
            '<span aria-hidden="true">' + item.icon + "</span> " +
            esc(item.label) +
            ' <span class="chip__count">' + item.count + "</span>" +
          "</button>"
        );
      })
      .join("");
  }

  function renderStats() {
    var redCount = plants.filter(function (plant) { return plant.red; }).length;
    els.stats.textContent =
      plants.length + " видов · 4 местообитания · " + redCount + " редких вида";
  }

  function cardMarkup(plant) {
    var category = CATEGORIES[plant.category] || CATEGORIES.forest;
    return (
      '<article class="card" role="button" tabindex="0" data-id="' + esc(plant.id) + '"' +
        ' aria-label="' + esc(plant.name) + ', подробнее">' +
        media(plant, "card__media") +
        '<div class="card__body">' +
          '<p class="card__cat">' + category.icon + " " + esc(category.label) + "</p>" +
          '<h2 class="card__title">' + esc(plant.name) + "</h2>" +
          '<p class="card__latin">' + esc(plant.latin) + "</p>" +
          '<p class="card__meta">Цветёт: ' + esc(formatMonths(plant.months)) + "</p>" +
          '<div class="badges">' + badges(plant.features) + "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function render() {
    var visible = plants.filter(matches);

    els.grid.innerHTML = visible.map(cardMarkup).join("");
    els.empty.hidden = visible.length !== 0;
    els.result.textContent =
      "Найдено: " + visible.length + " из " + plants.length;

    renderChips();
  }

  function openModal(plant) {
    var category = CATEGORIES[plant.category] || CATEGORIES.forest;

    els.modalContent.innerHTML =
      '<div class="detail">' +
        media(plant, "detail__media") +
        '<div class="detail__body">' +
          '<p class="detail__family">' + category.icon + " " + esc(category.label) +
            " · " + esc(plant.family) + "</p>" +
          '<h2 class="detail__title" id="modal-title">' + esc(plant.name) + "</h2>" +
          '<p class="detail__latin">' + esc(plant.latin) + "</p>" +
          '<div class="badges">' + badges(plant.features) + "</div>" +
          '<p class="detail__desc">' + esc(plant.description) + "</p>" +
          '<dl class="facts">' +
            "<div><dt>Местообитание</dt><dd>" + esc(plant.habitat) + "</dd></div>" +
            "<div><dt>Высота</dt><dd>" + esc(plant.height) + "</dd></div>" +
            "<div><dt>Цветение</dt><dd>" + esc(formatMonths(plant.months)) + "</dd></div>" +
          "</dl>" +
          (plant.red
            ? '<p class="detail__note">Включено в Красную книгу Нижегородской области: ' +
              "сбор и выкапывание запрещены.</p>"
            : "") +
          creditMarkup(plant) +
        "</div>" +
      "</div>";

    lastFocused = document.activeElement;
    els.modal.hidden = false;
    document.body.classList.add("is-locked");
    var closeBtn = els.modal.querySelector(".modal__close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    els.modal.hidden = true;
    document.body.classList.remove("is-locked");
    els.modalContent.innerHTML = "";
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
    lastFocused = null;
  }

  els.search.addEventListener("input", function (event) {
    state.query = event.target.value;
    render();
  });

  els.month.addEventListener("change", function (event) {
    state.month = event.target.value;
    render();
  });

  els.rare.addEventListener("change", function (event) {
    state.rareOnly = event.target.checked;
    render();
  });

  els.chips.addEventListener("click", function (event) {
    var chip = event.target.closest(".chip");
    if (!chip) return;
    state.category = chip.getAttribute("data-cat");
    render();
  });

  els.grid.addEventListener("click", function (event) {
    var card = event.target.closest(".card");
    if (!card) return;
    var plant = plants.find(function (item) { return item.id === card.getAttribute("data-id"); });
    if (plant) openModal(plant);
  });

  els.grid.addEventListener("keydown", function (event) {
    if (event.key !== "Enter" && event.key !== " ") return;
    var card = event.target.closest(".card");
    if (!card) return;
    event.preventDefault();
    var plant = plants.find(function (item) { return item.id === card.getAttribute("data-id"); });
    if (plant) openModal(plant);
  });

  els.modal.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-close")) closeModal();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !els.modal.hidden) closeModal();
  });

  renderStats();
  render();
})();

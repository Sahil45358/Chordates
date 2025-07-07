const classifications = {
  root: [
    { title: "Pisces", description: "Aquatic vertebrates with gills and fins.", next: "pisces" },
    { title: "Tetrapoda", description: "Four-limbed vertebrates like amphibians, reptiles, birds, mammals.", next: "tetrapoda" }
  ],
  pisces: [
    { title: "Cartilaginous Fish", description: "Skeletons made of cartilage (e.g., sharks, rays)." },
    { title: "Bony Fish", description: "Skeletons made of bone (e.g., tuna, salmon)." }
  ],
  tetrapoda: [
    { title: "Amphibians", description: "Cold-blooded, both aquatic and terrestrial.", next: "amphibians" },
    { title: "Reptiles", description: "Cold-blooded, dry scales.", next: "reptiles" },
    { title: "Aves", description: "Warm-blooded, feathers, lay eggs.", next: "aves" },
    { title: "Mammals", description: "Warm-blooded, hair, milk glands.", next: "mammals" }
  ],
  amphibians: [
    { title: "General Traits", description: "Moist skin, metamorphosis, breathe through skin/lungs." }
  ],
  reptiles: [
    { title: "General Traits", description: "Scaly skin, internal fertilization, lay shelled eggs." }
  ],
  aves: [
    { title: "General Traits", description: "Feathers, hollow bones, high metabolic rate." }
  ],
  mammals: [
    { title: "General Traits", description: "Hair, mammary glands, three middle ear bones." }
  ]
};

let historyStack = ['root'];

function updateBreadcrumb() {
  const breadcrumb = document.getElementById("breadcrumb");
  const path = historyStack.map((level, i) => {
    const label = level === 'root' ? 'Home' :
      classifications[historyStack[i - 1]]?.find(item => item.next === level)?.title || level;
    return i < historyStack.length - 1
      ? `<a href="#" data-index="${i}">${label}</a> &gt; `
      : `<span>${label}</span>`;
  }).join("");
  breadcrumb.innerHTML = path;
  breadcrumb.querySelectorAll("a").forEach(el =>
    el.addEventListener("click", e => {
      e.preventDefault();
      const idx = parseInt(e.target.dataset.index);
      historyStack = historyStack.slice(0, idx + 1);
      renderCards(historyStack[historyStack.length - 1]);
    })
  );
}

function renderCards(level) {
  const container = document.getElementById("card-container");
  container.style.opacity = 0;
  setTimeout(() => {
    container.innerHTML = "";

    // Add back button if not root
    if (historyStack.length > 1) {
      const backBtn = document.createElement("div");
      backBtn.className = "card";
      backBtn.style.background = "#333";
      backBtn.innerHTML = `<div class="title">← Back</div>`;
      backBtn.onclick = () => {
        historyStack.pop();
        renderCards(historyStack[historyStack.length - 1]);
      };
      container.appendChild(backBtn);
    }

    classifications[level]?.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <div class="title">${item.title}</div>
        <div class="desc">${item.description}</div>`;
      if (item.next) {
        card.onclick = () => {
          historyStack.push(item.next);
          renderCards(item.next);
        };
      }
      container.appendChild(card);
    });

    updateBreadcrumb();
    container.style.animation = "fadeIn .5s ease forwards";
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards("root");
});

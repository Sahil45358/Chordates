const classifications = {
  root: [
    {
      title: "Pisces",
      description: "Aquatic vertebrates with gills and fins.",
      next: "pisces"
    },
    {
      title: "Tetrapoda",
      description: "Four-limbed vertebrates: amphibians, reptiles, birds, mammals.",
      next: "tetrapoda"
    }
  ],
  pisces: [
    {
      title: "Cartilaginous Fish",
      description: "Fish with skeletons made of cartilage (e.g., sharks)."
    },
    {
      title: "Bony Fish",
      description: "Fish with bony skeletons (e.g., tuna, goldfish)."
    }
  ],
  tetrapoda: [
    {
      title: "Amphibians",
      description: "Cold-blooded, live in water and land (e.g., frogs)."
    },
    {
      title: "Reptiles",
      description: "Cold-blooded, dry scales (e.g., snakes, lizards)."
    },
    {
      title: "Aves",
      description: "Warm-blooded, feathers, lay eggs (e.g., birds)."
    },
    {
      title: "Mammals",
      description: "Warm-blooded, hair, feed milk (e.g., humans)."
    }
  ]
};

let currentLevel = "root";

function renderCards(level) {
  const container = document.getElementById("card-container");
  container.innerHTML = "";
  currentLevel = level;

  classifications[level].forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => {
      if (item.next) renderCards(item.next);
    };

    card.innerHTML = `
      <div class="card-title">${item.title}</div>
      <div class="card-description">${item.description}</div>
    `;

    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards("root");
});

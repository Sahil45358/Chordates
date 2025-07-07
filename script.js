const classifications = {
  root: [ /* same as before */ ],
  pisces: [ /* same as before */ ],
  tetrapoda: [ /* same as before */ ]
};

let historyStack = ['root'];

const container = document.getElementById('card-container');
const breadcrumb = document.getElementById('breadcrumb');

function updateBreadcrumb() {
  const parts = historyStack.map(level => {
    if (level === 'root') return 'Home';
    const card = classifications[historyStack[historyStack.indexOf(level) - 1] || 'root']
        .find(item => item.next === level);
    return card ? card.title : level;
  });
  breadcrumb.innerHTML = parts
    .map((p, i) => i < parts.length - 1
      ? `<a href="#" data-idx="${i}">${p}</a> &gt; `
      : `<span>${p}</span>`
    ).join('');
  breadcrumb.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const idx = +e.target.dataset.idx;
      historyStack = historyStack.slice(0, idx + 1);
      renderCards(historyStack[historyStack.length - 1]);
    });
  });
}

function renderCards(level) {
  container.style.opacity = 0;
  setTimeout(() => {
    container.innerHTML = '';
    classifications[level].forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="title">${item.title}</div>
        <div class="desc">${item.description}</div>`;
      card.onclick = () => {
        if (item.next) {
          historyStack.push(item.next);
          renderCards(item.next);
        }
      };
      container.appendChild(card);
    });
    updateBreadcrumb();
    container.style.animation = 'fadeIn .5s ease forwards';
  }, 100);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCards('root');
});

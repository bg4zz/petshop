const container = document.getElementById('carousel');
const track = document.getElementById('track');

// Получаем оригинальные карточки
const originalCards = Array.from(track.children);

// Дублируем карточки трижды (итого 4 сета подряд)
for (let i = 0; i < 3; i++) {
    originalCards.forEach(card => track.appendChild(card.cloneNode(true)));
}

const allCards = Array.from(track.children);
const setLength = originalCards.length;
const oneCard = allCards[0];
const cardStyle = getComputedStyle(oneCard);
const cardWidth = oneCard.offsetWidth + parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
const cardSetWidth = cardWidth * setLength;

// Ставим скролл на 2-й набор (из 4-х)
container.scrollLeft = cardSetWidth;

// Drag-to-scroll
let isDown = false;
let startX = 0;
let scrollLeft = 0;

container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX;
    scrollLeft = container.scrollLeft;
    container.style.cursor = 'grabbing';
});

container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
});

container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    container.scrollLeft = scrollLeft - walk;
});

// Проверка перепрыгивания
function checkInfiniteScroll() {
    if (container.scrollLeft <= cardSetWidth * 0.5) {
        container.scrollLeft += cardSetWidth;
    } else if (container.scrollLeft >= cardSetWidth * 2.5) {
        container.scrollLeft -= cardSetWidth;
    }
    requestAnimationFrame(checkInfiniteScroll);
}

requestAnimationFrame(checkInfiniteScroll);
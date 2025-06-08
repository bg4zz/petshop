const track = document.getElementById('track');

// Получаем оригинальные карточки
const originalCards = Array.from(track.children);

// Дублируем карточки трижды (итого 4 сета подряд)
for (let i = 0; i < 10; i++) {
    originalCards.forEach(card => track.appendChild(card.cloneNode(true)));
}

const allCards = Array.from(track.children);
const setLength = originalCards.length;
const oneCard = allCards[0];
const cardStyle = getComputedStyle(oneCard);
const cardWidth = oneCard.offsetWidth + parseFloat(cardStyle.marginLeft) + parseFloat(cardStyle.marginRight);
const cardSetWidth = cardWidth * setLength;

// Ставим скролл на 2-й набор (из 4-х)
track.scrollLeft = cardSetWidth;

// Drag-to-scroll
let isDown = false;
let startX = 0;
let scrollLeft = 0;

track.addEventListener('mousedown', (e) => {
    if (e.target.closest('button')) return;
    isDown = true;
    startX = e.pageX;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
});

track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX;
    const walk = (x - startX) * 1.5;
    track.scrollLeft = scrollLeft - walk;
});

// Проверка перепрыгивания
function checkInfiniteScroll() {
    if (track.scrollLeft <= cardSetWidth * 0.5) {
        track.scrollLeft += cardSetWidth;
    } else if (track.scrollLeft >= cardSetWidth * 2.5) {
        track.scrollLeft -= cardSetWidth;
    }
    requestAnimationFrame(checkInfiniteScroll);
}

requestAnimationFrame(checkInfiniteScroll);
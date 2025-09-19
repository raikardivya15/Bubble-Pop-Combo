const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

let score = 0;
let combo = 0;
let bubbles = [];
let gameInterval;

const colors = ['#FF3F8E', '#04C2C9', '#2E55C1', '#FFB400', '#7DFF00'];

function createBubble() {
  const bubble = document.createElement('div');
  bubble.classList.add('bubble');

  const size = Math.random() * 50 + 30; // 30px - 80px
  bubble.style.width = size + 'px';
  bubble.style.height = size + 'px';

  const color = colors[Math.floor(Math.random() * colors.length)];
  bubble.style.backgroundColor = color;
  bubble.dataset.color = color;

  const x = Math.random() * (gameArea.clientWidth - size);
  bubble.style.left = x + 'px';
  bubble.style.top = gameArea.clientHeight + 'px';

  gameArea.appendChild(bubble);
  bubbles.push(bubble);

  bubble.addEventListener('click', () => {
    if (bubbles.length > 1 && bubble.dataset.color === bubbles[bubbles.length-2]?.dataset.color) {
      combo++;
      score += 10 * combo;
    } else {
      combo = 1;
      score += 10;
    }
    scoreDisplay.textContent = `Score: ${score}`;
    bubble.remove();
    bubbles = bubbles.filter(b => b !== bubble);
  });

  moveBubble(bubble, size);
}

function moveBubble(bubble, size) {
  let top = parseFloat(bubble.style.top);
  const speed = Math.random() * 2 + 1; // 1-3 px per frame

  function animate() {
    top -= speed;
    bubble.style.top = top + 'px';

    if (top + size < 0) {
      // Missed bubble
      combo = 0;
      score -= 5;
      scoreDisplay.textContent = `Score: ${score}`;
      bubble.remove();
      bubbles = bubbles.filter(b => b !== bubble);
      return;
    }

    requestAnimationFrame(animate);
  }

  animate();
}

function startGame() {
  score = 0;
  combo = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  gameArea.innerHTML = '';
  bubbles = [];

  gameInterval = setInterval(createBubble, 800); // new bubble every 0.8s
}

restartBtn.addEventListener('click', () => {
  clearInterval(gameInterval);
  startGame();
});

// Start the game on load
startGame();

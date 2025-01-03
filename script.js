const clickContainer = document.querySelector('.ripple-container');
const totalClicks = document.querySelector('.totalr');
const resetButton = document.getElementById('reset');
const clickps = document.querySelector('.clickps2');

const timerDisplay = document.getElementById('timer');
let clickCount = 0;
let timer = 0;
let timerInterval;
resetButton.addEventListener('click', function () {
    clearInterval(timerInterval);
    timer = 0;
    clickCount = 0;
    totalClicks.innerText = clickCount;
    timerDisplay.textContent = timer;
    clickps.innerText = '0.00'; // Reset CPS on reset
});

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerDisplay.textContent = timer;
        clickps.innerText = calculateClicksPerSecond(clickCount, timer);
    }, 1000);
}

clickContainer.addEventListener('click', function (event) {
    clickCount++;
    totalClicks.innerText = clickCount;
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Get click position relative to container
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Set ripple position and size
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '40px';
    ripple.style.height = '40px';

    // Add ripple to container
    this.appendChild(ripple);

    // Remove ripple after animation
    ripple.addEventListener('animationend', () => {
        ripple.remove();
    });
    if (clickCount === 1) {
        startTimer();
    }
});

function calculateClicksPerSecond(clicks, seconds) {
    if (seconds === 0) return '0.00'; // Avoid division by zero
    return (clicks / seconds).toFixed(2);
}

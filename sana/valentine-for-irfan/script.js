document.addEventListener("DOMContentLoaded", () => {
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const mainCard = document.getElementById("mainCard");
  const successCard = document.getElementById("successCard");

  // Make the NO button move away
  const moveButton = () => {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    // Ensure the button stays within reachable bounds but isn't where it was
    noBtn.style.position = "fixed";
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
    noBtn.style.zIndex = "1000";
  };

  noBtn.addEventListener("mouseover", moveButton);
  noBtn.addEventListener("click", moveButton);

  // YES button click handler
  yesBtn.addEventListener("click", () => {
    mainCard.classList.add("hidden");
    successCard.classList.remove("hidden");

    // Fire confetti
    launchConfetti();
  });

  // Decorative floating hearts
  createFloatingHearts();
});

function launchConfetti() {
  const duration = 15 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    );
  }, 250);
}

function createFloatingHearts() {
  const starContainer = document.querySelector(".stars");
  for (let i = 0; i < 20; i++) {
    const star = document.createElement("div");
    star.className = "star";
    const size = Math.random() * 8 + 4;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    starContainer.appendChild(star);
  }
}

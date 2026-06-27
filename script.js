const typingText = document.getElementById("typingText");
const celebrateBtn = document.getElementById("celebrateBtn");
const giftBtn = document.getElementById("giftBtn");
const giftModal = document.getElementById("giftModal");
const closeModal = document.getElementById("closeModal");
const moreConfettiBtn = document.getElementById("moreConfettiBtn");
const blowBtn = document.getElementById("blowBtn");
const candleMsg = document.getElementById("candleMsg");
const musicBtn = document.getElementById("musicBtn");
const wishInput = document.getElementById("wishInput");
const addWishBtn = document.getElementById("addWishBtn");
const wishWall = document.getElementById("wishWall");

const message =
  "May your day be full of smiles, surprises, cake, gifts, and unforgettable happy moments. You deserve the best birthday ever! 🎂✨";

let index = 0;

function typeMessage() {
  if (index < message.length) {
    typingText.textContent += message.charAt(index);
    index++;
    setTimeout(typeMessage, 45);
  }
}

typeMessage();

function createConfetti(amount = 120) {
  const colors = ["#ffdf6b", "#ff6bcb", "#7c3aed", "#00c2ff", "#ffffff"];

  for (let i = 0; i < amount; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 2 + 2.5 + "s";
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "4px";
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
}

celebrateBtn.addEventListener("click", () => {
  createConfetti(180);
});

giftBtn.addEventListener("click", () => {
  giftModal.classList.add("show");
  createConfetti(80);
});

closeModal.addEventListener("click", () => {
  giftModal.classList.remove("show");
});

giftModal.addEventListener("click", (event) => {
  if (event.target === giftModal) {
    giftModal.classList.remove("show");
  }
});

moreConfettiBtn.addEventListener("click", () => {
  createConfetti(200);
});

blowBtn.addEventListener("click", () => {
  const flames = document.querySelectorAll(".flame");

  flames.forEach((flame) => {
    flame.style.display = "none";
  });

  candleMsg.textContent = "Wish made! May it come true, Bala Bhargavi 💖";
  createConfetti(160);
});

addWishBtn.addEventListener("click", addWish);

wishInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addWish();
  }
});

function addWish() {
  const wish = wishInput.value.trim();

  if (wish === "") {
    alert("Please type a birthday wish first 💌");
    return;
  }

  const note = document.createElement("div");
  note.className = "wish-note";
  note.textContent = "💖 " + wish;

  wishWall.prepend(note);
  wishInput.value = "";
  createConfetti(50);
}

musicBtn.addEventListener("click", playBirthdayTones);

function playBirthdayTones() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const notes = [
    392, 392, 440, 392, 523, 494,
    392, 392, 440, 392, 587, 523,
    392, 392, 784, 659, 523, 494, 440
  ];

  let time = audioContext.currentTime;

  notes.forEach((frequency, i) => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.25, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.28);

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.start(time);
    oscillator.stop(time + 0.3);

    time += i % 6 === 5 ? 0.45 : 0.32;
  });
}
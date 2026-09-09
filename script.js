const btn = document.getElementById("openBtn");
const letter = document.getElementById("letter");
const entryScreen = document.getElementById("entryScreen");
const startBtn = document.getElementById("startBtn");

btn.addEventListener("click", () => {
  letter.classList.add("show");
  btn.textContent = "Minha carta ❤️";
  setTimeout(() => letter.scrollIntoView({ behavior: "smooth" }), 100);
});

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = Math.random() > .25 ? "♥" : "♡";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (10 + Math.random() * 18) + "px";
  heart.style.animationDuration = (5 + Math.random() * 5) + "s";
  document.querySelector(".hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 10000);
}
setInterval(createHeart, 650);

// =========================
// TELA INICIAL + INÍCIO DA MÚSICA
// =========================
startBtn.addEventListener("click", () => {
  entryScreen.classList.add("hidden");
  loadTrack(0, true);
});

// =========================
// PLAYER DE MÚSICA
// =========================
// Para colocar suas músicas, crie uma pasta "musicas" e outra "capas".
// Depois troque os nomes abaixo pelos seus arquivos.
const playlist = [
  {
    title: "Nossa música",
    file: "musicas/musica1.mp3",
    cover: "capas/capa1.jpg"
  },
  {
    title: "Nossa segunda música",
    file: "musicas/musica2.mp3",
    cover: "capas/capa2.jpg"
  }
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const trackName = document.getElementById("trackName");
const trackCover = document.getElementById("trackCover");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

let currentTrack = 0;
audio.volume = 0.75;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function loadTrack(index, autoplay = false) {
  currentTrack = (index + playlist.length) % playlist.length;
  const track = playlist[currentTrack];

  audio.src = track.file;
  trackName.textContent = track.title;
  trackCover.style.backgroundImage = `url("${track.cover}")`;
  trackCover.querySelector("span").style.display = "none";
  progress.value = 0;
  currentTime.textContent = "0:00";
  duration.textContent = "0:00";

  if (autoplay) {
    audio.play().then(updatePlayButton).catch(updatePlayButton);
  }
}

function updatePlayButton() {
  playBtn.textContent = audio.paused ? "▶" : "Ⅱ";
}

playBtn.addEventListener("click", () => {
  if (!audio.src) loadTrack(0);
  if (audio.paused) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
});

prevBtn.addEventListener("click", () => loadTrack(currentTrack - 1, true));
nextBtn.addEventListener("click", () => loadTrack(currentTrack + 1, true));

volume.addEventListener("input", () => {
  audio.volume = Number(volume.value);
});

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
  currentTime.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
  if (audio.duration) audio.currentTime = (Number(progress.value) / 100) * audio.duration;
});

audio.addEventListener("play", updatePlayButton);
audio.addEventListener("pause", updatePlayButton);
audio.addEventListener("ended", () => {
  loadTrack(currentTrack + 1, true);
});

// Navegar pela playlist com teclado.
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && event.target.tagName !== "INPUT") {
    event.preventDefault();
    playBtn.click();
  }
});

loadTrack(0);

(function(){
  "use strict";

  const playlist = [
    { title: "Nossa música", file: "musicas/musica1.mp3", cover: "capas/capa1.jpg" },
    { title: "Nossa segunda música", file: "musicas/musica2.mp3", cover: "capas/capa2.jpg" }
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
  const entryScreen = document.getElementById("entryScreen");
  const startBtn = document.getElementById("startBtn");

  let currentTrack = 0;

  function formatTime(seconds){
    if(!Number.isFinite(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2,"0");
    return min + ":" + sec;
  }

  function updatePlayButton(){
    if(playBtn) playBtn.textContent = audio.paused ? "▶" : "Ⅱ";
  }

  function loadTrack(index, autoplay){
    if(!audio || !playlist.length) return;
    currentTrack = (index + playlist.length) % playlist.length;
    const track = playlist[currentTrack];
    audio.src = track.file;
    if(trackName) trackName.textContent = track.title;
    if(trackCover){
      trackCover.style.backgroundImage = 'url("' + track.cover + '")';
      const fallback = trackCover.querySelector("span");
      if(fallback) fallback.style.display = "none";
    }
    if(progress) progress.value = 0;
    if(currentTime) currentTime.textContent = "0:00";
    if(duration) duration.textContent = "0:00";
    if(autoplay){
      audio.play().catch(function(){ updatePlayButton(); });
    }
    updatePlayButton();
  }

  if(audio){
    audio.volume = 0.75;
    audio.addEventListener("loadedmetadata", function(){ if(duration) duration.textContent = formatTime(audio.duration); });
    audio.addEventListener("timeupdate", function(){
      if(progress && audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
      if(currentTime) currentTime.textContent = formatTime(audio.currentTime);
    });
    audio.addEventListener("play", updatePlayButton);
    audio.addEventListener("pause", updatePlayButton);
    audio.addEventListener("ended", function(){ loadTrack(currentTrack + 1, true); });
  }

  if(playBtn) playBtn.addEventListener("click", function(){
    if(!audio.src) loadTrack(0, false);
    if(audio.paused) audio.play().catch(function(){}); else audio.pause();
  });
  if(prevBtn) prevBtn.addEventListener("click", function(){ loadTrack(currentTrack - 1, true); });
  if(nextBtn) nextBtn.addEventListener("click", function(){ loadTrack(currentTrack + 1, true); });
  if(progress) progress.addEventListener("input", function(){ if(audio.duration) audio.currentTime = Number(progress.value) / 100 * audio.duration; });
  if(volume) volume.addEventListener("input", function(){ audio.volume = Number(volume.value); });

  if(startBtn){
    startBtn.addEventListener("click", function(){
      if(entryScreen) entryScreen.classList.add("hidden");
      loadTrack(0, true);
    });
  }

  function createHeart(){
    const holder = document.querySelector(".hearts");
    if(!holder) return;
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = Math.random() > .25 ? "♥" : "♡";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (10 + Math.random() * 18) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";
    holder.appendChild(heart);
    setTimeout(function(){ heart.remove(); }, 10000);
  }
  setInterval(createHeart, 700);

  loadTrack(0, false);
})();

```javascript
"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     ELEMENTOS
  ========================= */

  const btn = document.getElementById("openBtn");
  const letter = document.getElementById("letter");

  const entryScreen = document.getElementById("entryScreen");
  const startBtn = document.getElementById("startBtn");

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


  /* =========================
     ABRIR CARTA
  ========================= */

  if (btn && letter) {

    btn.addEventListener("click", () => {

      letter.classList.add("show");

      btn.textContent = "Minha carta ❤️";

      setTimeout(() => {

        letter.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }, 150);

    });

  }


  /* =========================
     CORAÇÕES FLUTUANDO
  ========================= */

  function createHeart() {

    const heartsContainer = document.querySelector(".hearts");

    if (!heartsContainer) return;

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.textContent =
      Math.random() > 0.25 ? "♥" : "♡";

    heart.style.left =
      Math.random() * 100 + "vw";

    heart.style.fontSize =
      (10 + Math.random() * 18) + "px";

    heart.style.animationDuration =
      (5 + Math.random() * 5) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {

      if (heart.parentNode) {
        heart.remove();
      }

    }, 11000);

  }

  setInterval(createHeart, 650);


  /* =========================
     PLAYLIST
  ========================= */

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


  let currentTrack = 0;

  if (audio) {
    audio.volume = 0.75;
  }


  /* =========================
     FORMATA TEMPO
  ========================= */

  function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const mins =
      Math.floor(seconds / 60);

    const secs =
      Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${mins}:${secs}`;

  }


  /* =========================
     BOTÃO PLAY
  ========================= */

  function updatePlayButton() {

    if (!playBtn || !audio) return;

    playBtn.textContent =
      audio.paused ? "▶" : "Ⅱ";

  }


  /* =========================
     CARREGAR MÚSICA
  ========================= */

  function loadTrack(index, autoplay = false) {

    if (!audio || playlist.length === 0) {
      return;
    }

    currentTrack =
      (index + playlist.length) %
      playlist.length;

    const track =
      playlist[currentTrack];


    /* Música */

    audio.src = track.file;


    /* Nome */

    if (trackName) {
      trackName.textContent =
        track.title;
    }


    /* Capa */

    if (trackCover) {

      trackCover.style.backgroundImage =
        `url("${track.cover}")`;

      const heart =
        trackCover.querySelector("span");

      if (heart) {
        heart.style.display = "none";
      }

    }


    /* Reset */

    if (progress) {
      progress.value = 0;
    }

    if (currentTime) {
      currentTime.textContent = "0:00";
    }

    if (duration) {
      duration.textContent = "0:00";
    }


    updatePlayButton();


    /* Tocar automaticamente */

    if (autoplay) {

      const playPromise =
        audio.play();

      if (playPromise !== undefined) {

        playPromise
          .then(() => {
            updatePlayButton();
          })
          .catch(() => {

            /*
              Se a música ainda não existir
              ou o navegador bloquear o áudio,
              o site continua funcionando normalmente.
            */

            updatePlayButton();

          });

      }

    }

  }


  /* =========================
     BOTÃO COMEÇAR
  ========================= */

  if (startBtn && entryScreen) {

    startBtn.addEventListener("click", (event) => {

      event.preventDefault();
      event.stopPropagation();


      /* Fecha a tela imediatamente */

      entryScreen.classList.add("hidden");


      /*
        Remove completamente a tela depois
        da animação.
      */

      setTimeout(() => {

        if (entryScreen && entryScreen.parentNode) {
          entryScreen.remove();
        }

      }, 750);


      /*
        Tenta iniciar a música.
        Se não existir o arquivo, NÃO impede
        a abertura do site.
      */

      loadTrack(0, true);

    });

  }


  /* =========================
     PLAY / PAUSE
  ========================= */

  if (playBtn && audio) {

    playBtn.addEventListener("click", () => {

      if (!audio.src) {
        loadTrack(0);
      }

      if (audio.paused) {

        audio.play()
          .then(() => {
            updatePlayButton();
          })
          .catch(() => {
            updatePlayButton();
          });

      } else {

        audio.pause();

      }

    });

  }


  /* =========================
     MÚSICA ANTERIOR
  ========================= */

  if (prevBtn) {

    prevBtn.addEventListener("click", () => {

      loadTrack(
        currentTrack - 1,
        true
      );

    });

  }


  /* =========================
     PRÓXIMA MÚSICA
  ========================= */

  if (nextBtn) {

    nextBtn.addEventListener("click", () => {

      loadTrack(
        currentTrack + 1,
        true
      );

    });

  }


  /* =========================
     VOLUME
  ========================= */

  if (volume && audio) {

    volume.addEventListener("input", () => {

      audio.volume =
        Number(volume.value);

    });

  }


  /* =========================
     METADADOS DA MÚSICA
  ========================= */

  if (audio) {

    audio.addEventListener(
      "loadedmetadata",
      () => {

        if (duration) {

          duration.textContent =
            formatTime(audio.duration);

        }

      }
    );


    /* =========================
       TEMPO DA MÚSICA
    ========================= */

    audio.addEventListener(
      "timeupdate",
      () => {

        if (
          progress &&
          audio.duration &&
          Number.isFinite(audio.duration)
        ) {

          progress.value =
            (audio.currentTime /
              audio.duration) * 100;

        }

        if (currentTime) {

          currentTime.textContent =
            formatTime(audio.currentTime);

        }

      }
    );


    /* =========================
       BARRA DE PROGRESSO
    ========================= */

    if (progress) {

      progress.addEventListener(
        "input",
        () => {

          if (
            audio.duration &&
            Number.isFinite(audio.duration)
          ) {

            audio.currentTime =
              (Number(progress.value) / 100)
              * audio.duration;

          }

        }
      );

    }


    /* =========================
       EVENTOS DO ÁUDIO
    ========================= */

    audio.addEventListener(
      "play",
      updatePlayButton
    );

    audio.addEventListener(
      "pause",
      updatePlayButton
    );


    audio.addEventListener(
      "ended",
      () => {

        loadTrack(
          currentTrack + 1,
          true
        );

      }
    );

  }


  /* =========================
     TECLADO
  ========================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.code === "Space" &&
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
      ) {

        event.preventDefault();

        if (playBtn) {
          playBtn.click();
        }

      }

    }
  );


  /* =========================
     CARREGAR PRIMEIRA MÚSICA
  ========================= */

  loadTrack(0, false);


});
```

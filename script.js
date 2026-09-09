const btn = document.getElementById("openBtn");
const letter = document.getElementById("letter");

btn.addEventListener("click", () => {
  letter.classList.add("show");
  btn.textContent = "Minha carta ❤️";
  setTimeout(() => {
    letter.scrollIntoView({ behavior: "smooth" });
  }, 100);
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

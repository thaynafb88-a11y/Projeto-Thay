// ESTADO

let playerName = "Jogador";
let selectedAvatar = "🐻";
let playerAvatar = "🐻";

let totalStars = 0;

// LOGIN

function selectAvatar(btn, emoji){

  document
    .querySelectorAll(".avatar-btn")
    .forEach(button => {
      button.classList.remove("selected");
    });

  btn.classList.add("selected");

  selectedAvatar = emoji;

  playClick();
}

function doLogin(){

  const input =
    document
      .getElementById("player-name-input")
      .value
      .trim();

  playerName = input || "Jogador";

  playerAvatar = selectedAvatar;

  document.getElementById("home-avatar").textContent =
    playerAvatar;

  document.getElementById("greeting-name").textContent =
    `Olá, ${playerName}! ${playerAvatar}`;

  goTo("screen-home");

  playCorrect();
}

// TROCAR TELAS

function goTo(id){

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });

  document
    .getElementById(id)
    .classList.add("active");

  playClick();
}

// FEEDBACK

function showFeedback(
  emoji,
  text,
  sub = "",
  duration = 1000
){

  document.getElementById("fbEmoji").textContent = emoji;

  document.getElementById("fbText").textContent = text;

  document.getElementById("fbSub").textContent = sub;

  document
    .getElementById("fbOverlay")
    .classList.add("show");

  document
    .getElementById("fbPopup")
    .classList.add("show");

  setTimeout(() => {

    document
      .getElementById("fbOverlay")
      .classList.remove("show");

    document
      .getElementById("fbPopup")
      .classList.remove("show");

  }, duration);
}

// ÁUDIO

let audioCtx = null;

function getAudioCtx(){

  if(!audioCtx){

    audioCtx =
      new (
        window.AudioContext ||
        window.webkitAudioContext
      )();

  }

  return audioCtx;
}

function playTone(
  freq,
  dur,
  type = "sine",
  volume = 0.2
){

  try{

    const ctx = getAudioCtx();

    const osc =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    osc.connect(gain);

    gain.connect(ctx.destination);

    osc.type = type;

    osc.frequency.setValueAtTime(
      freq,
      ctx.currentTime
    );

    gain.gain.setValueAtTime(
      volume,
      ctx.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + dur
    );

    osc.start();

    osc.stop(ctx.currentTime + dur);

  }catch(e){}
}

function playClick(){

  playTone(
    440,
    0.06,
    "triangle",
    0.12
  );
}

function playCorrect(){

  playTone(523,0.1);

  setTimeout(() => {
    playTone(659,0.1);
  },110);

  setTimeout(() => {
    playTone(784,0.18);
  },220);
}
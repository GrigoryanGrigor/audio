window.addEventListener(
  "keydown",
  function (e) {
    // space and arrow keys
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

var colors = [
  "#5fb2f2",
  "#ffe552",
  "#f11712",
  "#739aaf",
  "#00ee76",
  "#fe4a49",
  "#03396c",
  "#651e3e",
  "#251e3e",
  "#0e9aa7",
  "#fe8a71",
  "#f6cd61",
  "#65c3ba",
  "#7bc043",
  "#0392cf",
  "#ff6f69",
  "#ffcc5c",
  "#854442",
  "#3b5998",
  "#008744",
  "#0057e7",
  "#d62d20",
  "#ffa700",
];
var songArr = [
  "The Wall/CD 1/Pink Floyd - In the Flesh.mp3",
  "The Wall/CD 1/Pink Floyd - The Thin Ice.mp3",
  "The Wall/CD 1/Pink Floyd - Another Brick In the Wall, Pt. 1.mp3",
  "The Wall/CD 1/Pink Floyd - The Happiest Days of Our Lives.mp3",
  "The Wall/CD 1/Pink Floyd - Another Brick In the Wall, Pt. 2.mp3",
  "The Wall/CD 1/Pink Floyd - Mother.mp3",
  "The Wall/CD 1/Pink Floyd - Goodbye Blue Sky.mp3",
  "The Wall/CD 1/Pink Floyd - Empty Spaces.mp3",
  "The Wall/CD 1/Pink Floyd - Young Lust.mp3",
  "The Wall/CD 1/Pink Floyd - One of My Turns.mp3",
  "The Wall/CD 1/Pink Floyd - Don't Leave Me Now.mp3",
  "The Wall/CD 1/Pink Floyd - Another Brick In the Wall, Pt. 3.mp3",
  "The Wall/CD 1/Pink Floyd - Goodbye Cruel World.mp3",
  "The Wall/CD 2/Pink Floyd - Hey You.mp3",
  "The Wall/CD 2/Pink Floyd - Is There Anybody Out There.mp3",
  "The Wall/CD 2/Pink Floyd - Nobody Home.mp3",
  "The Wall/CD 2/Pink Floyd - Vera.mp3",
  "The Wall/CD 2/Pink Floyd - Bring the Boys Back Home.mp3",
  "The Wall/CD 2/Pink Floyd - Comfortably Numb.mp3",
  "The Wall/CD 2/Pink Floyd - The Show Must Go On.mp3",
  "The Wall/CD 2/Pink Floyd - In the Flesh.mp3",
  "The Wall/CD 2/Pink Floyd - Run Like Hell.mp3",
  "The Wall/CD 2/Pink Floyd - Waiting for the Worms.mp3",
  "The Wall/CD 2/Pink Floyd - Stop.mp3",
  "The Wall/CD 2/Pink Floyd - The Trial.mp3",
  "The Wall/CD 2/Pink Floyd - Outside the Wall.mp3",
];

var currentSong = 0;
var song = new Audio();
window.onload = function () {
  playSong();
};
function bodyBGC() {
  document.body.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];
}

document.body.style.backgroundColor =
  colors[Math.floor(Math.random() * colors.length)];

function playSong() {
  song.src = songArr[currentSong];
  let songTitle = document.getElementById("songTitle");
  songTitle.textContent = songArr[currentSong].slice(14, -4);
}

function playOrPauseSong() {
  let play = document.getElementById("play");

  if (song.paused) {
    song.play();
    play.src = "img/pause.png";
  } else {
    song.pause();
    play.src = "img/play.png";
  }
}

song.addEventListener("timeupdate", function () {
  convertTime(song.currentTime);
  if (song.ended) {
    next();
  }
});

function convertTime(seconds) {
  let currentTime = document.getElementById("currentTime");
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent = min + ":" + sec;
  totalTime(Math.floor(song.duration));
}

function totalTime(seconds) {
  var min = Math.floor(seconds / 60);
  var sec = Math.floor(seconds % 60);
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  currentTime.textContent += " / " + min + ":" + sec;
}

function next() {
  currentSong++;
  if (currentSong >= songArr.length) {
    currentSong = 0;
  }
  playSong();
  song.play();
  play.src = "img/pause.png";
  bodyBGC();
}

function prev() {
  currentSong--;
  if (currentSong < 0) {
    currentSong = songArr.length - 1;
  }
  playSong();
  song.play();
  play.src = "img/pause.png";
  bodyBGC();
}

function muted() {
  var mute = document.getElementById("mute");
  if (song.muted) {
    song.muted = false;
    mute.src = "img/unmute.png";
  } else {
    song.muted = true;
    mute.src = "img/mute.png";
  }
}

function increase() {
  if (song.volume < 1) {
    song.volume += 0.2;
  }
}

function decrease() {
  if (song.volume > 0.2) {
    song.volume -= 0.2;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.keyCode === 39 || event.keyCode === 76) {
    next();
  } else if (event.keyCode === 37 || event.keyCode === 74) {
    prev();
  } else if (event.keyCode === 38) {
    increase();
  } else if (event.keyCode === 40) {
    decrease();
  } else if (
    event.keyCode === 32 ||
    event.keyCode === 13 ||
    event.keyCode === 75
  ) {
    playOrPauseSong();
  } else if (event.keyCode === 173) {
    muted();
  }
});

volumeslider = document.getElementById("volumeslider");
volumeslider.addEventListener("mousemove", setvolume);

function setvolume(){
  song.volume = volumeslider.value / 100;
}
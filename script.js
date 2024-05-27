let currentsong = new Audio()
function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
      return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}


async function getSongs() {
  let a = await fetch("http://192.168.29.133:3000/songs/");
  let response = await a.text();


  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}
const playMusic = (track , pause=false)=>{
  currentsong.src = "/songs/" + track
  if (!pause){
    currentsong.play()
    play.src = "pause.svg" 
  } 
  document.querySelector(".songinfo").innerHTML =(track);
  document.querySelector(".songtime").innerHTML = ("00:00 / 00:00");
}

async function main(){
let songs = await getSongs();
playMusic(songs[0],true)

let songUL= document.querySelector(".songlist").getElementsByTagName("ul")[0]
for (const song of songs) {
  songUL.innerHTML= songUL.innerHTML + `<li> 
  
  <img class = "invert" src="music.svg" alt="" class="src">
  <div class="info">
    <div>${song.replaceAll("%20" , " ")}</div>
    <div>Naman</div>
  </div>
    <div class="playnow">
      <span>Play Now</span>
    <img class= "invert" src="play.svg" alt="" class="src">
  
  </div>

  
  

   </li>`;

   Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click",element=>{
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML)
    })
   })
  
}

}


play.addEventListener("click",() => {
  if(currentsong.paused){
    currentsong.play()
    play.src = "pause.svg"
  }
  else{
    currentsong.pause()
    play.src = "play.svg"
  }
})




currentsong.addEventListener("timeupdate", () => {
  document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentsong.currentTime)} / ${secondsToMinutesSeconds(currentsong.duration)}`
  document.querySelector(".circle").style.left=(currentsong.currentTime / currentsong.duration)*100 + "%"
})
document.querySelector(".seekbar").addEventListener("click", e=>{
  let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100
  document.querySelector(".circle").style.left = percent + "%"
  currentsong.currentTime=((currentsong.duration)*percent/100)
});
document.querySelector(".hamburger").addEventListener("click",()=>{
  document.querySelector(".left").style.left = "0"
})
document.querySelector(".cross").addEventListener("click",()=>{
  document.querySelector(".left").style.left = "-120%"
})

main()





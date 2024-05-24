let currentsong = new Audio()
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
const playMusic = (track)=>{
  currentsong.src = "/songs/" + track
  currentsong.play();
}

async function main(){
let songs = await getSongs();
console.log(songs);

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
main()




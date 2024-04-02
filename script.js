console.log("Welcome to Spotify");
// Initialize the variables
let audioElement=new Audio('songs/0.mp3');
let songIndex=0;
let masterPlay=document.getElementById("masterPlay");
let progressBar=document.getElementById("progressBar")
let gif=document.getElementById("gif");
let currentSong=document.getElementById("current_song");
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
    {songName:"Safari", filePath:"songs/0.mp3", coverPath:"cover/0.webp"},
    {songName:"Let Me Down slowly", filePath:"songs/1.mp3", coverPath:"cover/1.jpg"},
    {songName:"Sugar and Brownies", filePath:"songs/2.mp3", coverPath:"cover/2.jpg"},
    {songName:"Mere Sohneya", filePath:"songs/3.mp3", coverPath:"cover/3.jpg"},
    {songName:"Mann Mera", filePath:"songs/4.mp3", coverPath:"cover/4.jpg"},
    {songName:"Coldplay", filePath:"songs/5.mp3", coverPath:"cover/5.jpg"},
    {songName:"Tu Jaane Na", filePath:"songs/6", coverPath:"cover/6.jpg"},
    {songName:"Unstoppable", filePath:"songs/7.mp3", coverPath:"cover/7.jpg"},
    {songName:"Into Your Arms", filePath:"songs/8.mp3", coverPath:"cover/8.jpg"},
]

songItems.forEach((element,i)=>
{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
// audioElement.play();

//Handling masterPlay
masterPlay.addEventListener('click',()=>
{
    if (audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})
// Listen to events
audioElement.addEventListener("timeupdate",()=>
{
    console.log('timeupdate');
    //Update progress Bar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    progressBar.value=progress;

})

progressBar.addEventListener('change',()=>
{
    audioElement.currentTime=(progressBar.value*audioElement.duration)/100;

})

const makeAllPlays=()=>
{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>
{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');

})

}
//new song play from the list
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>
{
    element.addEventListener('click',(e)=>
    {
        index=parseInt(e.target.id);
        // console.log(index);
        // console.log(e.target);
        makeAllPlays();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src='songs/'+index+'.mp3';
        audioElement.currentTime=0;
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        currentSong.innerText=songs[index].songName;
        audioElement.play();
    
        
    })
})

document.getElementById('forward').addEventListener("click",()=>
{
    progress=parseInt(progress+10);
    console.log(progress);
    progressBar.value=progress;
    audioElement.currentTime=(progressBar.value*audioElement.duration)/100;

})

document.getElementById('backward').addEventListener("click",()=>
{
    progress=parseInt(progress-10);
    console.log(progress);
    progressBar.value=progress;
    audioElement.currentTime=(progressBar.value*audioElement.duration)/100;

})

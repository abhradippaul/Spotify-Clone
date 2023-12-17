let songs = [
    { songName: "name1", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "name2", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "name3", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "name4", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "name5", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "name6", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "name7", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "name8", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "name9", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "name10", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }
]
let playBtn = document.querySelector("#playBtn")
let item = document.querySelector(".main-part .left-div")
let progressbar = document.querySelector("#progressbar")
let volumebar = document.querySelector("#soundrange")
let songInfo = document.querySelector(".song-info")
let rightDiv = item.nextElementSibling.firstElementChild
let count = 0
let audioElement
songs.forEach((e) => {
    audioElement = new Audio(e.filePath)
    item.innerHTML += `<div class="item">
    <img src=${e.coverPath} alt="item">
    <span>${e.songName}</span>
    <span></span>
    <img src="./play-button.png" id="control" alt="">
    </div>`

})
item = Array.from(item.children)
volumebar.value = .3 * 10
for (let i = 0; i < item.length; i++) {
    // console.log(songs[i].filePath)
    item[i].addEventListener("click", () => {
        songInfo.style.visibility = "visible"
        if (audioElement.currentTime != 0) {
            // console.log(count)
            item[count].lastElementChild.src = `play-button.png`
            audioElement.pause()
        }
        // console.log(item[i].lastElementChild)
        item[i].lastElementChild.src = `video-pause-button.png`
        songInfo.lastElementChild.innerText = songs[i].songName
        rightDiv.src = songs[i].coverPath
        playBtn.src = `video-pause-button.png`
        audioElement = new Audio(songs[i].filePath)
        audioElement.volume = volumebar.value / 10
        soundChange()
        count = i
        audioElement.play()
        timeUpdate()
        playBtn.nextElementSibling.addEventListener("click", () => {
            if (i >= 9) {
                i = -1
            }
            // console.log("hello")
            audioElement.pause()
            item[count].lastElementChild.src = `play-button.png`
            i += 1
            count = i
            item[i].lastElementChild.src = `video-pause-button.png`
            audioElement = new Audio(songs[i].filePath)
            songInfo.lastElementChild.innerText = songs[i].songName
            rightDiv.src = songs[i].coverPath
            audioElement.volume = volumebar.value / 10
            soundChange()
            audioElement.play()
            timeUpdate()
        })
        playBtn.previousElementSibling.addEventListener("click", () => {
            if (i <= 0) {
                i = 10
            }
            audioElement.pause()
            item[count].lastElementChild.src = `play-button.png`
            i -= 1
            count = i
            item[i].lastElementChild.src = `video-pause-button.png`
            audioElement = new Audio(songs[i].filePath)
            songInfo.lastElementChild.innerText = songs[i].songName
            rightDiv.src = songs[i].coverPath

            audioElement.volume = volumebar.value / 10

            soundChange()
            audioElement.play()
            timeUpdate()
        })
    })

}

const timeUpdate = () => {
    progressbar.addEventListener("change", () => {
        audioElement.currentTime = (progressbar.value / 100) * audioElement.duration
    })
    audioElement.addEventListener("timeupdate", () => {
        progressbar.value = (audioElement.currentTime / audioElement.duration) * 100

    })
}
const soundChange = () => {
    volumebar.addEventListener("change", () => {
        audioElement.volume = volumebar.value / 10
    })
}


playBtn.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
        playBtn.src = `video-pause-button.png`
        item[count].lastElementChild.src = `video-pause-button.png`
        songInfo.style.visibility = "visible"
        audioElement.play()
    }

    else {
        audioElement.pause()
        playBtn.src = `play-button.png`
        item[count].lastElementChild.src = `play-button.png`
        songInfo.style.visibility = "hidden"
    }
})

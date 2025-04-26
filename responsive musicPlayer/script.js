// Write your javascript here
    const tracks = [
        {
            name: "Let me down slowly",
            artist: "Alec Benjamin",
            cover: "images/alec.jpg",
            source: "songs/Let me down slowly.mp3",
        },
        {
            name: "Let me love you",
            artist: "DJ Snake/Justin Bieber",
            cover: "images/dj.jpg",
            source: "songs/Let me love you.mp3",
        },
        {
            name: "Perfect",
            artist: "Ed Sheeran",
            cover: "images/ed.jpg",
            source: "songs/Perfect.mp3",
        },
    ];
    
    let currentTrackIndex = 0;
    const audio = new Audio();
    const playButton = document.querySelector(".play i");
    const skipForwardButton = document.querySelector(".skip-forward");
    const skipBackButton = document.querySelector(".skip-back");
    const progressBar = document.querySelector(".progress-bar");
    const progressHead = document.querySelector(".progress-head");
    const progressContainer = document.querySelector(".progress");
    const currentTimeDisplay = document.querySelector(".current-time");
    const durationDisplay = document.querySelector(".duration");
    const audioTitle = document.querySelector(".audio-title");
    const audioSinger = document.querySelector(".audio-singer");
    const audioImg = document.querySelector(".audio-img img");
    
    function loadTrack(index) {
        currentTrackIndex = index;

        audio.src = tracks[index].source;
        audioTitle.textContent = tracks[index].name;
        audioSinger.textContent = tracks[index].artist;
        audioImg.src = tracks[index].cover + "?t=" + new Date().getTime();
        audio.load();
    }
    
    playButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play().then(() => {
                playButton.classList.remove("fa-play");
                playButton.classList.add("fa-solid", "fa-pause");
            });
        } else {
            audio.pause();
            playButton.classList.add("fa-play");
            playButton.classList.remove("fa-pause");
        }
    });
    
    audio.addEventListener("timeupdate", () => {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
        progressHead.style.left = `${progressPercent}%`;
    
        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime % 60);
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration % 60);
    
        currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? "0" : ""}${currentSeconds}`;
        durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? "0" : ""}${durationSeconds}`;
    });
    
    progressContainer.addEventListener("click", (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    });
    
    skipForwardButton.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play().then(() => {
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-solid", "fa-pause");
    }).catch(error => console.error("PlayBack error:", error));
});
    
    skipBackButton.addEventListener("click", () => {
        currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        loadTrack(currentTrackIndex);
        audio.play().then(()=> {
            playButton.classList.remove("fa-play");
            playButton.classList.add("fa-solid", "fa-pause");
        }).catch(error => console.error("PlayBack error:",error));
    });
    
    audio.addEventListener("loadedmetadata", () => {
        if(!isNaN(audio.duration)){
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration % 60);
        durationDisplay.textContent = `${durationMinutes}:${durationSeconds < 10 ? "0" : ""}${durationSeconds}`;
        }
    });
    
    loadTrack(currentTrackIndex);
    



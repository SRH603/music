/*
design by Voicu Apostol.
design: https://dribbble.com/shots/3533847-Mini-Music-Player
I can't find any open music api or mp3 api so i have to download all musics as mp3 file.
You can fork on github: https://github.com/muhammederdem/mini-player
*/

new Vue({
    el: "#app",
    data() {
        return {
            audio: null,
            circleLeft: null,
            barWidth: null,
            duration: null,
            currentTime: null,
            isTimerPlaying: false,
            tracks: [
                {
                    name: "Synchronia",
                    artist: "Athmyx",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Synchronia.wav",
                    url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
                    favorited: false
                },
                {
                    name: "Discombobulation",
                    artist: "Athmyx vs. Xx.hollow",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Discombobulation.wav",
                    url: "https://www.youtube.com/watch?v=Lin-a2lTelg",
                    favorited: true
                },
                {
                    name: "Whirlithem",
                    artist: "Athmyx",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Whirlithem.wav",
                    url: "https://www.youtube.com/watch?v=ICjyAe9S54c",
                    favorited: false
                },
                {
                    name: "E-ni²gha",
                    artist: "Athmyx vs. W.Turkey",
                    cover: "covers/E-nigha.jpg",
                    source: "tracks/E-nigha.mp3",
                    url: "https://www.youtube.com/watch?v=kYgGwWYOd9Y",
                    favorited: false
                },
                {
                    name: "Ariarcon",
                    artist: "Athmyx vs. LinRavenclaw",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Ariarcon.wav",
                    url: "https://www.youtube.com/watch?v=0WlpALnQdN8",
                    favorited: true
                },
                {
                    name: "Ni",
                    artist: "Athmyx",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Ni.wav",
                    url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
                    favorited: false
                },
                {
                    name: "Sunset Waves (Sunshine remix)",
                    artist: "Athmyx vs. LostPigYoo",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Sunset Waves (Sunshine remix).wav",
                    url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
                    favorited: true
                },
                {
                    name: "Palladyne",
                    artist: "Kahxlyrio",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Palladyne.wav",
                    url: "https://www.youtube.com/watch?v=me6aoX0wCV8",
                    favorited: true
                },
                {
                    name: "Hollowness",
                    artist: "Athmyx vs. W.Turkey",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Ni.wav",
                    url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
                    favorited: false
                },
                {
                    name: "Sichonia",
                    artist: "Athmyx",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Sichonia.wav",
                    url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
                    favorited: false
                },
                {
                    name: "Accretia",
                    artist: "Athmyx",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Accretia.mp3",
                    url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
                    favorited: false
                },
                {
                    name: "Chronaxium",
                    artist: "Athmyx",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Chronaxium.mp3",
                    url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
                    favorited: false
                },
                {
                    name: "Climmeros",
                    artist: "Athmyx",
                    cover: "covers/Ni.jpg",
                    source: "tracks/Climmeros.mp3",
                    url: "https://www.youtube.com/watch?v=HhoATZ1Imtw",
                    favorited: false
                }
            ],
            currentTrack: null,
            currentTrackIndex: 0,
            transitionName: null
        };
    },
    methods: {
        play() {
            if (this.audio.paused) {
                this.audio.play();
                this.isTimerPlaying = true;
            } else {
                this.audio.pause();
                this.isTimerPlaying = false;
            }
        },
        generateTime() {
            let width = (100 / this.audio.duration) * this.audio.currentTime;
            this.barWidth = width + "%";
            this.circleLeft = width + "%";
            let durmin = Math.floor(this.audio.duration / 60);
            let dursec = Math.floor(this.audio.duration - durmin * 60);
            let curmin = Math.floor(this.audio.currentTime / 60);
            let cursec = Math.floor(this.audio.currentTime - curmin * 60);
            if (durmin < 10) {
                durmin = "0" + durmin;
            }
            if (dursec < 10) {
                dursec = "0" + dursec;
            }
            if (curmin < 10) {
                curmin = "0" + curmin;
            }
            if (cursec < 10) {
                cursec = "0" + cursec;
            }
            this.duration = durmin + ":" + dursec;
            this.currentTime = curmin + ":" + cursec;
        },
        updateBar(x) {
            let progress = this.$refs.progress;
            let maxduration = this.audio.duration;
            let position = x - progress.offsetLeft;
            let percentage = (100 * position) / progress.offsetWidth;
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }
            this.barWidth = percentage + "%";
            this.circleLeft = percentage + "%";
            this.audio.currentTime = (maxduration * percentage) / 100;
            this.audio.play();
        },
        clickProgress(e) {
            this.isTimerPlaying = true;
            this.audio.pause();
            this.updateBar(e.pageX);
        },
        prevTrack() {
            this.transitionName = "scale-in";
            this.isShowCover = false;
            if (this.currentTrackIndex > 0) {
                this.currentTrackIndex--;
            } else {
                this.currentTrackIndex = this.tracks.length - 1;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        nextTrack() {
            this.transitionName = "scale-out";
            this.isShowCover = false;
            if (this.currentTrackIndex < this.tracks.length - 1) {
                this.currentTrackIndex++;
            } else {
                this.currentTrackIndex = 0;
            }
            this.currentTrack = this.tracks[this.currentTrackIndex];
            this.resetPlayer();
        },
        resetPlayer() {
            this.barWidth = 0;
            this.circleLeft = 0;
            this.audio.currentTime = 0;
            this.audio.src = this.currentTrack.source;
            setTimeout(() => {
                if(this.isTimerPlaying) {
                    this.audio.play();
                } else {
                    this.audio.pause();
                }
            }, 300);
        },
        favorite() {
            this.tracks[this.currentTrackIndex].favorited = !this.tracks[
                this.currentTrackIndex
                ].favorited;
        }
    },
    created() {
        let vm = this;
        this.currentTrack = this.tracks[0];
        this.audio = new Audio();
        this.audio.src = this.currentTrack.source;
        this.audio.ontimeupdate = function() {
            vm.generateTime();
        };
        this.audio.onloadedmetadata = function() {
            vm.generateTime();
        };
        this.audio.onended = function() {
            vm.nextTrack();
            this.isTimerPlaying = true;
        };

        // this is optional (for preload covers)
        for (let index = 0; index < this.tracks.length; index++) {
            const element = this.tracks[index];
            let link = document.createElement('link');
            link.rel = "prefetch";
            link.href = element.cover;
            link.as = "image"
            document.head.appendChild(link)
        }
    }
});

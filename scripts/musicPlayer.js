import { addZero } from './helper.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.js-audio');
    const audioImg = document.querySelector('.js-audio-img');
    const audioHeader = document.querySelector('.js-audio-header');
    const audioPlayer = document.querySelector('.js-audio-player');
    const audioNavigation = document.querySelector('.js-audio-navigation');
    const audioButtonPlay = document.querySelector('.js-audio-button-play');
    const audioTimePassed = document.querySelector('.js-audio-time-passed');
    const audioProgress = document.querySelector('.js-audio-progress');
    const audioProgressTiming = document.querySelector('.js-audio-progress-timing');
    const audioTimeTotal = document.querySelector('.js-audio-time-total');

    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    const loadTrack = () => {
        const idPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    }

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    }

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    }

    const addZero = n => n < 10 ? '0' + n : n;

    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('js-audio-button-play')) {
            audio.classList.toggle('play')
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('js-audio-button-prev')) {
            prevTrack();
        }

        if (target.classList.contains('js-audio-button-next')) {
            nextTrack();
        }
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';

        const minutesPassed = Math.floor(currentTime / 60 || '0');
        const secondsPassed = Math.floor(currentTime % 60 || '0');

        const minutesTotal = Math.floor(duration / 60 || '0');
        const secondsTotal = Math.floor(duration % 60 || '0');

        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;

        audioPlayer.currentTime = progress;
    });
}
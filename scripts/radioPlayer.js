export const radioPlayerInit = () => {
    const radio = document.querySelector('.js-radio');
    const radioCoverImage = document.querySelector('.js-radio-cover-image');
    const radioNavigation = document.querySelector('.js-radio-navigation');
    const radioItems = document.querySelectorAll('.js-radio-item');
    const radioHeader = document.querySelector('.js-radio-header');
    const radioStop = document.querySelector('.js-radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeiconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play')
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play')
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = elem => {
        radioItems.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');
        selectItem(parent);

        const title = parent.querySelector('.js-radio-name').textContent;
        radioHeader.textContent = title;

        const urlImg = parent.querySelector('.js-radio-image').src;
        radioCoverImage.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStation;
        audio.play();
        changeiconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeiconPlay();
    })
}
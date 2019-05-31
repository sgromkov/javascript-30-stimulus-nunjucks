import { Controller } from 'stimulus';

export default class extends Controller {
    static targets = [ 'button', 'audio' ]

    playSound(event) {
        const keyCode = event.keyCode || event.currentTarget.getAttribute('data-drum-kit-key');

        this.audioTargets.forEach((el) => {
            const key = el.getAttribute('data-drum-kit-key');

            if (key == keyCode) {
                el.currentTime = 0;
                el.play();
            }
        });

        this.buttonTargets.forEach((el) => {
            const key = el.getAttribute('data-drum-kit-key');

            if (key == keyCode) {
                el.classList.add('playing');
            }
        });
    }

    removeTransition(event) {
        if (event.propertyName !== 'transform') return;

        const el = event.currentTarget;
        el.classList.remove('playing');
    }
}
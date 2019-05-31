import { Controller } from 'stimulus';

export default class extends Controller {
    static targets = [ 'hourHand', 'minHand', 'secondHand' ]

    connect() {
        this.setDate();
        setInterval(this.setDate.bind(this), 1000);
    }

    setDate() {
        const now = new Date();
        const seconds = now.getSeconds();
        const mins = now.getMinutes();
        const hours = now.getHours();

        const secondsDegrees = ((seconds / 60) * 360) + 90;
        const minsDegrees = ((mins / 60) * 360) + 90;
        const hoursDegrees = ((hours / 12) * 360) + 90;

        this.secondHandTarget.style.transform = `rotate(${secondsDegrees}deg)`;
        this.minHandTarget.style.transform = `rotate(${minsDegrees}deg)`;
        this.hourHandTarget.style.transform = `rotate(${hoursDegrees}deg)`;
    }
}
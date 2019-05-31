import { Controller } from 'stimulus';

export default class extends Controller {
    update() {
        document.documentElement.style.setProperty(
            `--${this.element.name}`,
            `${this.element.value}${this.sizing}`
        );
    }

    get sizing() {
        return this.data.get("sizing") || "";
    }
}
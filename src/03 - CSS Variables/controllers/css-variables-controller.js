import { Controller } from 'stimulus';

export default class extends Controller {
    static targets = [ 'input' ]

    handleUpdate(event) {
        const element = event.currentTarget;
        const name = element.name;
        const value = element.value;
        const suffix = element.getAttribute('data-css-variables-sizing') || '';

        document.documentElement.style.setProperty(`--${name}`, `${value}${suffix}`);
    }
}
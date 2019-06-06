import { Controller } from 'stimulus';

export default class extends Controller {
    static targets = [ 'panel' ]

    toggleOpen(event) {
        const element = event.currentTarget;
        const index = element.getAttribute('data-gallery-index');

        this.panelTargets.forEach((item) => {
            const itemIndex = item.getAttribute('data-gallery-index');
            if (index != itemIndex) {
                item.classList.remove('open');
                // item.classList.remove('open-active');
            }
        });

        element.classList.toggle('open');
    }

    toggleActive(event) {
        const element = event.currentTarget;
        if (event.propertyName.includes('flex')) {
            element.classList.toggle('open-active');
        }
    }
}
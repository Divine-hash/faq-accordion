"use strict";
class Accordion {
    constructor(elem) {
        this.accordion = elem;
        this.buttons = elem.querySelectorAll('button');
        elem.addEventListener('click', this.onClickEvent.bind(this));
        elem.addEventListener('keydown', this.onKeyDownEvent.bind(this));
    }
    onClickEvent({ target }) {
        let btn = target.closest('button');
        if (!btn)
            return;
        this.togglePanel(btn);
    }
    onKeyDownEvent(event) {
        let target = event.target;
        if (target.tagName != 'BUTTON')
            return;
        if (event.code == 'ArrowDown') {
            this.onArrowDown(target);
        }
        else if (event.code == 'ArrowUp') {
            this.onArrowUp(target);
        }
    }
    onArrowDown(target) {
        let id = Number(target.dataset.id);
        if (id == this.buttons.length) {
            id = 0;
        }
        let nextBtn = this.accordion.querySelector(`[data-id="${++id}"]`);
        nextBtn.focus();
    }
    onArrowUp(target) {
        let id = Number(target.dataset.id);
        if (id == 1) {
            id = this.buttons.length + 1;
        }
        let prevBtn = this.accordion.querySelector(`[data-id="${--id}"]`);
        prevBtn.focus();
    }
    togglePanel(btn) {
        if (btn.getAttribute('aria-expanded') == 'false') {
            btn.setAttribute('aria-expanded', 'true');
            btn.closest('.accordion__faq').classList.add('open');
        }
        else {
            btn.setAttribute('aria-expanded', 'false');
            btn.closest('.accordion__faq').classList.remove('open');
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const elem = document.querySelector('.accordion');
    new Accordion(elem);
});

class Accordion {
  accordion: HTMLDivElement;
  buttons: NodeListOf<HTMLButtonElement>;

  constructor(elem: HTMLDivElement) {
    this.accordion = elem;
    this.buttons = <NodeListOf<HTMLButtonElement>>elem.querySelectorAll('button');

    elem.addEventListener('click', this.onClickEvent.bind(this));
    elem.addEventListener('keydown', this.onKeyDownEvent.bind(this));
  }

  onClickEvent({target}: MouseEvent) {
    let btn = (<HTMLElement>target).closest('button');
    if (!btn) return;
    this.togglePanel(btn);
  }

  onKeyDownEvent(event: KeyboardEvent) {
    let target = <HTMLButtonElement>event.target;
    if (target.tagName != 'BUTTON') return;

    if (event.code == 'ArrowDown') {
      this.onArrowDown(target);
    } else if (event.code == 'ArrowUp') {
      this.onArrowUp(target);
    }
  }

  onArrowDown(target: HTMLButtonElement) {
    let id = Number(target.dataset.id);
    if (id == this.buttons.length) {
      id = 0;
    }
    let nextBtn = <HTMLButtonElement>this.accordion.querySelector(`[data-id="${++id}"]`);
    nextBtn.focus();
  }

  onArrowUp(target: HTMLButtonElement) {
    let id = Number(target.dataset.id);
    if (id == 1) {
      id = this.buttons.length + 1;
    }
    let prevBtn = <HTMLButtonElement>this.accordion.querySelector(`[data-id="${--id}"]`);
    prevBtn.focus();
  }

  togglePanel(btn: HTMLButtonElement) {
    if (btn.getAttribute('aria-expanded') == 'false') {
      btn.setAttribute('aria-expanded', 'true');
      (<HTMLElement>btn.closest('.accordion__faq')).classList.add('open');
    } else {
      btn.setAttribute('aria-expanded', 'false');
      (<HTMLElement>btn.closest('.accordion__faq')).classList.remove('open');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const elem = <HTMLDivElement>document.querySelector('.accordion');
  new Accordion(elem);
});
// import { twMerge } from 'tailwind-merge'

import { MenuChild } from './menu'

export class MenuButton extends MenuChild {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()

    this.menu.button = this

    this.addEventListener('click', this.clickHandler)
  }

  clickHandler() {
    this.menu?.toggle()
  }
}

function register() {
  customElements.define('c-menu-button', MenuButton)
}

export default { register }

import { twMerge } from 'tailwind-merge'
import { MenuButton } from './menuButton'
import { MenuItems } from './menuItems'

class Menu extends HTMLElement {
  shadow = document.createElement('div')
  opened = false
  button?: MenuButton
  items?: MenuItems

  constructor() {
    super()
  }

  connectedCallback() {
    this.className = twMerge('relative group', this.className)
    document.addEventListener('click', this.bindedClickHandler)

    this.shadow.classList.add('c-menu-shadow')

    this.appendChild(this.shadow)
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.bindedClickHandler)
  }

  bindedClickHandler = this.clickHandler.bind(this)
  clickHandler(e: MouseEvent) {
    const target = e.target as Element

    if (
      this?.opened &&
      this.items !== target &&
      !this.items?.contains(target) &&
      this.button !== target &&
      !this.button?.contains(target)
    ) {
      this?.toggle()
    }
  }

  toggle() {
    this.opened = !this.opened
    this.classList.toggle('active', this.opened)
    this.shadow.classList.toggle('active', this.opened)
    this.opened ? this.items?.show() : this.items?.hide()
    document.body.classList.toggle('c-menu-opened', this.opened)
  }
}

export class MenuChild extends HTMLElement {
  menu: Menu = new Menu()

  constructor() {
    super()
  }

  connectedCallback() {
    const menu = this.closest<Menu>('c-menu')

    if (!menu) {
      throw new Error('Menu child component expect menu component as parent element')
    }

    this.menu = menu
  }
}

function register() {
  customElements.define('c-menu', Menu)
}

export default { register }

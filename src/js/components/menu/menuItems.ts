import { twMerge } from 'tailwind-merge'
import { MenuChild } from './menu'

const placementClassName = {
  top: 'c-menu-items-top',
  'top-start': 'c-menu-items-top-start',
  'top-end': 'c-menu-items-top-end',
  bottom: 'c-menu-items-bottom',
  'bottom-start': 'c-menu-items-bottom-start',
  'bottom-end': 'c-menu-items-bottom-end',
  right: 'c-menu-items-right',
  'right-start': 'c-menu-items-right-start',
  'right-end': 'c-menu-items-right-end',
  left: 'c-menu-items-left',
  'left-start': 'c-menu-items-left-start',
  'left-end': 'c-menu-items-left-end',
}

const showClassName = 'active'

export class MenuItems extends MenuChild {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()

    this.menu.items = this

    const placement = (this.getAttribute('placement') || 'bottom-start') as keyof typeof placementClassName

    this.className = twMerge(
      'c-menu-items w-56 bg-l3 text-default rounded-md ',
      'transition ease-in duration-75',
      placementClassName[placement] || placementClassName['bottom-start'],
      this.className
    )
  }

  show() {
    this.classList.add(...showClassName.split(' '))
  }

  hide() {
    this.classList.remove(...showClassName.split(' '))
  }
}

function register() {
  customElements.define('c-menu-items', MenuItems)
}

export default { register }

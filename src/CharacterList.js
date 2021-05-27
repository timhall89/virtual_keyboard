import { Lightning } from '@lightningjs/sdk'
import Character from './Character'
import { CHAR_LIST_HEIGHT } from './config/constants'

const lowercase = [...Array(26).keys()].map((_, i) => String.fromCharCode(i + 97))
const uppercase = [...Array(26).keys()].map((_, i) => String.fromCharCode(i + 65))
const numbers = [...Array(10).keys()].map((_, i) => String.fromCharCode(i + 48))
const allCharacters = [...lowercase, ...uppercase, ...numbers]

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      h: CHAR_LIST_HEIGHT,
      children: allCharacters.map(char => ({
        type: Character,
        label: char,
      })),
    }
  }

  get items() {
    return this.children
  }

  get activeValue() {
    return this.items[this._index].label
  }

  _setIndex(idx) {
    for (let i = -3; i <= 3; i++) {
      const item = this.children[idx + i]
      if (item) item._setPos(i + 3)
    }
    this._index = idx
  }

  _init() {
    this._setIndex(0)
  }

  _handleUp() {
    this._setIndex(Math.max(0, --this._index))
  }

  _handleDown() {
    this._setIndex(Math.min(++this._index, this.items.length - 1))
  }
}

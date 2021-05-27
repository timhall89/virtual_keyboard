import { Lightning } from '@lightningjs/sdk'
import { CHAR_HEIGHT } from './config/constants'

export default class Character extends Lightning.Component {
  static _template() {
    return {
      y: 0,
      alpha: 0,
      w: 70,
      textAlign: 'center',
      text: { text: '', fontFace: 'Regular', fontSize: 40, textColor: 0xbb7094db },
    }
  }

  set label(v) {
    this.text.text = v
  }

  get label() {
    return this.text.text
  }

  _setPos(pos) {
    this.setSmooth('y', pos * CHAR_HEIGHT)
    this.setSmooth('alpha', 1 - Math.abs(pos - 3) / 3)
    this._pos = pos
  }

  _init() {
    this._setPos(7)
  }
}

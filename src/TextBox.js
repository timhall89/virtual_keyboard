import { Lightning } from '@lightningjs/sdk'
import { TEXT_BOX_WIDTH, TEXT_BOX_PADDING, CHAR_WIDTH } from './config/constants'

export default class Menu extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      color: 0xffffffff,
      w: TEXT_BOX_WIDTH,
      h: 60,
      Text: {},
    }
  }

  set value(v) {
    this.tag('Text').children = v.split('').map((c, i) => ({
      y: 30,
      mountY: 0.5,
      x: TEXT_BOX_PADDING + i * CHAR_WIDTH,
      text: {
        text: c,
        fontFace: 'Regular',
        fontSize: 40,
        textColor: 0xbb050a14,
      },
    }))
  }
}

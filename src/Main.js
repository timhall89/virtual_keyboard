import { Lightning } from '@lightningjs/sdk'
import CharacterList from './CharacterList'
import TextBox from './TextBox'
import {
  MAX_TEXT_BOX_LENGTH,
  TEXT_BOX_WIDTH,
  CHAR_WIDTH,
  TEXT_BOX_PADDING,
  CHAR_LIST_HEIGHT,
} from './config/constants'

export default class Main extends Lightning.Component {
  static _template() {
    return {
      Wrapper: {
        rect: true,
        x: 960,
        y: 540,
        mount: 0.5,
        w: TEXT_BOX_WIDTH,
        h: CHAR_LIST_HEIGHT,
        color: 0xffebf0fa,
        TextBox: {
          type: TextBox,
          value: '',
          y: CHAR_LIST_HEIGHT / 2,
          mountY: 0.5,
          MaxReachedWarning: {
            y: 60,
            alpha: 0,
            text: {
              text: `Maximum of ${MAX_TEXT_BOX_LENGTH} characters allowed`,
              textColor: 0xbbffa31a,
              fontSize: 30,
            },
          },
        },
        CharacterList: {
          x: TEXT_BOX_PADDING,
          type: CharacterList,
        },
      },
    }
  }

  _setValue(v) {
    this.tag('TextBox').value = v
    this.tag('CharacterList').setSmooth('x', (v || '').length * CHAR_WIDTH + TEXT_BOX_PADDING)
    this._value = v
    if (v.length >= MAX_TEXT_BOX_LENGTH) {
      this._setState('MaxCharactersReached')
    } else {
      this._setState('')
    }
  }

  _addChar(c) {
    this._setValue((this._value || '') + c)
  }

  _removeLastChar() {
    this._setValue((this._value || '').slice(0, -1))
  }

  _getFocused() {
    return this.tag('CharacterList')
  }

  _handleEnter() {
    this._addChar(this.tag('CharacterList').activeValue)
  }

  _handleBack() {
    this._removeLastChar()
  }

  static _states() {
    return [
      class MaxCharactersReached extends this {
        $enter() {
          this.tag('TextBox.MaxReachedWarning').setSmooth('alpha', 1)
          this.tag('CharacterList').setSmooth('alpha', 0)
        }
        $exit() {
          this.tag('TextBox.MaxReachedWarning').setSmooth('alpha', 0)
          this.tag('CharacterList').setSmooth('alpha', 1)
        }
      },
    ]
  }
}

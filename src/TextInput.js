import { Lightning } from '@lightningjs/sdk'
import CharacterList from './CharacterList'
import TextBox from './TextBox'
import SubmitButton from './SubmitButton'
import {
  MAX_TEXT_BOX_LENGTH,
  TEXT_BOX_WIDTH,
  CHAR_WIDTH,
  TEXT_BOX_PADDING,
  CHAR_LIST_HEIGHT,
} from './config/constants'

export default class TextInput extends Lightning.Component {
  static _template() {
    return {
      TextInput: {
        rect: true,
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
        SubmitButton: {
          y: CHAR_LIST_HEIGHT / 2,
          mountY: 0.5,
          x: TEXT_BOX_WIDTH,
          type: SubmitButton,
        },
      },
    }
  }

  _setup() {
    this._setState('TextBoxFocus')
  }

  _setValue(v) {
    this.tag('TextBox').value = v
    this.tag('CharacterList').setSmooth('x', (v || '').length * CHAR_WIDTH + TEXT_BOX_PADDING)
    this._value = v
    if (v.length >= MAX_TEXT_BOX_LENGTH) {
      this._setState('TextBoxFocus.MaxCharactersReached')
    } else {
      this._setState('TextBoxFocus')
    }
  }

  _addChar(c) {
    this._setValue((this._value || '') + c)
  }

  _removeLastChar() {
    this._setValue((this._value || '').slice(0, -1))
  }

  static _states() {
    return [
      class TextBoxFocus extends this {
        _getFocused() {
          return this.tag('CharacterList')
        }
        _handleRight() {
          this._setState('SubmitButtonFocused')
        }
        $enter() {
          this.tag('CharacterList').setSmooth('alpha', 1)
          if (this._value >= MAX_TEXT_BOX_LENGTH) {
            this._setState('TextBoxFocus.MaxCharactersReached')
          }
        }
        $exit() {
          this.tag('CharacterList').setSmooth('alpha', 0)
        }

        _handleEnter() {
          if ((this._value || '').length < MAX_TEXT_BOX_LENGTH) {
            this._addChar(this.tag('CharacterList').activeValue)
          }
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
      },
      class SubmitButtonFocused extends this {
        _handleLeft() {
          this._setState('TextBoxFocus')
        }
        _handleEnter() {
          this.signal('submitted', this._value)
        }
        _getFocused() {
          return this.tag('SubmitButton')
        }
        $enter() {
          this.tag('SubmitButton').active = true
        }
        $exit() {
          this.tag('SubmitButton').active = false
        }
      },
    ]
  }
}

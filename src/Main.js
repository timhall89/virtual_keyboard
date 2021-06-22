import { Lightning } from '@lightningjs/sdk'
import CharacterList from './CharacterList'
import TextBox from './TextBox'
import SubmitButton from './SubmitButton'
import TextInput from './TextInput'
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
      EnterYouName: {
        rect: true,
        x: 960,
        y: 540,
        mount: 0.5,
        w: TEXT_BOX_WIDTH,
        h: CHAR_LIST_HEIGHT,
        color: 0xffebf0fa,
        TextInput: {
          type: TextInput,
          signals: { submitted: true },
        },
        Title: {
          text: {
            text: 'Enter your name',
            fontFace: 'Regular',
            fontSize: 40,
            textColor: 0xbb7094db,
          },
        },
      },
      SubmittedMessage: {
        alpha: 0,
        rect: true,
        x: 960,
        y: 540,
        mount: 0.5,
        w: TEXT_BOX_WIDTH,
        color: 0xffebf0fa,
        h: 60,
        Message: {
          y: 30,
          mountY: 0.5,
          text: {
            text: '',
            fontFace: 'Regular',
            fontSize: 40,
            textColor: 0xbb7094db,
          },
        },
      },
    }
  }

  _setup() {
    this._setState('Pending')
  }

  static _states() {
    return [
      class Pending extends this {
        _getFocused() {
          return this.tag('TextInput')
        }

        submitted(v) {
          this._setState('Submitted', v)
        }
      },
      class Submitted extends this {
        $enter(v, ...rest) {
          this.tag('EnterYouName').setSmooth('alpha', 0)
          this.tag('Message').text.text = 'Hello ' + rest.join('')
          this.tag('SubmittedMessage').setSmooth('alpha', 1)
        }
      },
    ]
  }
}

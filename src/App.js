import { Lightning, Utils } from '@lightningjs/sdk'
import Splash from './Splash'
import Main from './Main'

export default class App extends Lightning.Component {
  static getFonts() {
    return [{ family: 'Regular', url: Utils.asset('fonts/Monaco.ttf') }]
  }

  static _template() {
    return {
      rect: true,
      color: 0xffebf0fa,
      w: 1920,
      h: 1080,
      Splash: {
        type: Splash,
        signals: { loaded: true },
        alpha: 0,
      },
      Main: {
        type: Main,
        alpha: 0,
      },
    }
  }

  _setup() {
    this._setState('Splash')
  }

  static _states() {
    return [
      class Splash extends this {
        $enter() {
          this.tag('Splash').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Splash').setSmooth('alpha', 0)
        }
        loaded() {
          this._setState('Main')
        }
      },
      class Main extends this {
        $enter() {
          this.tag('Main').setSmooth('alpha', 1)
        }
        $exit() {
          this.tag('Main').setSmooth('alpha', 0)
        }
        _getFocused() {
          return this.tag('Main')
        }
      },
    ]
  }
}

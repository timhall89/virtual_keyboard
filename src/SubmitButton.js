import { Lightning } from '@lightningjs/sdk'

export default class SubmitButton extends Lightning.Component {
  static _template() {
    return {
      rect: true,
      color: 0xffedc374,
      h: 60,
      w: 160,
      Inner: {
        rect: true,
        color: 0xffedc374,
        x: 80,
        y: 30,
        mount: 0.5,
        h: 50,
        w: 150,
      },
      Text: {
        x: 80,
        y: 30,
        mount: 0.5,
        text: {
          text: 'SUBMIT',
          fontFace: 'Regular',
          fontSize: 30,
          textColor: 0xbb1f3d7a,
        },
      },
    }
  }

  set active(v) {
    this.color = v ? 0xbb1f3d7a : 0xffedc374
  }
}

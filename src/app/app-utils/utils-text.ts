import {VOInput} from '../app-core/models/autocomlete.models';

export class UtilsText {
  static getPositionWordBefore(pos: number, text: string) {
    if (pos === 0) {
      return 0;
    }
    if (text.charAt(pos - 1) === ' ') {
      return -1;
    }

    let from = text.length - text.split('').reverse().join('').indexOf(' ', text.length - pos);
    if (from > text.length) {
      from = 0;
    }

    return from;
  }

  static getPositionWordAfter(pos: number, text: string) {
    if (pos === text.length - 1) {
      return pos;
    }
    let to = text.indexOf(' ', pos);
    if (to === -1) {
      to = text.length;
    }
    return to;
  }

  static getWordImIn(pos: number, text: string) {

    let to = text.indexOf(' ', pos);
    if (to === -1) {
      to = text.length;
    }
    let from = text.length - text.split('').reverse().join('').indexOf(' ', text.length - pos);
    if (from > text.length) {
      from = 0;
    }
    return  text.substring(from, to);
  }

  static removeNotUsed(ar: string[], text: string) {
    const out = [];
    ar.forEach(function(item) {
      if (text.indexOf(item) !== -1) out.push(item);
    });
    return out;
  }

  static filterNames(pattern: string, ar: string[]) {
    if (!pattern) return ar;
    pattern = pattern.toLocaleLowerCase();
    return ar.filter(function(item) {
      return item.toLocaleLowerCase().startsWith(pattern);
    });
  }

  static mapInput(evt): VOInput  {
    const input  = evt.data;
    const text: string = evt.target.value;
    const position = evt.target.selectionStart;
    return {
      input,
      text,
      position
    };
  }
}

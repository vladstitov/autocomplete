import {Action} from '@ngrx/store';
import {VOPerson} from '../models/people.models';
import {VOInput, VOInputState} from '../models/autocomlete.models';

export const TEXT_CHANGED = 'TEXT_CHANGED';
export class TextChanged implements Action {
  readonly type = TEXT_CHANGED;
  constructor(public payload: VOInput) {
  }
}
export const INPUT_TEXT_STATE_CHANGED = 'INPUT_TEXT_STATE_CHANGED';
export class InputTextStateChanged implements Action{
  readonly type = INPUT_TEXT_STATE_CHANGED;
  constructor(public payload: VOInputState) {
  }
}

export type Actions = TextChanged | InputTextStateChanged;

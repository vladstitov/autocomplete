import {Action} from '@ngrx/store';
import {VOPerson} from '../models/people.models';
import {VOInput} from '../models/autocomlete.models';

export const TEXT_CHANGED = 'TEXT_CHANGED';
export class TextChanged implements Action {
  readonly type = TEXT_CHANGED;
  constructor(public payload: VOInput) {
  }
}


export type Actions = TextChanged;

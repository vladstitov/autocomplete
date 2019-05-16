import {Action} from '@ngrx/store';
import {VOPerson} from '../models/people.models';

export const TEXT_CHANGED = 'TEXT_CHANGED';
export class TextChanged implements Action {
  readonly type = TEXT_CHANGED;
  constructor(public payload: string) {
  }
}


export type Actions = TextChanged;

import {VOPerson} from '../models/people.models';
import {VOInput} from '../models/autocomlete.models';

export interface StoreData {
  namesInserted: string[];
  people: VOPerson[];
}


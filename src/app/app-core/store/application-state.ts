import {UiState} from './ui-state';
import {StoreData} from './store-data';

export interface ApplicationState {
  readonly uiState: UiState;
  readonly storeData: StoreData;
}


export const INITIAL_APPLICATION_STATE: ApplicationState = {
  uiState: {
    cursorPosition: 0,
    pattern: null
  },
  storeData: {
    people: null,
    namesInserted: [],
    textValue: ''
  }
};


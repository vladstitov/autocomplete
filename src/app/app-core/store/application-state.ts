import {UiState} from './ui-state';
import {StoreData} from './store-data';

export interface ApplicationState {
  readonly uiState: UiState;
  readonly storeData: StoreData;
}


export const INITIAL_APPLICATION_STATE: ApplicationState = {
  uiState: {
    textArea: {
      input: '',
      position: -1,
      text: ''
    }
  },
  storeData: {
    people: null,
    namesInserted: []
  }
};


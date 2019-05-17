import {UiState} from './ui-state';
import {StoreData} from './store-data';
import {VO_INPUT, VO_INPUT_STATE, VOInput, VOInputState} from '../models/autocomlete.models';

export interface ApplicationState {
  readonly uiState: {
    textArea: VOInputState
  };
  readonly storeData: {
    textArea: VOInput
  };
}


export const INITIAL_APPLICATION_STATE: ApplicationState = {
  uiState: {
    textArea: VO_INPUT_STATE
  },
  storeData: {
    textArea: VO_INPUT
  }
};


import {ApplicationState, INITIAL_APPLICATION_STATE} from '../store/application-state';
import {Action} from '@ngrx/store';
import {TEXT_CHANGED, TextChanged} from '../store/actions';


export function autocompleteReducer(state: ApplicationState = INITIAL_APPLICATION_STATE, action: TextChanged) {

  switch (action.type) {
    case TEXT_CHANGED :
      const newState: ApplicationState = Object.assign({}, state);
      newState.uiState.textArea =  action.payload;
      return  newState;
    default:
      return state;


  }

}



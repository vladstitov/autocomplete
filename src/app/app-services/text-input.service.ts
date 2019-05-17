import {Injectable} from '@angular/core';
import {VO_INPUT, VO_INPUT_STATE, VOInput, VOInputState} from '../app-core/models/autocomlete.models';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TextInputService {

  private textInputSub: BehaviorSubject<VOInput> = new BehaviorSubject(VO_INPUT);
  private textInputStateSub: BehaviorSubject<VOInputState> = new BehaviorSubject(VO_INPUT_STATE);


  setTextInput(data: VOInput) {
    this.textInputSub.next(data);
  }

  get textInput$(): Observable<VOInput> {
    return this.textInputSub.asObservable();
  }

  get textInput(): VOInput {
    return this.textInputSub.getValue();
  }

  get textInputState$() {
    return this.textInputStateSub.asObservable();
  }

  setTextInputState(state: VOInputState) {
    this.textInputStateSub.next(state);
  }

  get pattren$() {
    return combineLatest(this.textInput$, this.textInputState$).pipe(map(([input, state]) => {
      return state.isHint ? input.text.substring(state.startSignPosition + 1, input.position) : '';
    }));
  }

  constructor() {

    combineLatest(this.textInputState$, this.textInput$).subscribe(([state, input]) => {
      if (state.isHint && (input.text.charAt(state.startSignPosition) !== '@')) {
        this.setTextInputState({startSignPosition: - 1, isHint: false, pattern: ''});
      }
    });
  }
}

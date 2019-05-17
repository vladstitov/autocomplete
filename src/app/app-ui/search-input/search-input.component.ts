import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SearchNamesService} from '../../app-services/search-names.service';
import {FormControl} from '@angular/forms';
import {BehaviorSubject, combineLatest, fromEvent, noop, Observable, Subject} from 'rxjs';
import {UtilsText} from '../../app-utils/utils-text';
import {map, mergeMap, switchMap, tap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../app-core/store/application-state';
import {TextChanged} from '../../app-core/store/actions';
import {VOInput} from '../../app-core/models/autocomlete.models';
import {TextInputService} from '../../app-services/text-input.service';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  @ViewChild('myTextAria') myTextArea: TemplateRef<HTMLTextAreaElement>;
  names$: Observable<string[]>;

  pattern: string;
  textAria: HTMLTextAreaElement;
  insertedNames: string[] = [];
  lastKey: string;
  text = '';
  startPatternIndex = -1;
  showHints = false;
  textArea$: Observable<VOInput>;
  keyDown$: Observable<string>;


  constructor(
    private searchNames: SearchNamesService,
    private textInputService: TextInputService,
    private store: Store<ApplicationState>
  ) {

  }

  ngOnInit() {
    // this.store.subscribe(data => console.log(data));

    this.textAria = (this.myTextArea as any).nativeElement;
    this.textArea$ = fromEvent(this.textAria, 'input').pipe(map(UtilsText.mapInput), tap(input => {
      this.textInputService.setTextInput(input);
    }));
    this.textArea$.subscribe(noop);

    this.textInputService.textInput$.subscribe(input => {
      if (input.input === '@') {
        this.textInputService.setTextInputState({
          startSignPosition: input.position - 1,
          isHint: true,
          pattern: ''
        });
      }
    });

    this.textInputService.textInputState$.subscribe(state =>  {
      this.startPatternIndex = state.startSignPosition + 1;
      this.showHints = state.isHint;
    });

    this.names$ = combineLatest(this.textInputService.pattren$, this.searchNames.names$)
      .pipe(map(([pattern, names]) => {
        return UtilsText.filterNames(pattern, names);
      }));
  }

  insertName(name) {
    let text = this.textAria.value;
    const end = this.textAria.selectionStart;
    const start = this.startPatternIndex;
    this.insertedNames.push(name);
    text = text.slice(0, start - 1) + name + text.slice(end);
    this.textAria.value = text;
    this.textAria.focus();
  }


 onKeyDown($event: KeyboardEvent) {
    this.lastKey = $event.code;
  }

  onTextChanged($event: Event) {
    const text = this.textAria.value;

    if (this.lastKey !== 'Backspace' && this.lastKey !== 'Delete') {
      return;
    }

    const pos = this.textAria.selectionStart;

    switch (this.lastKey) {
      case 'Backspace':
        const positionBefore = UtilsText.getPositionWordBefore(pos, text);
        if (positionBefore !== -1) {
          const wordBefore = text.substring(positionBefore, pos);
          if (this.insertedNames.indexOf(wordBefore) !== -1) {
            this.textAria.selectionStart = positionBefore;
            this.textAria.selectionEnd = pos;
          }
          // console.log('before ' + wordBefore);
        }
        break;
      case 'Delete':
        const positionAfter = UtilsText.getPositionWordAfter(pos, text);
        if (this.lastKey === 'Delete' && positionAfter !== -1) {
          const wordAfter = text.substring(pos, positionAfter);
          //  console.log('after ' + wordAfter);
          if (this.insertedNames.indexOf(wordAfter) !== -1) {
            this.textAria.selectionEnd = positionAfter;
          }
        }
        break;
      default:
        this.insertedNames = UtilsText.removeNotUsed(this.insertedNames, text);
        break;
    }
  }

  onContainerClick() {
   this.textInputService.setTextInputState({
     startSignPosition: -1,
     pattern: '',
     isHint: false
   });
  }

  onNameClick(name: string) {
    this.insertName(name);
    this.textInputService.setTextInputState({isHint: false, pattern: '', startSignPosition: -1});
  }
}

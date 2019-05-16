import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {SearchNamesService} from '../../app-services/search-names.service';
import {FormControl} from '@angular/forms';
import {combineLatest, Observable, Subject} from 'rxjs';
import {UtilsText} from '../../app-utils/utils-text';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../app-core/store/application-state';
import {TextChanged} from '../../app-core/store/actions';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit {

  @ViewChild('myTextAria') myTextAria: TemplateRef<HTMLTextAreaElement>;
  names$: Observable<string[]>;
  searchPattern$: Subject<string> = new Subject();
  pattern: string;
  textAria: HTMLTextAreaElement;
  insertedNames: string[] = [];
  lastKey: string;
  text = '';
  startPatternIndex = -1;
  showHints = false;

  constructor(
    private searchNames: SearchNamesService,
    private store: Store<ApplicationState>
  ) {
  }

  ngOnInit() {

    this.store.subscribe(data => console.log(data));


    this.textAria = (this.myTextAria as any).nativeElement;
    this.names$ = this.searchPattern$.pipe(switchMap(pattern => {
     return this.searchNames.names$.pipe(map(names => {
       return UtilsText.filterNames(pattern, names);
     }));
    }));
  }


  insertName(name) {
    let text = this.textAria.value;
    const end = this.textAria.selectionStart;
    const start = this.startPatternIndex;

    this.insertedNames.push(name);
    text = text.slice(0, start - 1) + name + text.slice(end);
    this.textAria.value = text;
    this.store.dispatch(new TextChanged(text));
    this.textAria.focus();
  }



  onKeyDown($event: KeyboardEvent) {

    this.lastKey = $event.code;
    if ($event.key === '@') {
      this.showHints = true;
      this.startPatternIndex = this.textAria.selectionStart + 1;

    }
  }


  onMouseDown($event: MouseEvent) {

  }

  onTextChanged($event: Event) {
    const text = this.textAria.value;
    this.store.dispatch(new TextChanged(text));
    if (this.showHints) {
      const pattern = text.substring(this.startPatternIndex, this.textAria.selectionStart);
      this.searchPattern$.next(pattern);
      return;
    }

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
    this.showHints = false;
    this.searchPattern$.next('');  }

  onNameClick(name: string) {
    this.insertName(name);
  }
}

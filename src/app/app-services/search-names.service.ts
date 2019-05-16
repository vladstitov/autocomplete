import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {VOPerson} from '../app-core/models/people.models';


@Injectable({
  providedIn: 'root'
})
export class SearchNamesService {

  private ppl: BehaviorSubject<VOPerson[]> = new BehaviorSubject(null);

  get names$(): Observable<string[]> {
    return this.ppl.pipe(filter(v => !!v), map(ppl => ppl.map(function(item) {
      return item.name;
    })));
  }

  constructor(
    private http: HttpClient
  ) {
    this.downloadPeople().subscribe(ppl => this.ppl.next(ppl));
  }

  downloadPeople() {
    const url = '/assets/names.json';
    return this.http.get(url).pipe(map(mapPeopleData));
  }

}


function mapPeopleData(data): VOPerson[] {
  const surnames = data.surnames;
  const l = surnames.length - 1;

  const getSurname = function() {
    const i = Math.round(Math.random() * l);
    return surnames[i];
  };
  const males = data.male.map(function(item) {

    return {
      name: item,
      surname: getSurname(),
      gender: 'male',
    };
  });

  const females =  data.male.map(function(item) {
    return {
      name: item,
      surname: getSurname(),
      gender: 'female',
    };
  });
  let out =  males.concat(females);
  const c = {};
  out = out.filter(function(item) {
    const exists =  this.c[item.name];
    this.c[item.name] = true;
    return exists;
  }, {c});

  return out.sort(function(a, b) {
    return a.name > b.name;
  });
}

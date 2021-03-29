import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
const QUERY = gql` {
  episodes {
    results {
      id
      name
      episode
    }
  }
  characters(page: 2) {
    info {
      count
    }
    results {
      id
      name
      status
      species
      gender
      origin{
        id
        name
      }
      location{
        id
        name
      }
      image
    }
  }
}`;
@Injectable({
  providedIn: 'root'
})
export class DaoService {
  // se crean los observables privadas
  private eposidesSubject = new BehaviorSubject<any[]>(null);
  private charactersSubject = new BehaviorSubject<any[]>(null);

  //observables publicas a la escucha
  eposides$ = this.eposidesSubject.asObservable();
  characters$ = this.charactersSubject.asObservable();

  constructor(private readonly apollo: Apollo) {
    this.getDataApi();
  }

  private getDataApi(): void {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { characters, episodes } = data;
        this.charactersSubject.next(characters.results);
        this.eposidesSubject.next(episodes.results);
      })
    ).subscribe();
  }
}

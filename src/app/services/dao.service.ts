import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { pluck, take, tap, withLatestFrom } from 'rxjs/operators';
const QUERY = gql` {
  episodes {
    results {
      id
      name
      episode
    }
  }
  characters {
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
    this.getAllDataApi();
  }

  private getAllDataApi(): void {
    this.apollo.watchQuery<any>({
      query: QUERY
    }).valueChanges.pipe(
      take(1),
      tap(({ data }) => {
        const { characters, episodes } = data;
        this.parseCharactersData(characters.results);
        this.eposidesSubject.next(episodes.results);
      })
    ).subscribe();
  }
  /* obtiene la data en partes */
  getCharactersByPage(page: number): any {
    const QUERY_BY_PAGE = gql` {
      characters(page: ${page}) {
        results {
          id
          name
          status
          species
          gender
          image
        }
      }
    }`;
    this.apollo.watchQuery<any>({
      query: QUERY_BY_PAGE
    }).valueChanges.pipe(
      take(1),
      pluck('data', 'characters'),//restructura la respuesta
      withLatestFrom(this.characters$),//se pasan los characters ya cargados
      tap(([apiResponse, charactersLoads]) => {
        this.parseCharactersData([...charactersLoads, ...apiResponse.results]);
      })//retorna un array con la respuesta de la api y el resultado del observable que se le pasa
    ).subscribe();
  }

  private parseCharactersData(characters: any[]) {
    this.charactersSubject.next(characters);
  }
}

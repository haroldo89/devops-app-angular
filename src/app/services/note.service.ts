import { Injectable } from '@angular/core';
import { UserLogged } from '../models/UserLogged';
import Tutorial from '../models/tutorial';
import Note from '../models/note';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private urlCreateTutorial = '/createDesignCollaboratorIdea';
  private urlDeleteTutorial = '/deleteDesignCollaboratorIdea';
  private urlUpdateTutorial = '/updateDesignCollaboratorIdea';
  private urlGetTutorial = '/getDesignCollaboratorIdea';
  private urlGetNotes = '/notesAll';
  userValue: UserLogged = null;
  tutorial: Tutorial = null;
  private httpOptions: any;

  constructor(private http: HttpClient, private tok: TokenService) { }

  setHeaders() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'auth-token': this.tok.getTokJwt()
      })
    };
  }

  getUrl(urlValue: string): string {
    return environment.baseUrl + urlValue;
  }

  getById(ideaIdValue: string): Observable<Tutorial[]> {
    this.setHeaders(); // actualizamos el valor de la cabezera de la peticion
    const params = {
      ideaId: ideaIdValue
    };
    // inicio peticion
    return this.http
      .post<Tutorial[]>( // realizamos la peticion post
        this.getUrl(this.urlGetTutorial), // se obtiene la url de consulta
        params,
        this.httpOptions
      ) // se envian la cabezera
      .pipe(
        catchError((error, caught) => {
          // se captura el error
          const aTemp = new Observable<Tutorial[]>();
          return aTemp;
        })
      ) as Observable<Tutorial[]>;
    // fin peticion
  }

  // funcion para buscar ideas
  getAll(): Observable<Note[]> {
    this.setHeaders(); // actualizamos el valor de la cabezera de la peticion
    // inicio peticion
    return this.http
      .post<Note[]>( // realizamos la peticion post
        this.getUrl(this.urlGetNotes), // se obtiene la url de consulta
        null,
        this.httpOptions
      ) // se envian la cabezera
      .pipe(
        catchError((error, caught) => {
          // se captura el error
          const aTemp = new Observable<Note[]>();
          return aTemp;
        })
      ) as Observable<Note[]>;
    // fin peticion
  }

  // // Funcion para crear idea
  // create(idea: Tutorial): Observable<Tutorial[]> {
  //   this.setHeaders(); // actualizamos el valor de la cabezera de la peticion
  //   const params = {
  //     collaboratorName: idea.collaboratorName,
  //     cellphone: idea.cellphone,
  //     email: idea.email,
  //     headquarter: idea.headquarter,
  //     management: idea.management,
  //     direction: idea.direction,
  //     title: idea.title,
  //     advantage: idea.advantage,
  //     description: idea.description
  //   };

  //   // inicio peticion
  //   return this.http
  //     .post<Tutorial[]>( // realizamos la peticion post
  //       this.getUrl(this.urlCreateTutorial), // se obtiene la url de consulta
  //       params,
  //       this.httpOptions
  //     ) // se envian la cabezera
  //     .pipe(
  //       catchError((error, caught) => {
  //         // se captura el error
  //         return error;
  //       })
  //     ) as Observable<Tutorial[]>;
  //   // fin peticion
  // }

  // update(idea: Tutorial): Observable<string> {
  //   this.setHeaders(); // actualizamos el valor de la cabezera de la peticion
  //   const params = {
  //     ideaId: idea.ideaId,
  //   };
  //   // inicio peticion
  //   return this.http
  //     .post<string>( // realizamos la peticion post
  //       this.getUrl(this.urlUpdateTutorial), // se obtiene la url de consulta
  //       params,
  //       this.httpOptions
  //     ) // se envian la cabezera
  //     .pipe(
  //       catchError((error, caught) => {
  //         // se captura el error
  //         return error;
  //       })
  //     ) as Observable<string>;
  //   // fin peticion
  // }

  //  // funcion para eliminar una tarea en etapa de diseño.
  //  delete(idea: Tutorial): Observable<string> {
  //   this.setHeaders(); // actualizamos el valor de la cabezera de la peticion
  //   const params = idea;
  //   // inicio peticion
  //   return this.http
  //     .post<string>( // realizamos la peticion post
  //     this.getUrl(this.urlDeleteTutorial), // se obtiene la url de consulta
  //     params,
  //     this.httpOptions
  //   ) // se envian la cabezera
  //   .pipe(
  //     catchError((error, caught) => {
  //         // se captura el error
  //         return error;
  //       })
  //     ) as Observable<string>;
  //   // fin peticion
  // }

}

import { Injectable } from '@angular/core';
import { UserLogged } from '../models/UserLogged';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
    })
};

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private urlLogin = '/api/Login/authenticate';
  userValue: UserLogged = null;

  constructor(private http: HttpClient) { }

  confirmCredentials(logged: UserLogged): Observable<string> {
    const params = {
      username: logged.username,
      password: logged.password
    };

    return this.http.post<string>(
      this.getUrl(this.urlLogin),
      params,
      {
        headers: httpOptions.headers
      }).pipe(
      catchError((error, caught) => {
        console.log(error);
        return '0';
      }));
  }

  set_User(userLogged: UserLogged) {
    this.userValue = userLogged;
  }

  get_User(): UserLogged {
    return this.userValue;
  }

  getUrl(urlValue: string): string {
    return environment.baseUrl + urlValue;
  }

  public keepSession(logService: LoginService) {
    localStorage.setItem('loginUser', JSON.stringify(logService.userValue));
  }

  public recoverSession(): boolean {
    if (localStorage.getItem('loginUser') != null) {
      const login = JSON.parse(localStorage.getItem('loginUser'));
      this.set_User(login); // guarda el token en memoria
      return true;
    }
    return false;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  protected tokenJwt = '';
  protected userSid = '';
  protected username = '';
  protected expDate: Date = new Date(Date.now());
  constructor() { }

  setExpJwt(exp: Date) {
    this.expDate = exp;
  }
  getExpJwt(): Date {
    return this.expDate;
  }
  setTokJwt(token: string) {
    this.tokenJwt = token;
  }
  getTokJwt(): string {
    return this.tokenJwt;
  }

  setUsername(userValue: string) {
    this.username = userValue;
  }
  getUserName(): string {
    return this.username;
  }

  setUser(id: string) {
    this.userSid = id;
  }
  getUser(): string {
    return this.userSid;
  }

  public keepSession(tokValue: TokenService) {
    localStorage.setItem('tokenUser', JSON.stringify(tokValue));
  }

  public recoverSession(): boolean {
    if (localStorage.getItem('tokenUser') != null) {
      const token = JSON.parse(localStorage.getItem('tokenUser'));
      this.setTokJwt(token.tokenJwt); // guarda el token en memoria
      // this.setUser(data.userSid);
      this.setExpJwt(token.expDate); // almacenar fecha de expiracion
      this.setUsername(token.username);
      return true;
    }
    return false;
  }
}

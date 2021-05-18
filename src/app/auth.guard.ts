import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserLogged } from './models/UserLogged';
import { LoginService } from './services/login.service';
import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: LoginService, protected tok: TokenService, private router: Router) {
}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  validateExpTok() {

    if (this.tok.recoverSession() && this.authService.recoverSession()) {
      console.log('se recupera session');
    }

    const invalid: boolean = new Date(Date.now()) >= this.tok.getExpJwt();
    if (invalid) {
      if (this.authService.userValue != null) {
      if (this.authService.userValue.securityLevel !== 0) {
        console.log('Se hace cierre de session.');
        }
      }

      this.authService.set_User(new UserLogged()); // se reinicia el usuario logueado
      this.authService.userValue.securityLevel = 0; // se da nivel de seguridad 0
    }
    localStorage.clear();
    return invalid || this.authService.userValue.securityLevel === 0; // se retorna validadcion de nivel de usuario
  }
  
}

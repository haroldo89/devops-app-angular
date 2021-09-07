import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogged } from 'src/app/models/UserLogged';
import { LoginService } from 'src/app/services/login.service';
import { TokenService } from 'src/app/services/token.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  userName: string;
  password: string;
  showDialog = false;

  constructor(private authService: LoginService, private router: Router, private snackBar: MatSnackBar, 
    private tok: TokenService, private dialog: MatDialog) { }
  
    ngOnInit() {
      // navega a la ventana main a penas sea llamado
      localStorage.clear();
      this.tok.setTokJwt('');
      this.tok.setUser('');
      this.authService.set_User({
        id: 0,
        name: '',
        username: '',
        password: '',
        securityLevel: 0
      });
      this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(3)]),
        password: new FormControl('', [Validators.required, Validators.minLength(3)])
      });
    }
  
    // login(): void {
    //   if (this.loginForm.controls.username.valid && this.loginForm.controls.password.valid) {
    //     this.openDialog();
    //     this.showDialog = true;
    //     const loginInfo = {
    //       id: 0,
    //       name: '',
    //       username: this.loginForm.controls.username.value,
    //       password: this.loginForm.controls.password.value,
    //       securityLevel: 0
    //     };

    //     this.authService
    //     .confirmCredentialsUser(loginInfo as UserLogged)
    //     .subscribe(item => {
    //       this.showDialog = false;
    //       console.log(item);
    //       if (item) {
    //         const formValue = this.loginForm.value as UserLogged;
    //         this.tok.setUsername(formValue.username);
    //         this.userValid(item);
    //       } else {
    //         this.closeDialog();
    //         this.loginForm.reset();
    //         this.userNotValid('Favor validar credenciales de acceso');
    //       }
    //     });
    //   } else {
    //     this.openSnackBar('formulario invalido, favor validar', 'reintentar');
    //   }
    // }

    login(): void {
      if (this.loginForm.controls.username.valid && this.loginForm.controls.password.valid) {
        this.openDialog();
        this.showDialog = true;
  
        if (this.loginForm.controls.username.value === 'hacaicedoto' && this.loginForm.controls.password.value === 'Palo2021*') {
          const userLogged = new UserLogged();
          userLogged.name = this.loginForm.controls.username.value;
          userLogged.password = this.loginForm.controls.password.value;
          userLogged.securityLevel = 1;
          this.tok.setTokJwt('item'); // guarda el token en memoria
          this.tok.setUser(userLogged.name);
          this.tok.setExpJwt(new Date(1000)); // almacenar fecha de expiracion
          this.authService.set_User(userLogged);
          this.closeDialog();
          this.router.navigate(['/tutorials']);
        }
        else {
          this.closeDialog();
          this.userNotValid('Favor validar credenciales de acceso');
        }
  
        
      } else {
        this.openSnackBar('formulario invalido, favor validar', 'reintentar');
      }
    }
  
    userValid(item: any) {
      console.log(item.token);
      this.tok.setTokJwt(item.token); // guarda el token en memoria
      this.tok.setUser(item.email);
      this.closeDialog();
      this.router.navigate(['/tutorial']);
    }
  
    userNotValid(mensaje: string) {
      this.openSnackBar(mensaje, 'reintentar');
      this.loginForm.reset();
    }

    openDialog(): void {
      // tslint:disable-next-line: no-use-before-declare
      this.dialog.open(DialogContentLoaderDialog, { disableClose: true });
    }
  
    closeDialog(): void {
      this.dialog.closeAll();
    }
  
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 4000,
        verticalPosition: 'top',
        panelClass: ['custom-snack']
      });
    }

}

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dialog-content-loader-dialog',
  templateUrl: './dialog-content-loader-dialog.html'
})
// tslint:disable-next-line:component-class-suffix
export class DialogContentLoaderDialog { }
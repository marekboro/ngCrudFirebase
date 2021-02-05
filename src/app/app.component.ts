import { Component } from '@angular/core';
// import {AngularFirestore} from '@angular/fire/firestore'
import { LoginService } from './login.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-root',
  template: `
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">        
            <a class="nav-link" routerLink="login" (click)="onLogout()" *ngIf="isLoggedIn | async">Logout 
              <span class="sr-only">(current)</span>
          </a>
          </li>
          <li class="nav-item">        
            <a class="nav-link" routerLink="login" *ngIf="!(isLoggedIn | async)">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="signup" *ngIf="!(isLoggedIn | async)">Sign Up</a>
          </li>
        </ul>
      </div>
    </nav>

  <router-outlet></router-outlet>`
  

})
export class AppComponent {
  isLoggedIn : Observable<boolean>;

  constructor(private _loginservice: LoginService) { }

  ngOnInit() {
    this._loginservice.getCurrentUser();
    this.isLoggedIn = this._loginservice.isLoggedIn;
  }

  onLogout(){
    this._loginservice.logout();
  }

}


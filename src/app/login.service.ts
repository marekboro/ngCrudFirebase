import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {

private loggedIn = new BehaviorSubject<boolean>(false);

constructor(private router:Router, private afAuth: AngularFireAuth){}

get isLoggedIn(){
    return this.loggedIn.asObservable();
}

login(username:string,password:string) {
    if(username !=='' && password !== ''){
        return this.afAuth.signInWithEmailAndPassword(username,password)
        .then(authState => {
            console.log("Login-then", authState);
            this.loggedIn.next(true);
            this.router.navigate(['/'])
        })
        .catch(error => {
            this.router.navigate(['login/' + error.message]);
            console.log(error);
        })
    }
}

logout(){
    this.loggedIn.next(false);
    this.afAuth.signOut();
    this.router.navigate(['/login']);
}

    // isLoggedIn = false;

    // login(username: string, password: string) {
    //     if (username === 'jason' && password === '123') {
    //         this.isLoggedIn = true;
    //     }
    //     else {
    //         this.isLoggedIn = false
    //     }
    //     return this.isLoggedIn;
    // }


    // logout() {
    //     this.isLoggedIn = false;
    //     return this.isLoggedIn;
    // }
}
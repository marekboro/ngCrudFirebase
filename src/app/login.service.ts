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

getCurrentUser(){
    return this.afAuth.authState.subscribe(authState => {
        if(authState){
            this.loggedIn.next(true);
            this.router.navigate(['/']);
        }
        else {
            this.router.navigate(['login']);
        }
    })
}
get iAmLoggedIn(){
    return this.loggedIn;
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
            var errorMessage = error.message;
            this.router.navigate(['login/' + errorMessage]);
            console.log(error);
        })
    }
}

logout(){
    this.loggedIn.next(false);
    this.afAuth.signOut();
    this.router.navigate(['/login']);
}

signup(username:string,password:string){
    return this.afAuth.createUserWithEmailAndPassword(username,password)
    .then(authState => {
        console.log("signup-then", authState);
        this.loggedIn.next(true);
        this.router.navigate(['/']);
    })
    .catch(error => {
        var errorMessage = error.message;
        this.router.navigate(['signup/' + errorMessage]);
        console.log(error);
    })
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
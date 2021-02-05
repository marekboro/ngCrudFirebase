import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { LoginService } from './login.service';

interface User {
    name: string,
    email: string,
    password?: string,
    numbers?: number[],
    logic?: boolean
}

@Component({
    selector: 'users',
    templateUrl: './user.component.html'
})

export class UserComponent {                            // pass in the properties
    usersCol: AngularFirestoreCollection<User>;         // 1st: collection of type User
    users: any;                                         // pass in the name of our collection.

    constructor(private afs: AngularFirestore, private _router: Router, private _loginservice: LoginService) { }       // create an instance of AngularFirestore via dependancy injection

    ngOnInit() {                                         // ON initialising this component we: 
        var iAmLoggiedInHere = this._loginservice.iAmLoggedIn.value;
        console.log(iAmLoggiedInHere)
    
        // if(iAmLoggiedInHere){
            
        this.usersCol = this.afs.collection('users');   // bind our AngularFirestoreCollection<User> aka usersCol TO our AngularFirestore instance : afs, VIA the .collection METHOD.  
        // this.users = this.usersCol.valueChanges();      // bind 'users' to cusersCol (above) with the method .valueChanges() making 'users' and Observable. 
        this.users = this.usersCol.snapshotChanges()
            .pipe(
                map(actions => {
                    return actions.map(a => {
                        const data = a.payload.doc.data() as User;
                        const id = a.payload.doc.id;
                        return { id, data }
                    });
                })
            );
        // }
        // else {
        //     this._router.navigate(['login'])
        // }
    }
    addUser() {
        this._router.navigate(['add'])

    }

    delete(userId,name){
        if(confirm("Are you sure you want to delete " + name + " ?")){
            this.afs.doc('users/' + userId).delete();
        }
    }
    logOut(){
        this._loginservice.logout();

    }

}


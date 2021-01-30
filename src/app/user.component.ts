import {Component} from '@angular/core'
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'

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

    constructor(private afs: AngularFirestore) {}       // create an instance of AngularFirestore via dependancy injection
    
    ngOnInit(){                                         // ON initialising this component we: 
        this.usersCol = this.afs.collection('users');   // bind our AngularFirestoreCollection<User> aka usersCol TO our AngularFirestore instance : afs, VIA the .collection METHOD.  
        this.users = this.usersCol.valueChanges();      // bind 'users' to cusersCol (above) with the method .valueChanges() making 'users' and Observable. 
        }
    
}